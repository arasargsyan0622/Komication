from flask import Flask
from app.config import Config
from .socket_io import socketio
from app.model import db


app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
socketio.init_app(app)

if __name__ == '__main__':
    socketio.run(app)
