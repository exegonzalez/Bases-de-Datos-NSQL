from flask import Flask, jsonify
from flask_cors import CORS
from functionsDB import generate_points, add_point, user_radio, get_position, get_local, get_points, get_local_points_with_data

app = Flask(__name__)
CORS(app)

@app.before_first_request
def load_chapters():
    """Generar puntos de interes."""
    generate_points()

@app.route('/points/add/<point>/<longitude>/<latitude>/<name>')
def add_point_to_points(point,longitude,latitude,name):
    """Añadir punto de interes."""
    msj = add_point(point,longitude,latitude,name)
    return msj

@app.route('/user-radio/<point>/<longitude>/<latitude>')
def points_in_user_radius(point,longitude,latitude):
    """Listado de puntos de interes en un radio de 5km del usuario."""
    points = user_radio(point,longitude,latitude)
    return jsonify(points)

@app.route('/position/<point>/<name>')
def local_position(point,name):
    """Coordenadas de un local de un determinado punto."""
    coords = get_position(point,name)
    return jsonify(coords)
    
@app.route('/<point>/local-list')
def list_of_premises(point):
    """Listado de locales de un punto."""
    local = get_local(point)
    return jsonify(local)

@app.route('/get-points')
def get_points_of_interest():
    """Listado de puntos de interes."""
    points = get_points()
    return jsonify(points)

@app.route('/<point>/local-list-with-coords')
def list_of_points_with_coords(point):
    """Listado de locales de un punto."""
    sites_with_coords = get_local_points_with_data(point)
    return jsonify(sites_with_coords)


if __name__ == "__main__":
    app.run(host='backend', port='5000', debug=True)