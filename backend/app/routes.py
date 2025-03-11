import os
from flask import Blueprint, jsonify, request, flash, redirect, send_from_directory
from flask import current_app as app
from werkzeug.utils import secure_filename


from app.models import User, AudioFile


# routes created by api.route are all preceded by /api
# blueprints need to be initialised in __init__.py
api = Blueprint("api", __name__)

def allowed_file(filename):
    return filename.rsplit('.', 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]


def json_response(data, status=200):
    if data is None:
        return jsonify({"error": "Not found"}), 404
    if isinstance(data, list):
        return jsonify([obj.to_dict() for obj in data]), status
    return jsonify(data.to_dict()), status



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
        return json_response(User.get(user_id))
    
    elif request.method == "PUT":
        return json_response(User.update(user_id, request.json))
    
    elif request.method == "DELETE":
        deleted_id = User.delete(user_id)
        if deleted_id:
            return jsonify({"message": f"User {deleted_id} deleted"})  
        else:
            json_response(None, 404)


@api.route("/files/upload", methods=["POST"])
def upload_audio_file():
    """
        Upload an audio file to the server from a user with /api/files/upload

        POST /api/files/upload uploads a new audio file
    """
    if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                flash('No file received')
                json_response({'message':'No file recieved'}, 404)
                return redirect(request.url)
            
            file = request.files['file']

            # If the user does not select a file, the browser submits an
            # empty file without a filename.
            if file.filename == '':
                flash('No file was selected')
                json_response({'message':'No file selected'}, 404)
                return redirect(request.url)
            
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(path)
                user_id = file.user_id

                audio_file = AudioFile.create({"user_id": user_id, "file_location": path, "filename": filename})

                return jsonify({'message':'Audio File created', 'file_id': audio_file.id, 'status_code':201})


@api.route("/files/download/<int:user_id>/<int:audio_file_id>")
def download_audio_file(user_id, audio_file_id):
    audio_filename = AudioFile.get(id=audio_file_id).filename
    return send_from_directory(app.config["UPLOAD_FOLDER"], audio_filename)