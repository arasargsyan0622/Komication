from app.models import db, Channel

def seed_channels():
    channel1 = Channel(
        channel_name="general", server_id=2
    )
    channel2 = Channel(
        channel_name="tech-support", server_id=2
    )
    channel3 = Channel(
        channel_name="general-coding-help", server_id=2
    )
    channel4 = Channel(
        channel_name="memes", server_id=2
    )
    channel5 = Channel(
        channel_name="Maica's Chapel", server_id=1
    )
    channel6 = Channel(
        channel_name="Joon is Bae", server_id=3
    )
    channel7 = Channel(
        channel_name="Propane Prince", server_id=5
    )
    channel8 = Channel(
        channel_name="food", server_id=5
    )

    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.add(channel6)
    db.session.add(channel7)
    db.session.add(channel8)

    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE inbox_channels RESTART IDENTITY CASCADE;')
    db.session.commit()
