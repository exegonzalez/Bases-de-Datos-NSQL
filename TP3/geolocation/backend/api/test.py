import redis

def client():
    """Crear conexion a la base de datos."""
    conexion = redis.StrictRedis(host='localhost',port=6379,db=0, decode_responses=True)
    if(conexion.ping()):
        print("Conectado al servidor de redis")
    else:
        print("Error")
    return conexion

def get_local(point):
    con = client()
    local = []
    local = con.lrange(point.capitalize(),0,-1)
    return local

def get_position(point,name):
    con = client()
    coordinates = con.geopos('g'+point.capitalize(),name.capitalize())
    return coordinates[0]

def get_local_points_with_data(point):
    con = client()
    sites = get_local(point)
    sites_with_coords = []
    for s in sites:
        coords = get_position(point, s)
        swc = {'name': s, 'lon':coords[0], 'lat': coords[1]}
        sites_with_coords.append(swc)
    return sites_with_coords



print(get_local_points_with_data('breweries'))

