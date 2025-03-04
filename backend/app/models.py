from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class BaseModel(db.Model):
    """
    This class allows you to dynamically access database models, all models will have basic create, delete, get by id functions etc
    Also gives all models an id
    """
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)

    @classmethod
    def get_all(cls):
        return cls.query.all()

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


class User(BaseModel):
    __tablename__ = 'users'

    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        return {'id': self.id,'username': self.username, 'email': self.email}