from app.models import db, Server, User

def seed_servers():
    ripgod = User(
        username='RipGod', email='ripgod@p.hub', hashed_password='password1')
    server1 = Server(
        server_name="Novohort", server_icon_url="", server_invite_url="1", user_id=5
    )
    server2 = Server(
        server_name="a/A Jan 2022", server_icon_url="", server_invite_url="2", user_id=5
    )
    server3 = Server(
        server_name="Thunks for Thots", server_icon_url="", server_invite_url="3", user_id=2
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
        server_name="a/A Feb 2022", server_icon_url="", server_invite_url="7", user_id=5, users=[ripgod]
    )
    server8 = Server(
        server_name="Propane Prince", server_icon_url="", server_invite_url="8", user_id=5, users=[ripgod]
    )
    db.session.add(ripgod)
    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server4)
    db.session.add(server5)
    db.session.add(server6)
    db.session.add(server7)
    db.session.add(server8)

    db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
