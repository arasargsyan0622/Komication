from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class UserInboxCreateForm(FlaskForm):
    newUser = StringField('username', validators=[DataRequired()])
