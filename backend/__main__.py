from flask import render_template

from .app import create_app
from .app.models import User

app = create_app()

@app.route('/')
def index():
    tasks = User.query.all() 
    return render_template('index.html', tasks=tasks)

if __name__ == '__main__':
    print("Running server...")
    app.run(host='0.0.0.0', port='4040', debug=True)
