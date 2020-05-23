from pymongo import MongoClient

def connectionDB(host, port, database):
    try:
        client = MongoClient(host, port)
        db = client.get_database(database)
        return db
    except :
        raise

_host_db_clustering_map ='db_clustering_map'
_port_db_clustering_map = 27017
_db_clustering_map = 'clustering_map'

db_clustering_map = connectionDB(_host_db_clustering_map, _port_db_clustering_map, _db_clustering_map)
