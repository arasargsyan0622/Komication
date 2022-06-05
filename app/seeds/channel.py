from app.models import db, Channel

def seed_channels():

    channel1 = Channel(
        channel_name="general", server_id=2, channel_uuid= "3c09ab2201854103a892ecf7318052e2"
    )
    channel2 = Channel(
        channel_name="general", server_id=3, channel_uuid= "cd87b76c5ff04fe3a9d7a25f8abb4142"
    )
    channel3 = Channel(
        channel_name="general", server_id=4, channel_uuid= "4700cdd4de1e4c7e99767f9cf0602bbc"
    )
    channel4 = Channel(
        channel_name="general", server_id=5, channel_uuid= "5ae4f3fdd8d7411399fa06d2f93fe81d"
    )
    channel5 = Channel(
        channel_name="general", server_id=6, channel_uuid= "c58f673f1a944a7aabea99b31f6163d9"
    )
    channel6 = Channel(
        channel_name="general", server_id=7, channel_uuid= "c3971fe4223a44d0a75a2b0c84669722"
    )
    channel7 = Channel(
        channel_name="general", server_id=8, channel_uuid= "314e15b1f2b44be7a60de6eb63581a52"
    )
    channel8 = Channel(
        channel_name="general", server_id=9, channel_uuid= "ca7d65b361934bea97c86fcf3e7b2346"
    )
    channel9 = Channel(
        channel_name="general", server_id=10, channel_uuid= "37982f06605443fd813986100142ab3e"
    )
    channel10 = Channel(
        channel_name="Celtics in 6", server_id=10, channel_uuid= "72195354a4004ee6beb2c89c7bf02533"
    )
    channel11 = Channel(
    channel_name="general", server_id=1, channel_uuid= "4d7772777b5e415a9a6c0e5bbc02f08e"
    )
    channel12 = Channel(
        channel_name="tech-support", server_id=1, channel_uuid= "baaa1d0c1fab428c809f832629afbd1a"
    )
    channel13 = Channel(
        channel_name="general-coding-help", server_id=1, channel_uuid= "33677a2a107c4743b8897b145a5b84f5"
    )
    channel14 = Channel(
        channel_name="memes", server_id=1, channel_uuid= "f56cb45f73044333a17eb5670647dc78"
    )
    channel15 = Channel(
        channel_name="Maica's Chapel", server_id=1, channel_uuid= "8691e613f0424a7c9153e6f6a6392c24"
    )
    channel16 = Channel(
        channel_name="Joon is Bae", server_id=1, channel_uuid= "e0c347ccbcee45508e41470ff13a829f"
    )
    channel17 = Channel(
        channel_name="Propane Prince", server_id=5, channel_uuid= "6188cca295734a71969d5f146e0a1679"
    )
    channel18 = Channel(
        channel_name="food", server_id=5, channel_uuid= "03002cc377b843a89c28184fbc264edf"
    )

    channel19 = Channel(
        channel_name="CBD4ME", server_id=3, channel_uuid= "9eb011ab15d748068b8414516b4908af"
    )
    channel20 = Channel(
        channel_name="Joon Fans", server_id=4, channel_uuid= "c14b310b6f3b4f9ca2e8585ca6804ad2"
    )
    channel21 = Channel(
        channel_name="Leo Fans", server_id=4, channel_uuid= "08ec36573759454d8d660906d9d49b4d"
    )
    channel22 = Channel(
        channel_name="JoonXLeo Fans", server_id=4, channel_uuid= "fefd292c04bb40388779fccac10d3a57"
    )

    channels = [channel1, channel2, channel3, channel4, channel5, channel6, channel7, channel8, \
                channel9, channel10, channel11, channel12, channel13, channel14, channel15, channel16,\
                channel17, channel18, channel19, channel20, channel21, channel22
                ]

    for channel in channels:
        db.session.add(channel)

    db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE inbox_channels RESTART IDENTITY CASCADE;')
    db.session.commit()
