from app.models import db, InboxChannel


# Adds a demo user, you can add other users here if you want
def seed_inboxes():
    inbox1 = InboxChannel(
        )
    inbox2 = InboxChannel(
        )
    inbox3 = InboxChannel(
        )
    inbox4 = InboxChannel(
        )
    inbox5 = InboxChannel(
        )

    db.session.add(inbox1)
    db.session.add(inbox2)
    db.session.add(inbox3)
    db.session.add(inbox4)
    db.session.add(inbox5)

    db.session.commit()

def undo_inboxes():
    db.session.execute('TRUNCATE inbox_channels RESTART IDENTITY CASCADE;')
    db.session.commit()
