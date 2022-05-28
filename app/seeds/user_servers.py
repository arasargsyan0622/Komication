from app.models import db, User, Server, InboxChannel

def seed_server_users():
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

    server1 = Server(
        server_name="Novohort", server_icon_url="", server_invite_url="1", user_id=5, users=[zensan, cecc, dripgod, chrischarming]
    )
    server2 = Server(
        server_name="a/A Jan 2022", server_icon_url="", server_invite_url="2", user_id=5, users=[zensan, cecc, dripgod]
    )
    server3 = Server(
        server_name="Thunks for Thots", server_icon_url="", server_invite_url="3", user_id=2, users=[]
    )
    server4 = Server(
        server_name="Komication", server_icon_url="", server_invite_url="4", user_id=1
    )
    server5 = Server(
        server_name="MS Paint", server_icon_url="", server_invite_url="5", user_id=1
    )
    server6 = Server(
        server_name="Matterhorn", server_icon_url="", server_invite_url="6", user_id=3
    )
    server7 = Server(
        server_name="a/A Feb 2022", server_icon_url="", server_invite_url="7", user_id=5,
    )
    server8 = Server(
        server_name="Propane Prince", server_icon_url="", server_invite_url="8", user_id=5,
    )

    inbox1 = InboxChannel( channel_inbox_user=[zensan, dripgod]
        )
    inbox2 = InboxChannel(
        )
    inbox3 = InboxChannel(
        )
    inbox4 = InboxChannel(
        )
    inbox5 = InboxChannel(
        )

    db.session.add(demo)
    db.session.add(zensan)
    db.session.add(dripgod)
    db.session.add(chrischarming)
    db.session.add(cecc)

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server4)
    db.session.add(server5)
    db.session.add(server6)
    db.session.add(server7)
    db.session.add(server8)

    db.session.add(inbox1)
    db.session.add(inbox2)
    db.session.add(inbox3)
    db.session.add(inbox4)
    db.session.add(inbox5)

    db.session.commit()

def undo_server_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE inbox_channels RESTART IDENTITY CASCADE;')

    db.session.commit()
