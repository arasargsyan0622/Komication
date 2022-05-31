from app.models import db, Channel

def seed_channels():
    channel1 = Channel(
        channel_name="general", server_id=2, channel_uuid= "4d7772777b5e415a9a6c0e5bbc02f08e"
    )
    channel2 = Channel(
        channel_name="tech-support", server_id=2, channel_uuid= "baaa1d0c1fab428c809f832629afbd1a"
    )
    channel3 = Channel(
        channel_name="general-coding-help", server_id=2, channel_uuid= "33677a2a107c4743b8897b145a5b84f5"
    )
    channel4 = Channel(
        channel_name="memes", server_id=2, channel_uuid= "f56cb45f73044333a17eb5670647dc78"
    )
    channel5 = Channel(
        channel_name="Maica's Chapel", server_id=1, channel_uuid= "8691e613f0424a7c9153e6f6a6392c24"
    )
    channel6 = Channel(
        channel_name="Joon is Bae", server_id=3, channel_uuid= "e0c347ccbcee45508e41470ff13a829f"
    )
    channel7 = Channel(
        channel_name="Propane Prince", server_id=5, channel_uuid= "6188cca295734a71969d5f146e0a1679"
    )
    channel8 = Channel(
        channel_name="food", server_id=5, channel_uuid= "03002cc377b843a89c28184fbc264edf"
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
