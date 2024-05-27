import re
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.orm import relationship
from sqlalchemy import Integer, ForeignKey, String, Column

db = SQLAlchemy()
migrate = Migrate()


class User(db.Model):
    username = db.Column(db.String(10), primary_key=True)
    password = db.Column(db.String(60))
    posts = relationship("Post", backref="author", lazy=True)


class Post(db.Model):
    postId = db.Column(db.String(10), primary_key=True)
    author_username = db.Column(
        db.String(10), db.ForeignKey("user.username"), nullable=False
    )
    title = db.Column(db.String(100))
    description = db.Column(db.String(100))
    imagePath = db.Column(db.String(50))
    postedAt = db.Column(db.String(10))
