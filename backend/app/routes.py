from flask import Blueprint, jsonify, request

from app.models import User

 # routes created by api.route are all preceded by /api
 # blueprints need to be initialised in __init__.py
api = Blueprint("api", __name__)


def json_response(data, status=200):
    if data is None:
        return jsonify({"error": "Not found"}), 404
    if isinstance(data, list):
        return jsonify([obj.to_dict() for obj in data]), status
    return jsonify(data.to_dict()), status



@api.route("/users", methods=["GET", "POST"])
def users():
    """
        Access all users with /api/users
        GET /api/users gets all users
        POST /api/users creates a new user
    """

    if request.method == "GET":
        return json_response(User.get_all())

    elif request.method == "POST":
        return json_response(User.create(request.json), 201)


@api.route("/users/<int:user_id>", methods=["GET", "PUT", "DELETE"])
def user_detail(user_id):
    """
        Access individual users with /api/users/{user_id}
        
        GET /api/users/{user_id} gets a users
        PUT /api/users/{user_id} updates a user
        DELETE /api/users/{user_id} deletes a user
    """

    if request.method == "GET":
        return json_response(User.get_by_id(user_id))

    elif request.method == "PUT":
        return json_response(User.update(user_id, request.json))

    elif request.method == "DELETE":
        deleted_id = User.delete(user_id)
        if deleted_id:
            return jsonify({"message": f"User {deleted_id} deleted"})  
        else:
            json_response(None, 404)