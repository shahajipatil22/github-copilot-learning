// create node express application with cors and body-parser and run on 3005 port

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // import cors package
const app = express();
const port = 3005;

// include created route in app
const routes = require('./route');

app.use(cors()); // use cors middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books',routes);

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// serve react application all routes
// app.use(express.static('public'));

// app.get('/', (req, res) => res.send('Hello World!'));

