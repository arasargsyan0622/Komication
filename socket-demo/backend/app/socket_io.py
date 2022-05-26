from flask_socketio import SocketIO, emit, join_room, leave_room
from app.model import db, Message

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on("chat")
def handle_chat(data):

    user = data["user"]
    content = data["msg"]

    new_message = Message(user=user, content=content)

    print(new_message)

    # db.session.add(new_message)
    # db.session.commit()

    emit("chat", data, broadcast=True, to=data["room"])

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
