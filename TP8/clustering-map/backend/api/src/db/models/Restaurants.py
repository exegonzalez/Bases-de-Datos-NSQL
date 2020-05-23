from ..database import db_clustering_map
from bson import ObjectId
from .data.restaurants import collection

def add(restaurant):
    return db_clustering_map.restaurants.insert_one(restaurant)

def remove(restaurant):
    return db_clustering_map.restaurants.delete_one({"_id": ObjectId(restaurant)})
    
def modify(dictionary):
    for key in dictionary:
        if key != "_id":
            db_clustering_map.restaurants.update_one({"_id": ObjectId(dictionary["_id"])}, {'$set': {key: dictionary[key]}})
    return

def get(dictionary):
    restaurants = []
    if '_id' in dictionary:
        restaurants = list(db_clustering_map.restaurants.find({"_id": ObjectId(dictionary["_id"])}))
    elif 'lastElement' in dictionary:
        restaurants = list(db_clustering_map.restaurants.find({}).limit(1).sort([(dictionary["lastElement"],-1)]))
    else:
        restaurants = list(db_clustering_map.restaurants.find(dictionary))

    for restaurant in restaurants:
        restaurant['_id'] = str(restaurant['_id'])

    return restaurants

def save():
    return db_clustering_map.restaurants.insert_many(collection)

def flush():
    return db_clustering_map.restaurants.remove()

def distinct(field):
    attributes = []
    attributes = list(db_clustering_map.restaurants.distinct(field))
    return attributes