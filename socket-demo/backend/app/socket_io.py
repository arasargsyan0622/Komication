from flask_socketio import SocketIO, emit

socketio = SocketIO(cors_allowed_origins=["*"])

@socketio.on("chat")
def handle_chat(data):
    emit("chat",data, broadcast=True)
