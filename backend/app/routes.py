from flask import Blueprint, jsonify, request, current_app, send_from_directory, redirect, url_for
from flask_login import login_user, logout_user, login_required
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

from .models import User, UserPreferences, Audio
from backend.worker import WorkerProcess
import os

# routes created by api.route are all preceded by /api
# blueprints need to be initialised in __init__.py
api = Blueprint("api", __name__)
auth = Blueprint('auth', __name__)


# API ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

def json_response(data, status=200):
    if data is None:
        return jsonify({"error": "Not found"}), 404
    if isinstance(data, list):
        return jsonify([obj.json() for obj in data]), status
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
        response = User.get_all()
        # return json_response([user.json() for user in response], 200)
        return json_response(response, 200)
    
    elif request.method == "POST":
        response = User.create(request.json)
        return json_response(response.json(), 201)


@api.route("/users/<int:user_id>", methods=["GET", "PUT", "DELETE"])
def user_detail(user_id):
    """
        Access individual users with /api/users/{user_id}
        
        GET /api/users/{user_id} gets a users
        PUT /api/users/{user_id} updates a user
        DELETE /api/users/{user_id} deletes a user
    """

    if request.method == "GET":
        response = User.get_by_id(user_id)
        return json_response(response.json(), 200)
    
    elif request.method == "PUT":
        response = User.update(user_id, request.json)
        return json_response(response.json(), 200)
    
    elif request.method == "DELETE":
        deleted_id = User.delete(user_id)
        if deleted_id:
            return jsonify({"message": f"User {deleted_id} deleted"})  
        else:
            json_response(None, 404)


@api.route("/users/<int:user_id>/preferences", methods=["GET", "POST", "DELETE"])
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

    elif request.method == "DELETE":
        user = User.get_by_id(user_id)
        deleted_id = user.delete_preferences()
        if deleted_id:
            return jsonify({"message": f"UserPreference {deleted_id} deleted"})  
        else:
            json_response(None, 404)



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
        
        file_type = filename.split(".")[-1]
        if file_type not in current_app.config.get("ALLOWED_EXTENSIONS"):
            return json_response({"error": "Bad file type"}, 400)

        upload_folder = current_app.config.get("UPLOAD_FOLDER")
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)

        user = User.get_by_id(user_id)
        if not user:
            return json_response(None, 404)

        user.upload_audio({"file_path": file_path})
        data = {"id": user.get_audio().id, "user_id": user.id, "file_path": file_path}

        return json_response({"message"  : "Audio uploaded",
                              "data":  data}, 201)

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


@api.route("/audio/<int:user_id>/process", methods=["POST", "GET"])
def process_audio(user_id):
    """
        Process audio with /api/audio/{user_id}/process
        POST /api/audio/{user_id}/process processes audio
        GET /api/audio/{user_id}/process gets processed audio
    """
    if request.method == "POST":
        user = User.get_by_id(user_id)
        if not user:
            return json_response(None, 404)

        audio_entry = user.get_audio()
        if not audio_entry or not os.path.exists(audio_entry.file_path):
            return json_response(None, 404)

        worker = WorkerProcess(user_id, audio_entry.file_path)
        output_path, timestamps = worker.process_audio_for_user()

        # upload to db
        user.upload_processed_audio({"file_path": output_path})
        return json_response({"output_path": output_path, "timestamps": timestamps}, 201)
    
    elif request.method == "GET":
        user = User.get_by_id(user_id)
        if not user:
            return json_response(None, 404)

        audio_entry = user.get_audio("processed")
        if not audio_entry or not os.path.exists(audio_entry.file_path):
            return json_response(None, 404)

        dir_path = os.path.dirname(audio_entry.file_path)
        file_name = os.path.basename(audio_entry.file_path)
        return send_from_directory(directory=dir_path, path=file_name)

    return json_response(None, 404)



# AUTH ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method=='POST':
        username = request.form.get('username')
        # password = request.form.get('password')
        # remember = True if request.form.get('remember') else False

        user = User().get_by_username(username=username)

        '''if not user or not check_password_hash(user.password, password):
            flask.flash('Please check your login details and try again.')
            return redirect(url_for('auth.login'))'''
        if not user:
            return json_response(None, 404)

        login_user(user)

        return json_response({'user_id': user.id})
    

@auth.route('/signup', methods=['POST'])
def signup():
    if request.method=='POST':
        email = request.form.get('email')
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()

        if user:
            return jsonify({"message": f"User already exists"}, 400)

        new_user = {"email": email, "username": username, "password": generate_password_hash(password, method='sha256')}
        
        response = User.create(new_user)

        # currently only sends id, username and email
        return json_response(response.json(), 201)


@auth.route('/logout/<int:user_id>', methods=['GET'])
@login_required
def logout(user_id):
    if request.method == 'GET':
        user = User.get_by_id(user_id)
        if user:
            logout_user(user)
            return json_response(None, 200)
        
        return json_response(None, 404)

    return json_response(None, 404)

@api.route("/audio/<int:user_id>/timestamps", methods=["POST", "GET"])
def get_timestamps(user_id):
    """
        Get word and timestamps with /audio/<int:user_id>/timestamps
        GET /audio/<int:user_id>/timestamps gets words and timestamps
    """
    if request.method == "GET":
        user = User.get_by_id(user_id)
        if not user:
            return json_response(None, 404)

        audio_entry = user.get_audio()
        if not audio_entry or not os.path.exists(audio_entry.file_path):
            return json_response(None, 404)

        worker = WorkerProcess(user_id, audio_entry.file_path)
        word_timestamps = worker.get_word_timestamps()

        formatted_data = [
            {
                "word": item[0],
                "start_time": item[1][0],  # First element of the timestamp tuple
                "end_time": item[1][1],    # Second element of the timestamp tuple
                "is_removed": item[2]
            }
            for item in word_timestamps
        ]

        print(jsonify({"word_timestamps": formatted_data}))

        return jsonify({"word_timestamps": formatted_data}), 200
    
    return json_response(None, 404)