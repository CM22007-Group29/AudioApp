import sys
import os
from io import BytesIO

from flask import current_app as app
from backend.app.models import db, User, Audio, UserPreferences
from backend.tests import give_app_context


@give_app_context
def test_audio():
    # Get and delete all users
    users = User.get_all()
    for user in users:
        print("deleting user ", user.id) 
        User.delete(user.id)

    # Get and delete all files
    files = Audio.get_all()
    for file in files:
        print("deleting file ", file.id) 
        Audio.delete(file.id)

    # Create a user
    user = User.create({'username': 'test_user', 'email': 'test@123'})
    print(f"user with id {user.id} and name {user.username} created ")

    audio_content = b"\x00\xFF\x00\xFF"  # Very short, dummy file data
    data = {
        'audio': (BytesIO(audio_content), "test_audio.mp3")
    }
    
    with app.test_client() as client:
        # POST
        response = client.post(f'/api/audio/{user.id}', data=data, content_type='multipart/form-data')
        assert response.status_code == 201, f"Failed to upload audio file: {response.data}"
        print(response.get_json())
        print("audio file uploaded")
        # GET raw audio
        response = client.get(f'/api/audio/{user.id}')
        assert (response.status_code == 200 or response.status_code == 304), f"Failed to get audio file: {response.data}"
        print("audio file downloaded")
        # Now check the raw binary content rather than expecting JSON
        assert response.data.startswith(b"\x00\xFF"), "Audio content mismatch"
        print("audio content matched")

@give_app_context
def test_audio_process():
    # Clean up any existing users and audio
    for user in User.get_all():
        User.delete(user.id)
    for audio_entry in Audio.get_all():
        Audio.delete(audio_entry.id)
    for prefs in UserPreferences.get_all():
        UserPreferences.delete(prefs.id)

    # Create a user to associate with uploaded audio
    user = User.create({'username': 'test_process', 'email': 'process@audio.com'})
    # Create preferences for the user
    UserPreferences.create({'user_id': user.id, 'normalise': True, 'extra_words':"balls dick"})   

    audio_path = os.path.join('backend/tests/audio_input.mp3')
    with open(audio_path, 'rb') as f:
        audio_content = f.read()

    data = {
        'audio': (BytesIO(audio_content), "audio_input.mp3")
    }

    with app.test_client() as client:
        #POST
        # 1. Upload audio
        upload_resp = client.post(
            f'/api/audio/{user.id}',
            data=data,
            content_type='multipart/form-data'
        )
        assert upload_resp.status_code == 201, f"Audio upload failed: {upload_resp.data}"

        # 2. Process the uploaded audio
        process_resp = client.post(f'/api/audio/{user.id}/process')
        assert process_resp.status_code == 201, f"Audio processing failed: {process_resp.data}"

        # 3. Check JSON return
        resp_json = process_resp.get_json()
        assert 'output_path' in resp_json, "Missing 'output_path' in response"
        assert 'timestamps' in resp_json, "Missing 'timestamps' in response"
        print("Audio processing POST test succeeded:", resp_json)

        # GET
        # 4. Download processed audio
        download_resp = client.get(f'/api/audio/{user.id}/process')
        assert download_resp.status_code == 200, f"Failed to download processed audio: {download_resp.data}"
        print("Audio processing GET test succeeded")


if __name__ == '__main__':
    test_audio() 
    test_audio_process()