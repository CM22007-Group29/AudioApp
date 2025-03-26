from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

import os

from .routes import api, auth
from .models import db, User

login_manager = LoginManager()

def create_app():
    # init app
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///coursework.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, "uploads")
    app.config['ALLOWED_EXTENSIONS'] = {'mp3', 'wav'}

    # initialises database created in models.py
    db.init_app(app)

    # allows us to communicate with frontend
    CORS(app)

    # initialises login manager
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    # registers /api as a valid path
    app.register_blueprint(api, url_prefix='/api')
    app.register_blueprint(auth, url_prefix='/auth')

    with app.app_context():
        db.create_all()
        user = {"email": 'grace.darcy02@gmail.com', "username": 'gracedarcy', "password": '12345'}

        user_instance = User().get_by_username(username = "gracedarcy")
        print(user_instance.username)

        if user_instance is not None:
            User.update(user_instance.id, user)
        else:
            User.create(user)

    @login_manager.user_loader
    def load_user(user_id):
        return User.get_by_id(user_id)

    return app