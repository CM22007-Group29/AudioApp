from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class BaseModel(db.Model):
    """
    This class allows you to dynamically access database models, all models will have basic create, delete, get by id functions etc
    Also gives all models an id
    """
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    @classmethod
    def get_all(cls):
        return cls.query.all()
    
    @classmethod
    def get_id(cls):
        return cls.id

    @classmethod
    def get_by_id(cls, instance_id):
        return cls.query.get(instance_id)
    
    @classmethod
    def create(cls, data):
        new_instance = cls(**data)

        db.session.add(new_instance)
        db.session.commit()

        return new_instance

    @classmethod
    def update(cls, instance_id, data):
        instance = cls.query.get(instance_id)

        if not instance:
            return None
        
        for key, value in data.items():
            if hasattr(instance, key):
                setattr(instance, key, value)

        db.session.commit()

        return instance

    @classmethod
    def delete(cls, instance_id):
        instance = cls.query.get(instance_id)

        if not instance:
            return None
        
        db.session.delete(instance)
        db.session.commit()

        return instance_id


class User(UserMixin, BaseModel):
    __tablename__ = 'users'

    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100))

    def json(self):
        return {'id': self.id,'username': self.username, 'email': self.email}

    def create_preferences(self, data):
        data['user_id'] = self.id
        return UserPreferences.create(data)
    
    def get_preferences(self):
        return UserPreferences.query.filter_by(user_id=self.id).first()

    def get_by_username(self, username):
        return User.query.filter_by(username=username).first()
    
    def upload_audio(self, data):
        data['user_id'] = self.id
        data['status'] = 'uploaded'
        return Audio.create(data)
    
    def upload_processed_audio(self, data):
        data['user_id'] = self.id
        data['status'] = 'processed'
        return Audio.create(data)
    
    def get_audio(self, status="uploaded"):
        return Audio.query.filter_by(user_id=self.id, status=status).first()

    

class UserPreferences(BaseModel):
     __tablename__ = 'user_preferences'

     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     normalise = db.Column(db.Boolean, nullable=False, default=False)
     extra_words = db.Column(db.String, nullable=True)
     silence_length = db.Column(db.Integer, nullable=True)
     silence_threshold = db.Column(db.Integer, nullable=True)
     user = db.relationship('User', backref=db.backref('preferences', lazy=True))

     def json(self):
         return {
             'id': self.id,
             'user_id': self.user_id,
             'normalise': self.normalise,
             'extra_words': self.extra_words,
             'silence_length': self.silence_length,
             'silence_threshold': self.silence_threshold
         } 
     
class Audio(BaseModel):
    __tablename__ = 'audio'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    file_path = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=True, default='uploaded')
    user = db.relationship('User', backref=db.backref('audio', lazy=True))

    def json(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'file_path': self.file_path
        }