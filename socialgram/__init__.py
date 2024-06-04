from flask import Flask, Response
import os
import json
from flask_restful import Resource, Api
from socialgram.blog_api import blog_bp

########### JWT EXTENDED LIBRARIES
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin
from datetime import timedelta


def create_app(testing_config=None):

    app = Flask(__name__, instance_relative_config=True)
    app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(minutes=1)

    jwt = JWTManager(app)
    cors = CORS(app)
    app.config["CORS_HEADERS"] = "Content-Type"

    # Setting default Settings to your application
    app.config.from_mapping(
        SECRET_KEY="dev",
    )

    if testing_config is None:
        # Overrides default settings based on settings defined in config.py file, present under application instance folder
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping(testing_config)

    from socialgram.models import db, migrate

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
    db.init_app(app)

    with app.app_context():
        from socialgram.models import User, Post

        db.create_all()

    app.register_blueprint(blog_bp)

    @app.route("/home")
    def home():
        return Response(
            json.dumps({"message": "Successful in accessing RESTapi"}),
            status=201,
            mimetype="application/json",
        )

    return app
