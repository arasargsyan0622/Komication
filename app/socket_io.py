from flask_socketio import SocketIO, emit, join_room, leave_room
from app.models import db, User

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on("chat")
def handle_chat(data):
    emit("chat", broadcast=True, to=data["room"])

@socketio.on("online")
def turn_online(data):
    user = User.query.get(data["id"])
    user.online = True
    db.session.add(user)
    db.session.commit()
    emit("online", broadcast=True)

@socketio.on("offline")
def turn_online(data):
    user = User.query.get(data["id"])
    user.online = False
    db.session.add(user)
    db.session.commit()
    emit("offline", broadcast=True)

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    msg = f"{username} has joined room"
    newData = {"user": username, "msg": msg}
    join_room(room)
    emit("chat", newData, to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    msg = f"{username} has left the room"
    newData = {"user": username, "msg": msg}
    leave_room(room)
    emit("chat", newData, to=room)
