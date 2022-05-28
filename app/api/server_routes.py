from flask import Blueprint, render_template, redirect, jsonify
from app.models.server import Server
from app.forms.server_form import ServerForm

server_routes = Blueprint('servers', __name__)

@server_routes.route('/') # all servers explore page
def all_servers():
    servers = Server.query().all()

    return {"servers": [server.to_dict() for server in results]}


@server_routes.route('/<int:id>')
def server(id):
    server = Server.query().get(id)
    return {"server": server.to_dict()}


@server_routes.route('/', methods=['POST'])
def create_server():
    form = ServerForm()
    if form.validate_on_submit():
        server = Server(
            server_name=form.server_name.data,
            private=form.private.data,
            server_icon_url=form.server_icon_url.data,
            server_invite_url=form.server_invite_url.data,
            user_id=form.user_id.data,
            banner_url=form.banner_url.data,
        )
        server.save()
        return redirect('/servers/{}'.format(server.id))


@server_routes.route('/<int:id>', methods=['PUT'])
def update_server(id):
    server = Server.query().get(id)
    form = ServerForm()
    if form.validate_on_submit():
        server.server_name = form.server_name.data
        server.private = form.private.data
        server.server_icon_url = form.server_icon_url.data
        server.server_invite_url = form.server_invite_url.data
        server.user_id = form.user_id.data
        server.banner_url = form.banner_url.data
        server.save()
        return redirect('/servers/{}'.format(server.id))


@server_routes.route('/<int:id>', methods=['DELETE'])
def delete_server(id):
    server = Server.query().get(id)
    server.delete()
    return jsonify({'success': True})

@server_routes.route()
