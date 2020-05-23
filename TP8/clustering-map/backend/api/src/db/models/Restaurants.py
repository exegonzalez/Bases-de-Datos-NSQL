from ..database import db_clustering_map
from firebase_admin import firestore
from .data.restaurants import collection

def add(restaurant):
    return db_clustering_map.collection(u'restaurants').add(restaurant)

def remove(restaurant):
    return db_clustering_map.collection(u'restaurants').document(restaurant).delete()
    
def modify(dictionary):
    document = db_clustering_map.collection(u'restaurants').document(dictionary["_id"])
    for key in dictionary:
        if key != "_id":
            document.update({key: dictionary[key]})
    return

def get(dictionary):
    restaurants_without_id = []

    if '_id' in dictionary:
        document = db_clustering_map.collection(u'restaurants').document(dictionary["_id"]).get()
        
        if document.to_dict(): restaurants_without_id.append(document.to_dict())

    elif 'lastElement' in dictionary:
        documents = (db_clustering_map.collection(u'restaurants')
            .order_by(u'restaurant_id', direction=firestore.Query.DESCENDING)
            .limit(1).stream())
        
        for document in documents: restaurants_without_id.append(document.to_dict())

    else:
        if len(dictionary.keys()) == 1:
            keys = [key for key in dictionary.keys()]
            documents = (db_clustering_map.collection(u'restaurants')
                .where(u'{0}'.format(keys[0]), u'==', u'{0}'.format(dictionary[keys[0]]))
                .stream())
            
            for document in documents: restaurants_without_id.append(document.to_dict())

        elif len(dictionary.keys()) == 2:
            keys = [key for key in dictionary.keys()]
            documents = (db_clustering_map.collection(u'restaurants')
                .where(u'{0}'.format(keys[0]), u'==', u'{0}'.format(dictionary[keys[0]]))
                .where(u'{0}'.format(keys[1]), u'==', u'{0}'.format(dictionary[keys[1]]))
                .stream())

            for document in documents: restaurants_without_id.append(document.to_dict())

        elif len(dictionary.keys()) == 3:
            keys = [key for key in dictionary.keys()]
            documents = (db_clustering_map.collection(u'restaurants')
                .where(u'{0}'.format(keys[0]), u'==', u'{0}'.format(dictionary[keys[0]]))
                .where(u'{0}'.format(keys[1]), u'==', u'{0}'.format(dictionary[keys[1]]))
                .where(u'{0}'.format(keys[2]), u'==', u'{0}'.format(dictionary[keys[2]]))
                .stream())

            for document in documents: restaurants_without_id.append(document.to_dict())
    
    restaurants_with_id = []

    for restaurant in restaurants_without_id:
        restaurant = restaurant
        restaurant['_id'] = document.id
        restaurants_with_id.append(restaurant)

    return restaurants_with_id

def load():
    batch = db_clustering_map.batch()
    
    for item in collection: 
        restaurants_firestore = db_clustering_map.collection(u'restaurants').document()
        batch.set(restaurants_firestore, item)

    batch.commit()
    return 'OK'

def flush():
    batch = db_clustering_map.batch()
    documents = db_clustering_map.collection(u'restaurants').stream()

    for item in documents:
        restaurant = db_clustering_map.collection(u'restaurants').document(item.id)
        batch.delete(restaurant)
    batch.commit()

    return 'OK'

def distinct(field):
    documents = db_clustering_map.collection(u'restaurants').stream()

    categories = []
    for item in documents:
        if field in item.to_dict():
            if item.to_dict()[field] not in categories: 
                categories.append(item.to_dict()[field])

    return categories