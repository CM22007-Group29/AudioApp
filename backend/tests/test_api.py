import sys
import os
from io import BytesIO

from flask import current_app as app
from backend.app.models import db, User, Audio
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


if __name__ == '__main__':
    test_audio() 