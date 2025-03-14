from flask import Blueprint, jsonify, request, current_app, send_from_directory
from flask import current_app, request, send_from_directory
from werkzeug.utils import secure_filename
from .models import User
from backend.worker import WorkerProcess
import os

# routes created by api.route are all preceded by /api
# blueprints need to be initialised in __init__.py
api = Blueprint("api", __name__)


def json_response(data, status=200):
    if data is None:
        return jsonify({"error": "Not found"}), 404
    if isinstance(data, list):
        return jsonify([obj.to_dict() for obj in data]), status
    if hasattr(data, "to_dict"):
        return jsonify(data.to_dict()), status
    return jsonify(data), status



@api.route("/users", methods=["GET", "POST"])
def users():
    """
        Access all users with /api/users

        GET /api/users gets all users
        POST /api/users creates a new user
    """

    if request.method == "GET":
        return json_response(User.get_all())
    
    elif request.method == "POST":
        return json_response(User.create(request.json), 201)


@api.route("/users/<int:user_id>", methods=["GET", "PUT", "DELETE"])
def user_detail(user_id):
    """
        Access individual users with /api/users/{user_id}
        
        GET /api/users/{user_id} gets a users
        PUT /api/users/{user_id} updates a user
        DELETE /api/users/{user_id} deletes a user
    """

    if request.method == "GET":
        return json_response(User.get_by_id(user_id))
    
    elif request.method == "PUT":
        return json_response(User.update(user_id, request.json))
    
    elif request.method == "DELETE":
        deleted_id = User.delete(user_id)
        if deleted_id:
            return jsonify({"message": f"User {deleted_id} deleted"})  
        else:
            json_response(None, 404)


@api.route("/users/<int:user_id>/preferences", methods=["GET", "POST"])
def user_preferences(user_id):
    """
        Access user preferences with /api/users/{user_id}/preferences

        GET /api/users/{user_id}/preferences gets user preferences
        POST /api/users/{user_id}/preferences creates user preferences
    """
    if request.method == "GET":
        user = User.get_by_id(user_id)
        if not user:
            return json_response(None, 404)

        prefs = user.get_preferences()
        if not prefs:
            return json_response(None, 404)

        return json_response(prefs.json())

    elif request.method == "POST":
        user = User.get_by_id(user_id)
        if not user:
            return json_response(None, 404)

        new_prefs = user.create_preferences(request.json)
        return json_response(new_prefs.json(), 201)



@api.route("/audio/<int:user_id>", methods=["POST", "GET"])
def audio(user_id):
    """
        Access audio with /api/audio/{user_id}
        GET /api/audio/{user_id} gets audio
        POST /api/audio/{user_id} uploads
    """

    if request.method == "POST":
        file = request.files.get("audio")
        if not file:
            return json_response({"error": "No audio uploaded"}, 400)

        filename = secure_filename(file.filename)
        if not filename:
            return json_response({"error": "Bad filename"}, 400)

        upload_folder = current_app.config.get("UPLOAD_FOLDER", "uploads")
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)

        user = User.get_by_id(user_id)
        if not user:
            return json_response(None, 404)

        user.upload_audio({"file_path": file_path})
        return json_response({"message": "Audio uploaded"}, 201)

    elif request.method == "GET":
        user = User.get_by_id(user_id)
        if not user:
            return json_response(None, 404)

        audio_entry = user.get_audio()
        if not audio_entry or not os.path.exists(audio_entry.file_path):
            return json_response(None, 404)

        dir_path = os.path.dirname(audio_entry.file_path)
        file_name = os.path.basename(audio_entry.file_path)
        return send_from_directory(directory=dir_path, path=file_name)

    return json_response(None, 404)

@api.route("/audio/<int:user_id>/process", methods=["POST"])
def process_audio(user_id):
    """
        Process audio with /api/audio/{user_id}/process
        POST /api/audio/{user_id}/process processes audio
    """

    user = User.get_by_id(user_id)
    if not user:
        return json_response(None, 404)

    audio_entry = user.get_audio()
    if not audio_entry or not os.path.exists(audio_entry.file_path):
        return json_response(None, 404)

    worker = WorkerProcess(user_id, audio_entry.file_path)
    output_path, timestamps = worker.process_audio_for_user()
    return json_response({"output_path": output_path, "timestamps": timestamps}, 201)