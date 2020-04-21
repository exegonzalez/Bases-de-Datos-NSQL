from db.mongo import db_encrypted, db_decrypted
from agent.hash import hashdata
from flask_cors import CORS
from flask import Flask, jsonify, request
from agent.coinmarketcap import fetch_listings
import json
import requests

app = Flask(__name__)
CORS(app)

@app.before_first_request
def fetch_cryptocoins():
    """Solicitar cryptomonedas al agente cuando se levanta el servidor y guardarlas en la BBDD."""
    try:
        # Hacemos la solicitud de criptomonedas a la api de coinmarketcap
        listhings = fetch_listings(1,500)
        # Encriptamos cada uno de los datos
        listhings_encrypted = [{"cmc_rank":thing["cmc_rank"],"data": hashdata(thing)} for thing in listhings]
        # Planchamos las colecciones de monedas encriptadas
        db_encrypted.encryptedcoins.drop()
        # Planchamos las colecciones de monedas desencriptadas
        db_decrypted.decryptedcoins.drop()
        # Añadimos los datos nuevamente
        db_encrypted.encryptedcoins.insert_many(listhings_encrypted)
        # Añadimos los datos nuevamente
        db_decrypted.decryptedcoins.insert_many(listhings)
        return 'OK'
    except:
        raise
    
@app.route('/cryptocoins')
def get_cryptocoins():
    """Retorna todas las criptomonedas"""
    try:
        # Buscamos los datos en la base de datos encriptada y lo pasamos a una lista de python
        cryptocoins_encrypted = list(db_encrypted.encryptedcoins.find({},{"_id":0}).limit(500))
        # Buscamos los datos en la base de datos desencriptada y lo pasamos a una lista de python
        cryptocoins_decrypted = list(db_decrypted.decryptedcoins.find({},{"_id":0}).limit(500))
        # Encriptamos los datos de la base de datos sin encriptar
        listhings_encrypted = [{"cmc_rank":thing["cmc_rank"],"data": hashdata(thing)} for thing in cryptocoins_decrypted]
        # Comparamos los datos para saber si fueron alterados        
        if(cryptocoins_encrypted==listhings_encrypted):
            # Si no fueron alterados
            return {"cryptocoins": cryptocoins_decrypted}
        else:
            # Si fueron alterados
            fetch_cryptocoins()
            return get_cryptocoins()
    except:
        raise
    
@app.route('/cryptocoins/<rank>', methods=['GET', 'DELETE'])
def cryptocoins(rank):
    try:
        if request.method == 'DELETE':
            # Borramos el dato de la coleccion de monedas encriptadas
            DeleteResultE = db_encrypted.encryptedcoins.delete_one({"cmc_rank": rank})
            # Borramos el dato de la coleccion de monedas desencriptadas
            DeleteResultD = db_decrypted.decryptedcoins.delete_one({"cmc_rank": rank})
            # Devolvemos una respuesta con la cantidad de datos eliminados
            return {"status": 'OK', "deleted_count": DeleteResultD.deleted_count}

        if request.method == 'GET':
            # Buscamos los datos en la base de datos encriptada y lo pasamos a una lista de python
            cryptocoin_encrypted = list(db_encrypted.encryptedcoins.find({"cmc_rank": rank},{"_id":0}))
            # Buscamos los datos en la base de datos desencriptada y lo pasamos a una lista de python
            cryptocoin_decrypted = list(db_decrypted.decryptedcoins.find({"cmc_rank": rank},{"_id":0}))
            # Encriptamos los datos de la base de datos sin encriptar
            listhing_encrypted = [{"cmc_rank":thing["cmc_rank"],"data": hashdata(thing)} for thing in cryptocoin_decrypted]
            # Comparamos los datos para saber si fueron alterados
            if(cryptocoin_encrypted==listhing_encrypted):
                # Si no fueron alterados
                return {"cryptocoin": cryptocoin_decrypted}
            else:
                fetch_cryptocoins()
                # Si fueron alterados
                return dict(db_decrypted.decryptedcoins.find({"cmc_rank": rank},{"_id":0}))
    except:
        raise

@app.route('/cryptocoins/top20')
def get_cryptocoins_top_20():
    """Retorna el top 20 de criptomonedas"""
    try:
        # Buscamos los datos en la base de datos encriptada y lo pasamos a una lista de python
        cryptocoins_encrypted = list(db_encrypted.encryptedcoins.find({},{"_id":0}).limit(20))
        # Buscamos los datos en la base de datos desencriptada y lo pasamos a una lista de python
        cryptocoins_decrypted = list(db_decrypted.decryptedcoins.find({},{"_id":0}).limit(20))
        # Encriptamos los datos de la base de datos sin encriptar
        listhings_encrypted = [{"cmc_rank":thing["cmc_rank"],"data": hashdata(thing)} for thing in cryptocoins_decrypted]
        # Comparamos los datos para saber si fueron alterados        
        if(cryptocoins_encrypted==listhings_encrypted):
            # Si no fueron alterados
            return {"cryptocoins": cryptocoins_decrypted}
        else:
            # Si fueron alterados
            fetch_cryptocoins()
            return get_cryptocoins_top_20()
    except:
        raise

@app.route('/cryptocoins/top5')
def get_cryptocoins_top_5():
    """Retorna el top 5 de criptomonedas"""
    try:
        # Buscamos los datos en la base de datos encriptada y lo pasamos a una lista de python
        cryptocoins_encrypted = list(db_encrypted.encryptedcoins.find({},{"_id":0}).limit(5))
        # Buscamos los datos en la base de datos desencriptada y lo pasamos a una lista de python
        cryptocoins_decrypted = list(db_decrypted.decryptedcoins.find({},{"_id":0}).limit(5))
        # Encriptamos los datos de la base de datos sin encriptar
        listhings_encrypted = [{"cmc_rank":thing["cmc_rank"],"data": hashdata(thing)} for thing in cryptocoins_decrypted]
        # Comparamos los datos para saber si fueron alterados        
        if(cryptocoins_encrypted==listhings_encrypted):
            # Si no fueron alterados
            return {"cryptocoins": cryptocoins_decrypted}
        else:
            # Si fueron alterados
            fetch_cryptocoins()
            return get_cryptocoins_top_5()
    except:
        raise

if __name__ == "__main__":
    app.run(host='localhost', port='5000', debug=True)