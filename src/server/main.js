require("dotenv").config();
const express = require('express');
const app = express();
const routes = require('./api/routes');
const router = require('vite-express')
//set up .env file


app.use(express.json());
app.use('/api', routes);
app.use(express.static('public'));

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
	next(err);
});

const port = 3000;

router.listen(app, port, () => {
	console.log(`Listening on http://localhost:3000`);
});
