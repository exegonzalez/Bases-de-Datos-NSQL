Trabajo practico numero 3 de Bases de datos NSQL

Ejercicio 1: la entrega del correspondiente ejercicio se encuentra en el directorio /geolocation
separando el backend y el frontend en sus respectivos directorios:

·backend: tp3-NSQL/geolocation/backend
·frontend: tp3-NSQL/geolocation/frontend

Instrucciones: para correr el aplicacion debera correr los siguientes comandos en un shell de linux desde el directorio tp3-NSQL
    # Muevase al directorio donde se encuentra el backend
    $ cd geolocation/backend

    # Cree la imagen del contenedor
    $ sudo docker-compose build;

    # Levante el contenedor creado
    $ sudo docker-compose up
   
    # Abra otro terminal en el directorio /tp3-NSQL/geolocation/frontend/geoapi-ui y levante el servidor con la UI para interactuar con el backend
    $ npm install; npm start