from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from .routes import api
from .models import db

def create_app():
    # init app
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///coursework.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # initialises database created in models.py
    db.init_app(app)

    # allows us to communicate with frontend
    CORS(app)

    # registers /api as a valid path
    app.register_blueprint(api, url_prefix='/api')

    with app.app_context():
        db.create_all()

    return app