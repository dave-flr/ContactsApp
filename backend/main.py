import os
from flask import Flask, request
from pony.flask import Pony
from flask_restful import Api, Resource
from pony.orm import Database, Required, Optional, db_session, commit
from login import *

app = Flask(__name__)
app.config.update(dict(
    DEBUG=False,
    PONY={
        'provider': 'postgres',
        'user': 'postgres',
        'password': 'admin',
        'host': 'localhost',
        'database': 'contacts'
    }
))

# Make pony the default ORM
Pony(app)

# Create the API
api = Api(app)
db = Database()


class User(db.Entity):
    username = Required(str, unique=True)
    password = Required(str)


class Contacts(db.Entity):
    phone_number = Required(str)
    name = Required(str)


class Login(Resource):
    def post(self):
        try:
            data = request.form
            user = User.get(username=data.get('username'))

            if user is None:
                raise Exception('Invalid username')

            if check_password_hash(data.get('password'), user.password):
                token = encode_auth_token(user.id, user.username).decode()

                return {'status': 'ok',
                        'user': (user.to_dict(exclude="password")),
                        'token': token}, 200
            else:
                raise Exception('Invalid password or username')
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 401


class ContactsList(Resource):
    def get(self):
        """Get all contacts"""
        try:
            user = check_user_session(request)
            return [contact.to_dict() for contact in list(Contacts.select())], 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 401


class EditContacts(Resource):
    # @db_session
    def get(self, contact_id):
        """Gets a single contacts"""
        try:
            user = check_user_session(request)
            return Contacts.get(id=contact_id).to_dict(), 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 401

    # @db_session
    def post(self):
        """Create a contact"""
        try:
            user = check_user_session(request)
            contact = Contacts(phone_number=request.form.get('phone_number'), name=request.form.get('name'))
            # commit()
            return {'status': 'ok',
                    'contact': contact.to_dict()}, 201
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 401

    # @db_session
    def delete(self, contact_id):
        """Delete a contact"""
        try:
            user = check_user_session(request)
            Contacts[contact_id].delete()
            return {'status': 'ok', 'message': 'Contact was deleted'}, 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 401

    # @db_session
    def put(self, contact_id):
        """Update a contact"""
        try:
            user = check_user_session(request)
            contact = Contacts[contact_id]
            contact.name = request.form.get('name')
            contact.phone_number = request.form.get('phone_number')
            return {'status': 'ok',
                    'contact': contact.to_dict()}, 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 401


def check_user_session(request_):
    auth_header = request_.headers.get('Authorization')

    if auth_header is None:
        raise Exception('You must indicate Authorization token. The auth token is missing')

    auth_token = auth_header.split(" ")[1]

    user_payload = decode_auth_token(auth_token)

    user = User.get(id=user_payload.get('sub'))
    if not user:
        raise Exception('Username not found')

    return user


db.bind(**app.config['PONY'])
db.generate_mapping(create_tables=True)

# endpoints here:
api.add_resource(Login, '/login')  # Ready
api.add_resource(ContactsList, '/contacts')  # Ready
api.add_resource(EditContacts,
                 '/contacts/<int:contact_id>',
                 '/contacts/create',
                 '/contacts/delete/<int:contact_id>',
                 '/contacts/update/<int:contact_id>', )  # Ready

if __name__ == '__main__':
    # app.run(host="0.0.0.0", port=int(os.environ.get('PORT', 5000)))
    app.run(debug=True)
