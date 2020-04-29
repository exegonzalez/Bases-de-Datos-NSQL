from pymongo import MongoClient

def connectionDB(host, port, database):
    try:
        client = MongoClient(host, port)
        db = client.get_database(database)
        return db
    except :
        raise

_host_db_comics ='db_comics'
_port_db_comics = 27017
_db_comics = 'comics'

db_comics = connectionDB(_host_db_comics, _port_db_comics, _db_comics)
