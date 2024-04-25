const express = require('express');
const router = express.Router();
const prisma = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./authenticate');

const { createUser, getUserByEmail } = require('../db/users');

// Get all stadiums

router.get('/stadiums', async (req, res, next) => {
	try {
		const stadiums = await prisma.Stadium.findMany();
		res.json({ stadiums });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

// Get all users

router.get('/users', async (req, res, next) => {
	try {
		const users = await prisma.User.findMany();
		res.json({ users });
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

// Login endpoint

router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		next({
			name: 'MissingCredentialsError',
			message: 'Please supply both an email and password',
		});
	}
	try {
		const user = await getUserByEmail(email);
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{
					id: user.id,
					email,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: '1w',
				}
			);

			res.json({
				message: 'Login successful!',
				token,
			});
		} else {
			next({
				name: 'IncorrectCredentialsError',
				message: 'Username or password is incorrect',
			});
		}
	} catch (err) {
		next(err);
	}
});

// Register endpoint

router.post('/register', async (req, res, next) => {
	const { name, email, password } = req.body;

	try {
		const _user = await getUserByEmail(email);

		if (_user) {
			next({
				name: 'UserExistsError',
				message: 'A user with that email already exists',
			});
		}

		const user = await createUser({
			name,
			email,
			password,
		});

		const token = jwt.sign(
			{
				id: user.id,
				email,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1w',
			}
		);

		res.send({
			message: 'Sign up successful!',
			token,
		});
	} catch ({ name, message }) {
		next({ name, message });
	}
});

// Allow user to access their information

router.get('/user', authenticateToken, async (req, res, next) => {
	try {
		if (!req.user) {
			console.log(req);
			return res.status(404).json({ error: 'Not authorized to access' });
		}
		const userId = req.user.id;
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				reviews: {},
				comments: {},
			},
		});

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json(user);
	} catch (error) {
		next(error);
	}
});

// Post review

router.post('/stadiums/:id', authenticateToken, async (req, res, next) => {
	try {
		const stadiumId = parseInt(req.params.id);
		const review = await prisma.Review.create({
			data: {
				text: req.body.text,
				scenery_rating: req.body.scenery_rating,
				food_rating: req.body.food_rating,
				pricing_rating: req.body.pricing_rating,
				stadiumId: stadiumId,
				userId: req.user.id,
			},
		});
		res.json(review);
	} catch (error) {
		next(error);
	}
});

// Create Comment

router.post(
	'/reviews/:reviewId/comments',
	authenticateToken,
	async (req, res, next) => {
		try {
			const reviewId = parseInt(req.params.reviewId);
			const review = await prisma.Comment.create({
				data: {
					text: req.body.text,
					reviewId: reviewId,
					userId: req.user.id,
				},
			});
			res.json(review);
		} catch (error) {
			next(error);
		}
	}
);

// Delete review **ALSO DELETES COMMENTS ASSOCIATED WITH IT**

router.delete(
	'/stadiums/:stadiumId/reviews/:reviewId',
	authenticateToken,
	async (req, res, next) => {
		try {
			console.log(req.user.id);
			const userId = req.user.id;
			const reviewId = parseInt(req.params.reviewId);
			const review = await prisma.Review.findUnique({
				where: {
					id: reviewId,
				},
				include: {
					user: true,
				},
			});
			if (review.user.id !== userId) {
				return res.status(403).json({ error: 'Unauthorized' });
			}
			const deletedReview = await prisma.Review.delete({
				where: {
					id: reviewId,
				},
			});
			res.json({ message: 'Review deleted.' });
		} catch (error) {
			next(error);
		}
	}
);

// Delete comment

router.delete(
	'/reviews/:reviewId/comments/:commentId',
	authenticateToken,
	async (req, res, next) => {
		try {
			const userId = req.user.id;
			const commentId = parseInt(req.params.commentId);
			const comment = await prisma.Comment.findUnique({
				where: {
					id: commentId,
				},
			});
			if (comment.user.id !== userId) {
				return res.status(403).json({ error: 'Unauthorized' });
			}
			const deletedComment = await prisma.Comment.delete({
				where: {
					id: commentId,
				},
			});
			res.json({ message: 'Comment deleted' });
		} catch (error) {
			next(error);
		}
	}
);

// Delete user

router.delete('/user/:id', authenticateToken, async (req, res, next) => {
	try {
		if (req.user.id !== parseInt(req.params.id)) {
			return res.status(403).json({ error: 'Unauthorized' });
		}
		await prisma.User.delete({
			where: {
				id: req.params.id,
			},
		});
		res.json({ message: 'User deleted' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
