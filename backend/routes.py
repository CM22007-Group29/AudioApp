from flask import Blueprint, render_template
from .models import db, User

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    tasks = User.query.all()
    return render_template('index.html', tasks=tasks)