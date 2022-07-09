from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User
from app.models import db
from app.forms.user_username_form import UsernameUpdateForm
from app.forms.user_email_form import EmailUpdateForm
from app.forms.user_phone_number_form import PhoneNumberUpdateForm
from app.forms.user_password_form import PasswordUpdateForm
from werkzeug.security import generate_password_hash

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route("/<int:id>/username", methods=["PUT"])
@login_required
def username(id):
    print("this is backend \n\n\n")
    user = User.query.get(id)
    form = UsernameUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.username = form.username.data
        db.session.add(user)
        db.session.commit()
        return user.to_dict()


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


@user_routes.route("/<int:id>/hashed-password", methods=["PUT"])
@login_required
def user_hashed_password(id):
    user = User.query.get(id)
    form = PasswordUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("meowzer\n\n\n\n", user.hashed_password)
        user.hashed_password = generate_password_hash(form.hashed_password.data)
        # user.password(form.hashed_password)
        db.session.add(user)
        db.session.commit()
        return user.to_dict()


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
