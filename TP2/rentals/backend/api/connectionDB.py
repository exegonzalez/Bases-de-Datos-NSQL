import redis

def connect_db():
    """Crear conexion a la base de datos."""
    conexion = redis.StrictRedis(host='localhost',port=6379,db=0, decode_responses=True)
    if(conexion.ping()):
        print("Conectado al servidor de redis")
    else:
        print("Error")
    return conexion