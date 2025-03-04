from models import db, UserPreferences, User
from Worker import process_audio_for_user

# import sys
# import os

# # Add the parent directory to sys.path
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# from models import db, UserPreferences, User
# ce

def add_dummy():
    new_user = User(username="test", email="test@123")
    db.session.add(new_user)
    db.session.commit()

    new_prefs = UserPreferences(user_id=new_user.id, 
                                normalise=True, 
                                extra_words="balls")
    db.session.add(new_prefs)
    db.session.commit()

def test_workerprocess():
    # add_dummy()
    path = 'tests/test2.mp3'
    process_audio_for_user(1, path)
    # assert True

test_workerprocess()



