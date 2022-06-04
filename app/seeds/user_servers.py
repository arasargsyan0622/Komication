from app.models import db, User, Server, InboxChannel
from werkzeug.security import generate_password_hash

def seed_server_users():
    # users ---------------------------------------------------------------------------------------
    demo = User(
        username='Komi-san', email='komi@aa.io', hashed_password=generate_password_hash("password"),
        avatar_url='http://komication.s3.amazonaws.com/c85fcf48768a4fac810e7ac3ee1a3b85.png'
    )
    danny = User(
        username='PropanePrince', email='danny@aa.io', hashed_password=generate_password_hash("password"),
        avatar_url='http://komication.s3.amazonaws.com/7947ca9db1384b29af36427eedef527b.png'
    )


    bri = User(
        username='ATLShawty', email='brob@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/c5e357ac29014d4c864e555668100510.png'
    )

    cesar = User(
        username='casp1701', email='cesar@aa.io', hashed_password=generate_password_hash("password"),
        avatar_url='http://komication.s3.amazonaws.com/90374e8fe7104f2e81da476fb0a1e384.png'
    )

    zensan = User(
        username='Zensan', email='zensan@p.hub', hashed_password=generate_password_hash('DarrenStinks'),
        avatar_url='http://komication.s3.amazonaws.com/27ea2e1f5d584137914cf9f9f120b2a0.png'
    )
    dripgod = User(
        username='DripGod', email='dripgod@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/f321568000034e9285e7843618eddd36.png'
    )
    chrischarming = User(
        username='ChrisCharming', email='chrischarming@p.hub', hashed_password=generate_password_hash('password123'),
        avatar_url='http://komication.s3.amazonaws.com/dcd6488ac059483eb2e33c93525b8997.png'
    )
    cecc = User(
        username='ComeEatChinaCity', email='dkong@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/c5e357ac29014d4c864e555668100510.png'
    )

    paul = User(
        username='DukeSilver', email='pmelhus@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/90374e8fe7104f2e81da476fb0a1e384.png'
    )

    leo = User(
        username='Deddy', email='lladip@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/9e837dc6f9824d16a45c07b6c0c0c4d9.png'
    )

    maica = User(
        username='Maica<3Edel', email='maicas@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/f321568000034e9285e7843618eddd36.png'
    )

    josh = User(
        username='CrispyPatalim', email='josh@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/b62302224b754424b55e5fe0f32d24c8.png'
    )

    cel = User(
        username='calaurum', email='cal@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/7947ca9db1384b29af36427eedef527b.png'
    )

    down = User(
        username='Downster', email='brendan@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/2a95bbc5137241088d54b869a318f7ff.png'
    )

    agustin = User(
        username='zuccahoo', email='agustin@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/d2dc0f64255d4a168afa07ae7bea7c06.png'
    )

    brianmay =  User(
        username='Spacecampin', email='brianm@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/9e837dc6f9824d16a45c07b6c0c0c4d9.png'
    )

    kai = User(
        username='Full SQLAlchemist', email='kai@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/c3a5683ae679420aab4f44bd221ec9a6.png'
    )

    bb = User(
        username='steeni', email='bb@p.hub', hashed_password=generate_password_hash('password1'),
        avatar_url='http://komication.s3.amazonaws.com/ca1d1a3c21ce46d6a05101a0059120e6.png'
    )

    # server ---------------------------------------------------------------------------------------

    server1 = Server(
        server_name="Novohort", server_icon_url="http://komication.s3.amazonaws.com/abf34130c4fa482eaaeaf60f1c415639.png",
        server_invite_url="c27ca0cc1cc64ac3abb983b7af80bdf6", user_id=1,
        users=[demo,danny, bri,zensan,dripgod,chrischarming,cecc,paul,leo,maica,josh,cel,down, agustin, brianmay, kai, bb, cesar]
    )
    server2 = Server(
        server_name="a/A Jan 2022", server_icon_url="http://komication.s3.amazonaws.com/f380c276974e4ecbbb5e230924e92614.png",
        server_invite_url="bf03534952094518ab2ca0e4c0e30608", user_id=2,
        users=[demo,danny, bri,zensan,dripgod,chrischarming,cecc,paul,leo,maica,josh,cel,down, agustin, brianmay, kai, bb, cesar]
    )
    server3 = Server(
        server_name="Thunks for Thots", server_icon_url="http://komication.s3.amazonaws.com/f0291d8101874da2a679581a435d0224.png",
        server_invite_url="589d5d5de7a14bb59834bb6f35dd1d83", user_id=1,
        users=[ bri,zensan,dripgod,chrischarming,maica,josh,cel,down, agustin, brianmay, kai, cesar]
    )
    server4 = Server(
        server_name="Komication", server_icon_url="http://komication.s3.amazonaws.com/f3cb9fa173a444c28314cd14f4423bc4.png",
        server_invite_url="4b7aaa64604b4632ae79be43a94e000b", user_id=3,
        users=[demo,danny, bri, maica,josh,cel,down, agustin, brianmay, kai]
    )
    server5 = Server(
        server_name="MS Paint", server_icon_url="http://komication.s3.amazonaws.com/e0a1fbbef7164b32b9b18b30d885d476.png",
        server_invite_url="d1bc0e87129843c09a384c34dc1edf9a", user_id=2,
        users=[demo,danny, chrischarming,cecc,paul,leo,josh,cel,down, agustin, brianmay, kai, cesar]
    )
    server6 = Server(
        server_name="Louisana CBD", server_icon_url="http://komication.s3.amazonaws.com/5ac948c855984f9bbeec0efc7a4e0322.png",
        server_invite_url="CBD4LYFE", user_id=3,
        users=[demo,danny, bri,zensan,dripgod, josh,cel,down, agustin, brianmay, kai, bb, cesar]
    )
    server7 = Server(
        server_name="Joon Leo Fan Club", server_icon_url="http://komication.s3.amazonaws.com/3f169e286605448e807503a4e8151e8a.png",
        server_invite_url="f9082062be324829b39ad358ad20f7f5", user_id=3,
        users=[demo,danny, bri,zensan,cecc,paul,leo,maica, agustin, brianmay, kai, bb, cesar]
    )
    server8 = Server(
        server_name="Push2Main4Life",
        server_invite_url="da98e0700e3543b98d865a2c24bef528", user_id=6,
        users=[chrischarming]
    )

    server9 = Server(
        server_name="Task Beaver", server_icon_url="http://komication.s3.amazonaws.com/5c99d41b63c1491ba04ab24bee54a6c5.png",
        server_invite_url="5bdaf0deb5854c31a03c228d7fac9130", user_id=11,
        users=[demo, dripgod,chrischarming,josh]
    )

    server10 = Server(
        server_name="Debonair BnB",
        server_invite_url="d7bbe56be5fb4deb94001b1fd21bce24", user_id=5,
        users=[paul,brianmay, kai]
    )


    # server = Server(
    #     server_name="", server_icon_url="", server_invite_url="", user_id=5,
    #     users=[demo,danny, bri,zensan,dripgod,chrischarming,cecc,paul,leo,maica,josh,cel,down, agustin, brianmay, kai, bb, cesar]
    # )

    # inbox ---------------------------------------------------------------------------------------

    inbox1 = InboxChannel( inbox_uuid="4dd7745f900f44f69cefdec53fd57f8b", channel_inbox_user=[zensan, dripgod]
        )
    inbox2 = InboxChannel( inbox_uuid="c486d729df984094ad7b871ff53a8ef5", channel_inbox_user=[cecc, dripgod]
        )
    inbox3 = InboxChannel( inbox_uuid="dcf1e19a83d5482785734518dea9189d", channel_inbox_user=[demo, chrischarming]
        )
    inbox4 = InboxChannel( inbox_uuid="55970fe869d24df1b90bbfcb61cf36dd", channel_inbox_user=[demo, bri]
        )
    inbox5 = InboxChannel( inbox_uuid="37f8a3571c054840889865c282fa13ba", channel_inbox_user=[demo, danny]
        )
    inbox6 = InboxChannel( inbox_uuid="4e280b32701240a5abdd92d3bae33410", channel_inbox_user=[danny, cecc]
        )

    userArr=[demo,danny, bri,zensan,dripgod,chrischarming,cecc,paul,leo,maica,josh,cel,down, agustin, brianmay, kai, bb, cesar]

    for user in userArr:
        db.session.add(user)

    serverArr = [server1, server2, server3, server4, server5,server6, server7,server8,server9,server10]
    for server in serverArr:
        db.session.add(server)

    inboxArr = [inbox1, inbox2, inbox3, inbox4, inbox5, inbox6]

    for inbox in inboxArr:
        db.session.add(inbox)



    db.session.commit()

def undo_server_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE inbox_channels RESTART IDENTITY CASCADE;')

    db.session.commit()
