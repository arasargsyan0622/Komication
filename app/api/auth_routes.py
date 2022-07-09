from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
import random
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        user.online= True
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    arrayImages=[
      "http://komication.s3.amazonaws.com/c85fcf48768a4fac810e7ac3ee1a3b85.png",
      "http://komication.s3.amazonaws.com/dcd6488ac059483eb2e33c93525b8997.png",
      "http://komication.s3.amazonaws.com/7947ca9db1384b29af36427eedef527b.png",
      "http://komication.s3.amazonaws.com/c5e357ac29014d4c864e555668100510.png",
      "http://komication.s3.amazonaws.com/27ea2e1f5d584137914cf9f9f120b2a0.png",
      "http://komication.s3.amazonaws.com/f321568000034e9285e7843618eddd36.png",
      "http://komication.s3.amazonaws.com/90374e8fe7104f2e81da476fb0a1e384.png",
      "http://komication.s3.amazonaws.com/9e837dc6f9824d16a45c07b6c0c0c4d9.png",
      "http://komication.s3.amazonaws.com/b62302224b754424b55e5fe0f32d24c8.png",
    ]
    ranInt = random.randint(0,5)
    ranImg = arrayImages[ranInt]
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            online= True,
            avatar_url=ranImg
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
