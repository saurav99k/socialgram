import datetime as dt
import json
from flask import Flask, request, Response, Blueprint, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, and_, desc
from socialgram.models import db, User, Post
from flask_restful import Resource, Api, fields, marshal
import bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

blog_bp = Blueprint("socialgram", __name__)

blogapi = Api(blog_bp)


class AddUser(Resource):
    def post(self):
        data = request.json
        # print(data)
        uname = data["username"]
        pwd = data["password"]
        isUserExist = User.query.filter_by(username=uname).first()
        if isUserExist != None:
            return {"Error": "User Already Exist"}, 409

        bytes = pwd.encode("utf-8")
        salt = bcrypt.gensalt()
        hashedPassword = bcrypt.hashpw(bytes, salt)
        user = User(username=uname, password=hashedPassword)
        db.session.add(user)
        db.session.commit()
        return {"Message": "User created Successfully"}, 201


class AddPost(Resource):
    @jwt_required()
    def post(self):
        data = request.json
        postid, author, title, desc, img_path, postedat = tuple(data.values())
        post = Post(
            postId=postid,
            author_username=author,
            title=title,
            description=desc,
            imagePath=img_path,
            postedAt=postedat,
        )
        db.session.add(post)
        db.session.commit()
        return {"Message": "Post Added Successfully!"}


class LoginUser(Resource):
    def post(self):
        data = request.json
        uname = data["username"]
        pwd = data["password"]
        loggedInUser = User.query.filter_by(username=uname).first()
        if loggedInUser == None:
            return {"Error": "No such user"}, 403
        # print("USER IS ",ans)
        else:
            userBytes = pwd.encode("utf-8")
            # print("userBytes,,,", userBytes)
            hash = loggedInUser.password
            # print("HASH is, ", hash)
            result = bcrypt.checkpw(userBytes, hash)
            if result == False:
                return {"Error": "Wrong Password"}, 401
            access_token = create_access_token(identity=uname)
            return {"access_token": access_token}, 200
            # return "User Logged In",200


class Protected(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        print(current_user)
        return {"logged_in_as": current_user}, 200
        # return jsonify(logged_in_as=current_user), 200


class ShowPost(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        loggedInUser = Post.query.filter_by(author_username=current_user).all()
        postCount = len(loggedInUser)
        postDict = []
        for item in loggedInUser:
            postDict.append(
                {
                    "postid": item.postId,
                    "title": item.title,
                    "description": item.description,
                }
            )
        print(postDict, postCount)
        return {"post": postDict, "count": postCount}


blogapi.add_resource(AddUser, "/adduser")
blogapi.add_resource(AddPost, "/addpost")
blogapi.add_resource(LoginUser, "/login")
blogapi.add_resource(Protected, "/protected")
blogapi.add_resource(ShowPost, "/showpost")
