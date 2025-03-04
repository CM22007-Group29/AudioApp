import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.models import db, User, UserPreferences
from app import create_app
from worker import process_audio_for_user

app = create_app()

def give_app_context(func):
    def wrapper_func():
        with app.app_context():
            func()
    return wrapper_func

@give_app_context
def test_db_and_worker():
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
    process_audio_for_user(user_id=user.id, audio_file_path='backend/tests/audio_input.mp3')
    print("worker process complete")

    user_id = User.delete(1)
    print(user_id, " deleted")


if __name__ == '__main__':
    test_db_and_worker()

