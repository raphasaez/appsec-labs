from flask import Blueprint, jsonify, request, session

main = Blueprint('main', __name__, url_prefix='/api')  # prefixo /api

# Mock de usuários
users = [
    {'id': 1, 'name': 'Alice'},
    {'id': 2, 'name': 'Bob'},
    {'id': 3, 'name': 'Charlie'}
]

@main.route('/', methods=['GET'])
def home():
    return jsonify({"message": "IDOR Lab running"})

@main.route('/', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    user = next((u for u in users if u['id'] == 1 and u['name'] == username), None)
    if user:
        session['user_id'] = user['id']
        return jsonify({'message': f'Logged in as {username}', 'user_id': user['id']}), 200
    return jsonify({'message': 'Invalid user'}), 401

@main.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

@main.route('/user/<int:user_id>', methods=['POST'])
def edit_user(user_id):
    if 'user_id' not in session:
        return jsonify({'message': 'Not authenticated'}), 401
    if session['user_id'] != user_id:
        return jsonify({'message': 'Unauthorized'}), 403

    data = request.get_json()
    user = next((u for u in users if u['id'] == user_id), None)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    user['name'] = data.get('name', user['name'])
    return jsonify(user)

@main.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global socketio
    user = next((u for u in users if u['id'] == user_id), None)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    users.remove(user)

    if user_id in [2, 3] and hasattr(main, 'socketio') and main.socketio:
        main.socketio.emit('user_deleted', {'user_id': user_id})

    return jsonify({'message': f'User {user_id} deleted'})
