from flask import Blueprint, render_template, redirect, jsonify, request
from app.models.server import Server
from app.models.user import User
from app.models.channel import Channel
from app.forms.server_form import ServerCreateForm, ServerUpdateForm
from app.models import db
from app.api.aws_s3_bucket import (
    upload_file_to_s3, allowed_file, get_unique_filename)
import uuid

server_routes = Blueprint('servers', __name__)

@server_routes.route('/') # all servers explore page
def all_servers():
    servers = Server.query.all()

    return {"servers": [server.to_dict() for server in servers]}


@server_routes.route('/<int:id>')
def server(id):
    server = Server.query.get(id)
    channels = Channel.query.join(Server).filter(Server.id == id).all()
    return {"server": server.to_dict(), "channels": [channel.to_dict() for channel in channels]}


@server_routes.route('/', methods=['POST'])
def create_server():
    form = ServerCreateForm()
    print(form)
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    print(form.validate_on_submit())
    print("in the backend create server route")
    if form.validate_on_submit():
        print("we have submitted")

        random_string = ""
        random_uuid = uuid.uuid4()
        string_uuid = "http://komication.com/" + random_string.join(str(random_uuid).split("-"))
        url = None
        # current_user = User.query.get(form.user_id.data)
        current_user = User.query.get(1)

        # image upload <-------------------------->
        image = request.files["image"]
        if image:
            print("we have an image")
            print(image)
            if not allowed_file(image.filename):
                return {"errors":"file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)
            print(upload)
            # check if upload worked
            if "url" not in upload:
                return upload, 400

            url = upload["url"]
        # image upload <-------------------------->

        server = Server(
            server_name=form.server_name.data,
            server_icon_url=url,
            server_invite_url=string_uuid,
            # user_id=form.user_id.data,
            user_id=1,
            banner_url=None,
            users = [current_user]
        )

        db.session.add(server)
        db.session.commit()
        return {"server": server.to_dict()}
    # return jsonify({'success': True})

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
