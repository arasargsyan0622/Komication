from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User
from app.models import db
from app.forms.user_username_form import UsernameUpdateForm
from app.forms.user_email_form import EmailUpdateForm
from app.forms.user_phone_number_form import PhoneNumberUpdateForm
from app.forms.user_password_form import PasswordUpdateForm
from werkzeug.security import generate_password_hash
from app.api.aws_s3_bucket import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route("/<int:id>/username", methods=["PUT"])
@login_required
def username(id):

    user = User.query.get(id)
    form = UsernameUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.username = form.username.data
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {"errors": form.errors}


@user_routes.route("/<int:id>/email", methods=["PUT"])
@login_required
def user_email(id):
    user = User.query.get(id)
    form = EmailUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.email = form.email.data
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {"errors": form.errors}


@user_routes.route("/<int:id>/phone-number", methods=["PUT"])
@login_required
def user_phone_number(id):
    user = User.query.get(id)
    form = PhoneNumberUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.phone_number = form.phone_number.data
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {"errors": form.errors}


@user_routes.route("/<int:id>/hashed-password", methods=["PUT"])
@login_required
def user_hashed_password(id):
    user = User.query.get(id)
    form = PasswordUpdateForm()
    # print("\n\n\n", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print(user.hashed_password)
        # print("\n", generate_password_hash(form.old_password.data))
        if not user.check_password(form.old_password.data):
            # raise ValidationError('Password was incorrect.')
            # print("\n\n\n")
            return {"msg": "Invalid Passowrd"}
        # print("it gets here\n\n")
        user.hashed_password = generate_password_hash(form.hashed_password.data)
        # user.password(form.hashed_password)
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {"errors": form.errors}


@user_routes.route("/<int:id>/avatar", methods=["PUT"])
@login_required
def user_avatar(id):
    user = User.query.get(id)
    if request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors":"file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)
        # check if upload worked
        if "url" not in upload:
            return upload, 400

        url = upload["url"]
    else:
        url = user.avatar_url

    user.avatar_url = url
    return user.to_dict()

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
