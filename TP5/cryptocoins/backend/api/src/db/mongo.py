from pymongo import MongoClient

def connectionDB(host, port, database):
    try:
        client = MongoClient(host, port)
        db = client.get_database(database)
        return db
    except :
        raise

_host_db_encrypted ='db_encrypted'
_port_db_encrypted = 27017
_encrypted = 'encrypted'

_host_db_decrypted ='db_decrypted'
_port_db_decrypted = 27017
_decrypted = 'decrypted'

db_encrypted = connectionDB(_host_db_encrypted, _port_db_encrypted, _encrypted)
db_decrypted = connectionDB(_host_db_decrypted, _port_db_decrypted, _decrypted)