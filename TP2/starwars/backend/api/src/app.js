const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000
const app = express()
app.set('port', port)

// Middlewares
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

// Headers
app.use((req, res, next) => {
	res.header('Content-Type', 'application/json');
	res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // actualizar para que coincida con el dominio de la aplicación que hace las peticiones
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// Routes
app.use('/', require('./routes'))

app.listen(app.get('port'), () => console.log(`Server running at port ${app.get('port')}!`))