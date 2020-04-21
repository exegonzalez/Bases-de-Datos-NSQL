import hashlib
import json

def hashdata(text):
    encrypted = hashlib.sha512(json.dumps(text).encode())
    return encrypted.hexdigest()
