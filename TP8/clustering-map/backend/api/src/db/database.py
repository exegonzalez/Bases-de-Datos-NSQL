import firebase_admin
from firebase_admin import credentials, firestore
import os

firebase_credential_path = os.path.abspath('src/db/credentials/firebase.json')

def connectionDB(firebase_credential):
    try:
        cred = credentials.Certificate(firebase_credential)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        return db
    except :
        raise

db_clustering_map = connectionDB(firebase_credential_path)