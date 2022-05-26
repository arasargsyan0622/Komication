from flask import Flask
from .socket_io import socketio
app = Flask(__name__)

socketio.init_app(app)

if __name__ == '__main__':
    socketio.run(app)
