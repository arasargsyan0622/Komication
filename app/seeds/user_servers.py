from app.models import db, User, Server, InboxChannel
from werkzeug.security import generate_password_hash

def seed_server_users():
    demo = User(
        username='Demo', email='demo@aa.io', hashed_password=generate_password_hash("password")
    )
    zensan = User(
        username='Zensan', email='zensan@p.hub', hashed_password=generate_password_hash('DarrenStinks')
    )
    dripgod = User(
        username='DripGod', email='dripgod@p.hub', hashed_password=generate_password_hash('password1')
    )
    chrischarming = User(
        username='ChrisCharming', email='chrischarming@p.hub', hashed_password=generate_password_hash('password123')
    )
    cecc = User(
        username='Komi-san', email='komi@p.hub', hashed_password=generate_password_hash('password1')
    )

    server1 = Server(
        server_name="Novohort", server_icon_url="", server_invite_url="c27ca0cc1cc64ac3abb983b7af80bdf6", user_id=5, users=[zensan, cecc, dripgod, chrischarming]
    )
    server2 = Server(
        server_name="a/A Jan 2022", server_icon_url="", server_invite_url="bf03534952094518ab2ca0e4c0e30608", user_id=5, users=[zensan, cecc, dripgod]
    )
    server3 = Server(
        server_name="Thunks for Thots", server_icon_url="", server_invite_url="589d5d5de7a14bb59834bb6f35dd1d83", user_id=2, users=[demo, zensan]
    )
    server4 = Server(
        server_name="Komication", server_icon_url="", server_invite_url="4b7aaa64604b4632ae79be43a94e000b", user_id=1, users=[demo, cecc, dripgod, chrischarming]
    )
    server5 = Server(
        server_name="MS Paint", server_icon_url="", server_invite_url="d1bc0e87129843c09a384c34dc1edf9a", user_id=1, users=[demo, cecc, dripgod, chrischarming]
    )
    server6 = Server(
        server_name="Matterhorn", server_icon_url="", server_invite_url="d908dea78e434db382ad0e8ef999ca35", user_id=3, users=[zensan, cecc, dripgod, chrischarming]
    )
    server7 = Server(
        server_name="a/A Feb 2022", server_icon_url="", server_invite_url="f9082062be324829b39ad358ad20f7f5", user_id=5, users=[zensan, cecc, dripgod, chrischarming]
    )
    server8 = Server(
        server_name="Propane Prince", server_icon_url="", server_invite_url="da98e0700e3543b98d865a2c24bef528", user_id=5, users=[zensan, cecc, dripgod, chrischarming]
    )

    inbox1 = InboxChannel( inbox_uuid="4dd7745f900f44f69cefdec53fd57f8b", channel_inbox_user=[zensan, dripgod]
        )
    inbox2 = InboxChannel( inbox_uuid="c486d729df984094ad7b871ff53a8ef5", channel_inbox_user=[cecc, dripgod]
        )
    inbox3 = InboxChannel( inbox_uuid="4e280b32701240a5abdd92d3bae33410", channel_inbox_user=[zensan, chrischarming]
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


    db.session.commit()

def undo_server_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE inbox_channels RESTART IDENTITY CASCADE;')

    db.session.commit()
