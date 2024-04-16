const express = require('express');
const app = express();
const router = require('./api/routes');

app.use(express.json());
app.use('/api', router);
app.use(express.static('public'));

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
	next(err);
});

const port = 3000;

app.listen(port, () => {
	console.log(`Listening on http://localhost:3000`);
});
