const express = require('express');
const router = express.Router();
const prisma = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createUser, getUser, getUserByEmail } = require('../db');

// Get all stadiums

router.get('/stadiums', async (req, res, next) => {
	try {
		const stadiums = await prisma.Stadium.findMany();
		res.json({ stadiums });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

// Get single stadium

router.get('/stadiums/:id', async (req, res, next) => {
	try {
		const stadiumId = parseInt(req.params.id);
		const stadium = await prisma.Stadium.findUnique({
			where: {
				id: stadiumId,
			},
			include: {
				reviews: {
					include: {
						comments: {},
					},
				},
			},
		});

		if (!stadium) {
			return res.status(404).json({ Error: 'Stadium not found' });
		}

		res.json({ stadium });
	} catch (error) {
		next(error);
	}
});

// Get all stadium reviews

router.get('/stadium/reviews', async (req, res, next) => {
	try {
	} catch (error) {}
});

// usersRouter.post('/login', async (req, res, next) => {
// 	const { email, password } = req.body;
// 	if (!email || !password) {
// 		next({
// 			name: 'MissingCredentialsError',
// 			message: 'Please supply both an email and password',
// 		});
// 	}
// 	try {
// 		const user = await getUser({ email, password });
// 		if (user) {
// 			const token = jwt.sign(
// 				{
// 					id: user.id,
// 					email,
// 				},
// 				process.env.JWT_SECRET,
// 				{
// 					expiresIn: '1w',
// 				}
// 			);

// 			res.send({
// 				message: 'Login successful!',
// 				token,
// 			});
// 		} else {
// 			next({
// 				name: 'IncorrectCredentialsError',
// 				message: 'Username or password is incorrect',
// 			});
// 		}
// 	} catch (err) {
// 		next(err);
// 	}
// });

// usersRouter.post('/register', async (req, res, next) => {
// 	const { name, email, password } = req.body;

// 	try {
// 		const _user = await getUserByEmail(email);

// 		if (_user) {
// 			next({
// 				name: 'UserExistsError',
// 				message: 'A user with that email already exists',
// 			});
// 		}

// 		const user = await createUser({
// 			name,
// 			email,
// 			password,
// 		});

// 		const token = jwt.sign(
// 			{
// 				id: user.id,
// 				email,
// 			},
// 			process.env.JWT_SECRET,
// 			{
// 				expiresIn: '1w',
// 			}
// 		);

// 		res.send({
// 			message: 'Sign up successful!',
// 			token,
// 		});
// 	} catch ({ name, message }) {
// 		next({ name, message });
// 	}
// });

module.exports = router;
