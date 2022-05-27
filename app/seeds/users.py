from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', hashed_password='password')
    zensan = User(
        username='Zensan', email='zensan@p.hub', hashed_password='DarrenStinks')
    dripgod = User(
        username='DripGod', email='dripgod@p.hub', hashed_password='password1')
    chrischarming = User(
        username='ChrisCharming', email='chrischarming@p.hub', hashed_password='password123'
    )
    cecc = User(
        username='Komi-san', email='komi@p.hub', hashed_password='password1'
    )

    db.session.add(demo)
    db.session.add(zensan)
    db.session.add(dripgod)
    db.session.add(chrischarming)
    db.session.add(cecc)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
