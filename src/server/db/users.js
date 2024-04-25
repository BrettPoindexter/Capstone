const prisma = require('./index');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async ({ name = 'first last', email, password }) => {
	const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
	try {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
		return user;
	} catch (err) {
		throw err;
	}
};

const getUser = async ({ email, password }) => {
	if (!email || !password) {
		return;
	}
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) return;
		const hashedPassword = user.password;
		const passwordsMatch = await bcrypt.compare(password, hashedPassword);
		if (!passwordsMatch) return;
		delete user.password;
		return user;
	} catch (err) {
		throw err;
	}
};

const getUserByEmail = async (email) => {
	try {
		const user = await prisma.User.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) {
			return;
		}
		return user;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	createUser,
	getUser,
	getUserByEmail,
};
