from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channel import seed_channels, undo_channels
from .channel_messages import seed_channel_messages, undo_channel_messages
from .direct_messages import seed_direct_messages, undo_direct_messages
from .inboxes import seed_inboxes, undo_inboxes
from .user_servers import seed_server_users, undo_server_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():

    seed_server_users()
    seed_channels()
    seed_channel_messages()
    seed_direct_messages()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():

    undo_server_users()
    undo_channels()
    undo_channel_messages()
    undo_direct_messages()
