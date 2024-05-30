require('dotenv').config();
const faker = require('faker');
const prisma = require('./index.js');
const bcrypt = require('bcrypt');
const { ReportGmailerrorred } = require('@mui/icons-material');

// Seed function

async function seedData() {
	try {
		// Clear database

		await prisma.comment.deleteMany();
		await prisma.review.deleteMany();
		await prisma.stadium.deleteMany();
		await prisma.user.deleteMany();

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
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/fdqnt0rxvb09puxmm4wj',
				division: 'NLC',
			},
			{
				name: 'Koffman Stadium',
				location: 'Kansas City, MO',
				team: 'Royals',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/nknvcyly3qsuiieyzzgr',
				division: 'ALC',
			},
			{
				name: 'Wrigley Field',
				location: 'Chicago, IL',
				team: 'Cubs',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/mizrwj7tgwgv5izfa4ux',
				division: 'NLC',
			},
			{
				name: 'Chase Field',
				location: 'Phoenix, AZ',
				team: 'Diamondbacks',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/v273ptwyhdby3mm31w0r',
				division: 'NLW',
			},
			{
				name: 'Truist Park',
				location: 'Atlanta, GA',
				team: 'Braves',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/kc32usntipgeiyi1fbpx',
				division: 'NLE',
			},
			{
				name: 'Camden Yards',
				location: 'Baltimore, MD',
				team: 'Orioles',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/vafqwcgeqg4hjtpwlhnz',
				division: 'ALE',
			},
			{
				name: 'Fenway Park',
				location: 'Boston, MA',
				team: 'Red Sox',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/xjtbtovu7otfctsobdxs',
				division: 'ALE',
			},
			{
				name: 'Guaranteed Rate Field',
				location: 'Chicago, IL',
				team: 'White Sox',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/qqbbkamjvzaw1tnqfcpm',
				division: 'ALC',
			},
			{
				name: 'Great American Ball Park',
				location: 'Cincinnati, OH',
				team: 'Reds',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/douwlvpffiphrvnpiipv',
				division: 'NLC',
			},
			{
				name: 'Progressive Field',
				location: 'Cleveland, OH',
				team: 'Guardians',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/kmwb1wst5zxb4rfai5ci',
				division: 'ALC',
			},
			{
				name: 'Coors Field',
				location: 'Denver, CO',
				team: 'Rockies',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/efliib715i4nhfy2xdd5',
				division: 'NLW',
			},
			{
				name: 'Comerica Park',
				location: 'Detroit, MI',
				team: 'Tigers',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/yr4vcr0qak8khuynz4wo',
				division: 'ALC',
			},
			{
				name: 'Minute Maid Park',
				location: 'Houston, TX',
				team: 'Astros',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/evcqyewzyko34zbaup8j',
				division: 'ALW',
			},
			{
				name: 'Angel Stadium',
				location: 'Anaheim, CA',
				team: 'Angels',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/ivm2lzbxutvrzrez7tgg',
				division: 'ALW',
			},
			{
				name: 'Dodger Stadium',
				location: 'Los Angeles, CA',
				team: 'Dodgers',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/xbgmh71wrdh1kltkp64p',
				division: 'NLW',
			},
			{
				name: 'loanDepot park',
				location: 'Miami, FL',
				team: 'Marlins',
				image:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSotTptHfHS41pZbqzjvEJS3BXqm9RJzSxRJA&usqp=CAU',
				division: 'NLE',
			},
			{
				name: 'American Family Field',
				location: 'Milwaukee, WI',
				team: 'Brewers',
				image:
					'https://ballparkdigest.com/wp-content/uploads/2022/04/AmFamField2022-1.jpg',
				division: 'NLC',
			},
			{
				name: 'Target Field',
				location: 'Minneapolis, MN',
				team: 'Twins',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/oqnlicrbpax5mcdjyaxm',
				division: 'ALC',
			},
			{
				name: 'Citi Field',
				location: 'Flushing, NY',
				team: 'Mets',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/iywp3qtywchpprg0ddt1',
				division: 'NLE',
			},
			{
				name: 'Yankee Stadium',
				location: 'Bronx, NY',
				team: 'Yankees',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/oaqpybpbz9jdtesibdnu',
				division: 'ALE',
			},
			{
				name: 'Oakland Coliseum',
				location: 'Oakland, CA',
				team: 'Athletics',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/trbz0eocufcwcr7avbum',
				division: 'ALW',
			},
			{
				name: 'Citizens Bank Park',
				location: 'Philadelphia, PA',
				team: 'Phillies',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/y7m7qggp10049cmqfsxe',
				division: 'NLE',
			},
			{
				name: 'PNC Park',
				location: 'Pittsburgh, PA',
				team: 'Pirates',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/hjen1uskbhm4ujryupcs',
				division: 'NLC',
			},
			{
				name: 'Petco Park',
				location: 'San Diego, CA',
				team: 'Padres',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/cu7tff5bnxnc63nngjql',
				division: 'NLW',
			},
			{
				name: 'Oracle Park',
				location: 'San Francisco, CA',
				team: 'Giants',
				image:
					'https://www.sftravel.com/sites/default/files/styles/share_image/public/2023-01/Oracle%20Park%20%283%29_0.JPG.webp?itok=wy2oDwrv',
				division: 'NLW',
			},
			{
				name: 'T-Mobile Park',
				location: 'Seattle, WA',
				team: 'Mariners',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w2208/mlb/sswtdqkyqp0fxacialff.jpg',
				division: 'ALW',
			},
			{
				name: 'Tropicana Field',
				location: 'St. Petersburg, FL',
				team: 'Rays',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/vhgdfcyprggeo5gfwqiq',
				division: 'ALE',
			},
			{
				name: 'Globe Life Field',
				location: 'Arlington, TX',
				team: 'Rangers',
				image:
					'https://www.hksinc.com/wp-content/uploads/2020/10/cs-GlobeLife-h.jpg',
				division: 'ALW',
			},
			{
				name: 'Rogers Centre',
				location: 'Toronto, Ontario, Canada',
				team: 'Blue Jays',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/ytnvc6mqynz2ylaah7xc',
				division: 'ALE',
			},
			{
				name: 'Nationals Park',
				location: 'Washington, DC',
				team: 'Nationals',
				image:
					'https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w640/mlb/mmej14mwxnq74ysd80gc',
				division: 'NLE',
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
		console.error('Data could not be seeded.', error);
	} finally {
		await prisma.$disconnect();
	}

	// Create Admin

	const password = await bcrypt.hash('adminpassword', 8);

	await prisma.User.create({
		data: {
			name: 'Admin',
			email: "admin@gmail.com",
			password: password,
			admin: true,
		},
	});

	console.log('Admin created');
}

if (require.main === module) {
	seedData();
}

module.exports = seedData;
