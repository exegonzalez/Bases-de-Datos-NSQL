Trabajo practico numero 2 de Bases de datos NSQL

Ejercicio 1: la entrega del correspondiente ejercicio se encuentra en el directorio /star-wars
separando el backend y el frontend en sus respectivos directorios:

·backend: tp2-NSQL/star-wars/backend
·frontend: tp2-NSQL/star-wars/frontend

Instrucciones: para correr el aplicacion debera correr los siguientes comandos en un shell de linux desde el directorio tp2-NSQL
    # Muevase al directorio donde se encuentra el backend
    $ cd star-wars/backend

    # Cree la imagen del contenedor
    $ sudo docker-compose build;

    # Levante el contenedor creado
    $ sudo docker-compose up
   
    # Abra otro terminal en el directorio /tp2-NSQL/star-wars/frontend/api-ui y levante el servidor con la UI para interactuar con el backend
    $ npm install; npm start


Ejercicio 2: la entrega del correspondiente ejercicio se encuentra en el directorio /rentals
separando el backend y el frontend en sus respectivos directorios.

backend: tp2-NSQL/rentals/backend
frontend: tp2-NSQL/rentals/frontend

Instrucciones: para correr el aplicacion debera correr los siguientes comandos en un shell de linux desde el directorio tp2-NSQL
    # Muevase al directorio donde se encuentra el backend
    $ cd rentals/backend

    # Cree la imagen del contenedor
    $ sudo docker-compose build;

    # Levante el contenedor creado
    $ sudo docker-compose up

    # Abra otro terminal en el directorio donde esta actualmente, muevase al directorio donde se encuentra el servidor de la api y levantelo
    $ cd api; export FLASK_APP=app.py; export FLASK_DEBUG=1; flask run --host localhost --port 5000

    # Abra otro terminal en el directorio /tp2-NSQL/rentals/frontend/api-ui y levante el servidor con la UI para interactuar con el backend
    $ export FLASK_APP=app.py; export FLASK_DEBUG=1; flask run --host localhost --run 3000