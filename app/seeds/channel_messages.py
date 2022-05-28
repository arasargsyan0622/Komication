from app.models import db, ChannelMessage

def seed_channel_messages():
    channel_msg1 = ChannelMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=1,channel_id=2
    )
    channel_msg2 = ChannelMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=1,channel_id=2
    )
    channel_msg3 = ChannelMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=2,channel_id=2
    )
    channel_msg4 = ChannelMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=3,channel_id=2
    )
    channel_msg5 = ChannelMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=2,channel_id=1
    )
    channel_msg6 = ChannelMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=1,channel_id=3
    )
    channel_msg7 = ChannelMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=3,channel_id=5
    )
    channel_msg8 = ChannelMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=1,channel_id=5
    )

    db.session.add(channel_msg1)
    db.session.add(channel_msg2)
    db.session.add(channel_msg3)
    db.session.add(channel_msg4)
    db.session.add(channel_msg5)
    db.session.add(channel_msg6)
    db.session.add(channel_msg7)
    db.session.add(channel_msg8)

    db.session.commit()

def undo_channel_messages():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
