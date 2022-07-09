from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PhoneNumberUpdateForm(FlaskForm):
    phone_number = StringField("Phone Number", validators=[DataRequired()])
