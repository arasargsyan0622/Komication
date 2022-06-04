from app.models import db, ChannelMessage

def seed_channel_messages():
    channel_msg1 = ChannelMessage(
        content="",
        user_id=1,channel_id=2
    )
    channel_msg2 = ChannelMessage(
        content="",
        user_id=1,channel_id=2
    )
    channel_msg3 = ChannelMessage(
        content="",
        user_id=2,channel_id=2
    )
    channel_msg4 = ChannelMessage(
        content="",
        user_id=3,channel_id=2
    )
    channel_msg5 = ChannelMessage(
        content="",
        user_id=2,channel_id=1
    )
    channel_msg6 = ChannelMessage(
        content="",
        user_id=1,channel_id=3
    )
    channel_msg7 = ChannelMessage(
        content="",
        user_id=3,channel_id=5
    )
    channel_msg8 = ChannelMessage(
        content="",
        user_id=1,channel_id=5
    )
    channel_msg9 = ChannelMessage(
        content="",
        user_id=1,channel_id=5
    )
    channel_msg10 = ChannelMessage(
        content="",
        user_id=1,channel_id=5
    )
    channel_msg11 = ChannelMessage(
        content="",
        user_id=1,channel_id=2
    )
    channel_msg12 = ChannelMessage(
        content="",
        user_id=1,channel_id=2
    )
    channel_msg13 = ChannelMessage(
        content="",
        user_id=2,channel_id=2
    )
    channel_msg14 = ChannelMessage(
        content="",
        user_id=3,channel_id=2
    )
    channel_msg15 = ChannelMessage(
        content="",
        user_id=2,channel_id=1
    )
    channel_msg16 = ChannelMessage(
        content="",
        user_id=1,channel_id=3
    )
    channel_msg17 = ChannelMessage(
        content="",
        user_id=3,channel_id=5
    )
    channel_msg18 = ChannelMessage(
        content="",
        user_id=1,channel_id=5
    )
    channel_msg19 = ChannelMessage(
        content="",
        user_id=1,channel_id=5
    )
    channel_msg20 = ChannelMessage(
        content="",
        user_id=1,channel_id=5
    )
    channel_msgs = [
            channel_msg1, channel_msg2, channel_msg3, channel_msg4, channel_msg5, channel_msg6, channel_msg7, channel_msg8,channel_msg9, channel_msg10, \
            channel_msg11, channel_msg12, channel_msg13, channel_msg14, channel_msg15, channel_msg16, channel_msg17, channel_msg18,channel_msg19, channel_msg20,
                    ]


    db.session.commit()

def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
