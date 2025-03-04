## run with python -m backend.main
from flask import Flask
from backend.models import db
from backend.routes import routes

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///coursework.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    app.register_blueprint(routes)

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    print("Running server...")
    create_app().run(host='0.0.0.0', port='4040', debug=True)