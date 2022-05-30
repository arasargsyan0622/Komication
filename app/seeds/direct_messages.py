from app.models import db, DirectMessage

def seed_direct_messages():
    message1 = DirectMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=2, inbox_channel_id=1
    )
    message2 = DirectMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=1, inbox_channel_id=1
    )
    message3 = DirectMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=1, inbox_channel_id=1
    )
    message4 = DirectMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=2, inbox_channel_id=1
    )
    message5 = DirectMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=3, inbox_channel_id=2
    )
    message6 = DirectMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=4, inbox_channel_id=2
    )
    message7 = DirectMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id=3, inbox_channel_id=2
    )
    message8 = DirectMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
         user_id=3, inbox_channel_id=2
    )


    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)

    db.session.commit()

def undo_direct_messages():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
