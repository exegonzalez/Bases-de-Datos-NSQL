from db.mongo import db_comics
from db.characters import characters
from db.movies import movies
from flask_cors import CORS
from flask import Flask, jsonify, request
import json
from bson import ObjectId

app = Flask(__name__)
CORS(app)

@app.before_first_request
def insert_superheores_by_default():
    """Insertamos los personajes por defecto a la BBDD"""
    try:
        db_comics.characters.drop()
        db_comics.characters.insert_many(characters)
        db_comics.movies.drop()
        db_comics.movies.insert_many(movies)
        return 'OK'
    except:
        raise

@app.route('/movies', methods=['GET', 'DELETE', 'POST'])
def movies_abm():
    try:
        if request.method == 'DELETE':
            # Borramos el dpersonaje de la coleccion
            delete_result = db_comics.movies.delete_one({"_id": ObjectId(request.args['_id'])})
            return 'ok'

        if request.method == 'GET':

            if request.args:
                args = [k for k in dict(request.args).keys()]
                movies = list(db_comics.movies.find({"_id": ObjectId(request.args['_id'])})) if args[0] == '_id' else list(db_comics.movies.find({args[0]: request.args[args[0]]}))
                for movie in movies:
                    movie['_id'] = str(movie['_id'])
                return jsonify(movies)

            movies = list(db_comics.movies.find({}))
            for movie in movies:
                movie['_id'] = str(movie['_id'])

            return jsonify(movies)
        
        if request.method == 'POST':
            # Insertamos el personaje en la coleccion
            insert_result = db_comics.movies.insert_one(request.get_json())
            return 'OK'
    except:
        raise

@app.route('/characters', methods=['GET', 'DELETE', 'POST', 'PUT'])
def characters_abm():
    try:
        if request.method == 'DELETE':
            # Borramos el dpersonaje de la coleccion
            delete_result = db_comics.characters.delete_one({"_id": ObjectId(request.args['_id'])})
            return 'ok'

        if request.method == 'GET':

            if request.args:
                args = [k for k in dict(request.args).keys()]
                if args[0] == '_id':
                    characters = list(db_comics.characters.find({"_id": ObjectId(request.args['_id'])}))    
                elif args[0] == 'movies':
                    characters = list(db_comics.characters.find({args[0]: request.args[args[0]]}))
                else: 
                    characters = list(db_comics.characters.find({args[0]: request.args[args[0]]}))
                for character in characters:
                    character['_id'] = str(character['_id'])
                return jsonify(characters)

            characters = list(db_comics.characters.find({}))
            for character in characters:
                character['_id'] = str(character['_id'])

            return jsonify(characters)
        
        if request.method == 'POST':
            # Insertamos el personaje en la coleccion
            insert_result = db_comics.characters.insert_one(request.get_json())
            return 'OK'

        if request.method == 'PUT':
            character = request.get_json()
            for k in character:
                # Editamos el personaje en la coleccion
                if k != "_id":
                    insert_result = db_comics.characters.update_one({"_id": ObjectId(character["_id"])}, {'$set': {k: character[k]}})
            return 'OK'
    except:
        raise

if __name__ == "__main__":
    app.run(host='localhost', port='5000', debug=True)


