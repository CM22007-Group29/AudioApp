from flask import Flask, render_template

from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///coursework.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        return {'id': self.id,'username': self.username, 'email': self.email}

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    tasks = User.query.all() 
    return render_template('index.html', tasks=tasks)


if __name__ == '__main__':
    print("Running server...")
    app.run(host='0.0.0.0', port='4040', debug=True)
