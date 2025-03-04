from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class UserPreferences(db.Model):
    __tablename__ = 'user_preferences'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    normalise = db.Column(db.Boolean, nullable=False, default=False)
    extra_words = db.Column(db.String(120), nullable=True)
    silence_length = db.Column(db.Integer, nullable=True)
    silence_threshold = db.Column(db.Integer, nullable=True)
    user = db.relationship('User', backref=db.backref('preferences', lazy=True))

    def json(self):
        return {
            'user_id': self.user_id,
            'normalise': self.normalise,
            'extra_words': self.extra_words,
            'silence_length': self.silence_length,
            'silence_threshold': self.silence_threshold
        }