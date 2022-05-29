from flask import Blueprint, render_template, redirect, jsonify
from app.models.server import Server
from app.forms.server_form import ServerCreateForm, ServerUpdateForm
from app.models import db
import uuid

server_routes = Blueprint('servers', __name__)

@server_routes.route('/') # all servers explore page
def all_servers():
    servers = Server.query.all()

    return {"servers": [server.to_dict() for server in servers]}


@server_routes.route('/<int:id>')
def server(id):
    server = Server.query.get(id)
    return {"server": server.to_dict()}


@server_routes.route('/', methods=['POST'])
def create_server():
    form = ServerCreateForm()
    if form.validate_on_submit():
        random_string = ""
        random_uuid = uuid.uuid4()
        string_uuid = "http://komication.com/" + random_string.join(str(random_uuid).split("-"))
        server = Server(
            server_name=form.server_name.data,
            server_icon_url=None,
            server_invite_url=string_uuid,
            user_id=form.user_id.data,
            banner_url=None,
        )
        db.session.add(server)
        db.session.commit()
        return {"server": server.to_dict()}


@server_routes.route('/<int:id>', methods=['PUT'])
def update_server(id):
    server = Server.query.get(id)
    form = ServerUpdateForm()
    if form.validate_on_submit():
        server.server_name = form.server_name.data
        server.private = form.private.data
        server.server_icon_url = form.server_icon_url.data
        server.banner_url = form.banner_url.data
        db.session.add(server)
        db.session.commit()
        return {"server": server.to_dict()}


@server_routes.route('/<int:id>', methods=['DELETE'])
def delete_server(id):
    server = Server.query.get(id)
    db.session.delete(server)
    db.session.commit()
    return jsonify({'success': True})
