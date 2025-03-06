import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.models import db, User, UserPreferences
from app import create_app
from worker import WorkerProcess

app = create_app()

def give_app_context(func):
    def wrapper_func():
        with app.app_context():
            func()
    return wrapper_func

@give_app_context
def test_db_and_worker():
    audio_file_path = 'backend/tests/audio_input.mp3'
    # Check database is empty and delete all if not
    users = User.get_all()
    for user in users:
        print("deleting user ", user.id) 
        User.delete(user.id)

    prefs = UserPreferences.get_all()
    for pref in prefs:
        print("deleting preferences ", pref.id)
        UserPreferences.delete(pref.id)
    
    # Create a user
    user = User.create({'username': 'test_user', 'email': 'test@123'})
    print("user created ", user.id, user.username)

    # Create user preferences
    user_preferences = UserPreferences.create({'user_id': user.id, 'normalise': True, 'extra_words':"balls dick"})
    print("preferences creates ", user_preferences.id)

    # Process audio for the user
    # create worker
    worker = WorkerProcess(userid=user.id, audiopath=audio_file_path)
    outputpath, timestamps = worker.process_audio_for_user() 
    print(f"Worker process complete \nOutput file at: {outputpath} \n Cut timestamps: {timestamps}")

    user_id = User.delete(user.id)
    print(user_id, " deleted")

    pref_id = UserPreferences.delete(user.id)
    print(pref_id, " deleted")


if __name__ == '__main__':
    test_db_and_worker()

