import sys
import os
from io import BytesIO

from flask import current_app as app

# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.models import db, User, AudioFile
from tests import give_app_context

@give_app_context
def test_audiofile():

    # Get and delete all users
    users = User.get_all()
    for user in users:
        print("deleting user ", user.id) 
        User.delete(user.id)

    # Get and delete all files
    files = AudioFile.get_all()
    for file in files:
        print("deleting file ", file.id) 
        AudioFile.delete(file.id)

    # Create a user
    user = User.create({'username': 'test_user', 'email': 'test@123'})
    print(f"user with id {user.id} and name {user.username} created ")

    # only tests that a file can be uploaded or downloaded, isn't testing mp3 binary
    file_name = "test_audio_upload.mp3"

    sent_file_content = b"some initial text data"

    # bytesIO simulates binary, this is a fake file
    data = {
        'file': (BytesIO(sent_file_content), file_name),
        'user_id': None
    }

    # send post request from simulated client containing a new mp3 file
    with app.test_client() as client:
        response = client.post(f'api/files/upload', data=data, content_type='multipart/form-data')

    response_json = response.get_json()

    # verifies that the server recieved the new file
    print(f"response: {response_json}, status: {response.status_code}")

    print(f"file id: {response_json['file_id']}")

    # verifies that the new file information gets stored in the database and the new file has been saved to the audio_files folder
    new_file = AudioFile.get(response_json['file_id'])
    file_location = new_file.file_location

    if os.path.isfile(file_location):
        print("file found!! success")

        # verifies recieved file content matches content of sent file
        f = open(file_location, "rb")
        new_file_content = f.read()
        if new_file_content == sent_file_content:
            print("file content matches sent content")
        else:
            print(new_file_content)
            print(sent_file_content)
            print("file content doesn't match sent content")

        # deletes audio file
        os.unlink(file_location)
    else:
        print("file not found")

    # deletes created audiofile and user from database
    file_id = AudioFile.delete(new_file.id)
    print(f"deleted file {file_id}")

    user_id = User.delete(user.id)
    print(f"deleted user {user_id}")


    print(f"there are {len(users)} users left")


if __name__ == '__main__':
    test_audiofile()