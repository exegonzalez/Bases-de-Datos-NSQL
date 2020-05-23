from flask_cors import CORS
from flask import Flask, jsonify, request
from db.models import Restaurants

app = Flask(__name__)
CORS(app)

@app.before_first_request
def load_collections():
    """Insertamos los personajes por defecto a la BBDD"""
    try:
        Restaurants.flush()
        Restaurants.load()
        return 'OK'
    except:
        raise

@app.route('/restaurants', methods=['GET', 'DELETE', 'POST', 'PUT'])
def restaurant_abm():
    try:
        if request.method == 'DELETE':
            remove_result = Restaurants.remove(request.args['_id'])
            return 'OK'

        if request.method == 'GET':
            if request.args:
                return jsonify(Restaurants.get(dict(request.args)))

        if request.method == 'POST':
            add_result = Restaurants.add(request.get_json())
            return 'OK'
        
        if request.method == 'PUT':
            modify_result = Restaurants.modify(request.get_json())
            return 'OK'
            
    except:
        raise

@app.route('/restaurants/<field>')
def filter_restaurants(field):
    try:
        return jsonify(Restaurants.distinct(field))
    except:
        raise

if __name__ == "__main__":
    app.run(host='localhost', port='5000', debug=True)