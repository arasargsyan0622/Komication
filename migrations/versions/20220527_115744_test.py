"""test

Revision ID: e3656035d4b3
Revises: ffdc0a98111c
Create Date: 2022-05-27 11:57:44.561673

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e3656035d4b3'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('inbox_channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_a', sa.Integer(), nullable=False),
    sa.Column('user_b', sa.Integer(), nullable=False),
    sa.Column('user_a_hide', sa.Boolean(), nullable=True),
    sa.Column('user_b_hide', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['user_a'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_b'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('servers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('server_name', sa.String(length=50), nullable=False),
    sa.Column('private', sa.Boolean(), nullable=False),
    sa.Column('server_icon_url', sa.String(length=255), nullable=True),
    sa.Column('server_invite_url', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('banner_url', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('server_invite_url')
    )
    op.create_table('channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('channel_name', sa.String(length=50), nullable=False),
    sa.Column('server_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['server_id'], ['servers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('direct_messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=1000), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('inbox_id', sa.Integer(), nullable=False),
    sa.Column('edited', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['inbox_id'], ['inbox_channels.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('channel_messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=1000), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('channel_id', sa.Integer(), nullable=False),
    sa.Column('edited', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['channel_id'], ['channels.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('avatar_url', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('online', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'online')
    op.drop_column('users', 'avatar_url')
    op.drop_table('channel_messages')
    op.drop_table('direct_messages')
    op.drop_table('channels')
    op.drop_table('servers')
    op.drop_table('inbox_channels')
    # ### end Alembic commands ###