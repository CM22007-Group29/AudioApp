from flask import Flask, render_template
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient(host='test_mongodb',port=27017, username='root', password='pass',authSource="admin")
db = client.mytododb
tasks_collection = db.tasks

@app.route('/')
def index():
    tasks = tasks_collection.find()
    return render_template('index.html', tasks=tasks)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='4040', debug=True)
