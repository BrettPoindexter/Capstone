const faker = require('faker');
const prisma = require('./index.js');
const bcrypt = require('bcrypt');

// Seed function

async function seedData() {
	try {
    
		// Clear database

		await prisma.Comment.deleteMany();
		await prisma.Review.deleteMany();
		await prisma.Stadium.deleteMany();
		await prisma.User.deleteMany();

		// Create 64 users

		const users = Array.from({ length: 64 }).map(() => ({
			name: `${faker.name.firstName()} ${faker.name.lastName()}`,
			email: faker.internet.email(),
			password: bcrypt.hashSync(faker.internet.password(), 8),
		}));

		await prisma.User.createMany({ data: users });

		// Create array of stadium objects

		const stadiums = [
			{
				name: 'Busch Stadium',
				location: 'St. Louis, MO',
				team: 'Cardinals',
			},
			{
				name: 'Koffman Stadium',
				location: 'Kansas City, MO',
				team: 'Royals',
			},
			{
				name: 'Wrigley Field',
				location: 'Chicago, IL',
				team: 'Cubs',
			},
			{
				name: 'Chase Field',
				location: 'Phoenix, AZ',
				team: 'Diamondbacks',
			},
			{
				name: 'Truist Park',
				location: 'Atlanta, GA',
				team: 'Braves',
			},
			{
				name: 'Oriole Park',
				location: 'Baltimore, MD',
				team: 'Orioles',
			},
			{
				name: 'Fenway Park',
				location: 'Boston, MA',
				team: 'Red Sox',
			},
			{
				name: 'Guaranteed Rate Field',
				location: 'Chicago, IL',
				team: 'White Sox',
			},
			{
				name: 'Great American Ball Park',
				location: 'Cincinnati, OH',
				team: 'Reds',
			},
			{
				name: 'Progressive Field',
				location: 'Cleveland, OH',
				team: 'Guardians',
			},
			{
				name: 'Coors Field',
				location: 'Denver, CO',
				team: 'Rockies',
			},
			{
				name: 'Comerica Park',
				location: 'Detroit, MI',
				team: 'Tigers',
			},
			{
				name: 'Minute Maid Park',
				location: 'Houston, TX',
				team: 'Astros',
			},
			{
				name: 'Angel Stadium',
				location: 'Anaheim, CA',
				team: 'Angels',
			},
			{
				name: 'Dodger Stadium',
				location: 'Los Angeles, CA',
				team: 'Dodgers',
			},
			{
				name: 'loanDepot park',
				location: 'Miami, FL',
				team: 'Marlins',
			},
			{
				name: 'American Family Field',
				location: 'Milwaukee, WI',
				team: 'Brewers',
			},
			{
				name: 'Target Field',
				location: 'Minneapolis, MN',
				team: 'Twins',
			},
			{
				name: 'Citi Field',
				location: 'Flushing, NY',
				team: 'Mets',
			},
			{
				name: 'Yankee Stadium',
				location: 'Bronx, NY',
				team: 'Yankees',
			},
			{
				name: 'Oakland Coliseum',
				location: 'Oakland, CA',
				team: 'Athletics',
			},
			{
				name: 'Citizens Bank Park',
				location: 'Philadelphia, PA',
				team: 'Phillies',
			},
			{
				name: 'PNC Park',
				location: 'Pittsburgh, PA',
				team: 'Pirates',
			},
			{
				name: 'Petco Park',
				location: 'San Diego, CA',
				team: 'Padres',
			},
			{
				name: 'Oracle Park',
				location: 'San Francisco, CA',
				team: 'Giants',
			},
			{
				name: 'T-Mobile Park',
				location: 'Seattle, WA',
				team: 'Mariners',
			},
			{
				name: 'Tropicana Field',
				location: 'St. Petersburg, FL',
				team: 'Rays',
			},
			{
				name: 'Globe Life Field',
				location: 'Arlington, TX',
				team: 'Rangers',
			},
			{
				name: 'Rogers Centre',
				location: 'Toronto, Ontario, Canada',
				team: 'Blue Jays',
			},
			{
				name: 'Nationals Park',
				location: 'Washington, DC',
				team: 'Nationals',
			},
		];

		// Create stadium data

		await prisma.Stadium.createMany({ data: stadiums });

		// Halves the count of users and stadiums and then iterates through them and seeds reviews to only half of the stadiums

		const createdStadiums = await prisma.Stadium.findMany();
		const createdUsers = await prisma.User.findMany();

		const halfUsers = Math.ceil(createdUsers.length / 2);
		const halfStadiums = Math.ceil(createdStadiums.length / 2);

		const reviews = [];

		createdUsers.slice(0, halfUsers).forEach((user) => {
			createdStadiums.slice(0, halfStadiums).forEach((stadium) => {
				reviews.push({
					scenery_rating: faker.datatype.number({ min: 1, max: 5 }),
					food_rating: faker.datatype.number({ min: 1, max: 5 }),
					pricing_rating: faker.datatype.number({ min: 1, max: 5 }),
					text: faker.lorem.paragraph(),
					userId: user.id,
					stadiumId: stadium.id,
				});
			});
		});

		await prisma.Review.createMany({ data: reviews });

		// Add comments to all reviews

		const createdReviews = await prisma.Review.findMany();
		const comments = [];

		createdUsers.forEach((user) => {
			createdReviews.forEach((review) => {
				comments.push({
					text: faker.lorem.sentence(),
					userId: user.id,
					reviewId: review.id,
				});
			});
		});

		await prisma.Comment.createMany({ data: comments });

		console.log('DB seeded');
	} catch (error) {
		console.error(error);
	}
}

if (require.main === module) {
	seedData();
}

module.exports = seedData;
