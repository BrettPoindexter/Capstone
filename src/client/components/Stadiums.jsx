import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/system';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import stadiumImg from '../assets/stadiumImg.png';
import fiveStars from '../assets/fiveStars.png';
import { Rating } from '@mui/material';

export default function Stadiums() {
	const theme = useTheme();
	const [stadiums, setStadiums] = useState([]);
	const [filteredResults, setFilteredResults] = useState([]);
	const [searchInput, setSearchInput] = useState('');

 
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

	useEffect(() => {
		// Runs the getStadiums function after the page loads
		getStadiums();

		// only runs once because of the [] second argument
	}, []);

	function getStadiums() {
		// Make an HTTP GET request to fetch stadiums data from the backend
		fetch('/api/stadiums')
			.then((response) => response.json())
			.then((data) => {
				setStadiums(data.stadiums);
			})
			.catch((error) => {
				console.error('Error fetching stadiums:', error);
			});
	}

	const handleInputChange = (e) => {
		const searchTerm = e.target.value;
		setSearchInput(searchTerm);

		const filteredItems = stadiums.filter((stadium) => {
			if (searchTerm !== '')
				return (
					stadium.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					stadium.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
					stadium.location.toLowerCase().includes(searchTerm.toLowerCase())
				);
		});
		setFilteredResults(filteredItems);
	};

	const renderStadiums = (stadiumsList) => (
		<Grid container spacing={3}>
			{stadiumsList.map((stadium, index) => (
				<Grid item xs={12} sm={6} md={4} key={index}>
					<Link to={`/stadiums/${stadium.id}`} style={{ textDecoration: 'none' }}>
						<Card
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								flexGrow: 1,
								p: 2,
								borderRadius: 2,
								boxShadow: 3,
								transition: 'transform 0.3s, box-shadow 0.3s',
								'&:hover': {
									transform: 'scale(1.05)',
									boxShadow: 6,
								},
							}}
						>
							<CardContent>
								<Box
									component="img"
									src={stadium.image || stadiumImg}
									alt={stadium.name}
									sx={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 1 }}
								/>
								<Rating value={randomNumberInRange(1,5)} name="rating" readOnly />
							</CardContent>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									p: 2,
								}}
							>
								<CardHeader
									title={stadium.name}
									subheader={stadium.location}
									sx={{
										p: 0,
										'& .MuiCardHeader-title': {
											fontFamily: 'Montserrat, sans-serif',
											fontWeight: 600,
										},
										'& .MuiCardHeader-subheader': {
											fontFamily: 'Roboto, sans-serif',
											fontWeight: 300,
										},
									}}
								/>
								<CardContent sx={{ p: 0 }}>
									<Typography
										variant="body1"
										color="text.secondary"
										sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
									>
										{stadium.team}
									</Typography>
								</CardContent>
							</Box>
						</Card>
					</Link>
				</Grid>
			))}
		</Grid>
	);

	return (
		<Container
			id="stadiums"
			sx={{
				pt: { xs: 4, sm: 12 },
				pb: { xs: 8, sm: 16 },
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: { xs: 3, sm: 6 },
			}}
		>
			<TextField
				icon="search"
				placeholder="Search..."
				onChange={handleInputChange}
				fullWidth
				autoFocus
				sx={{ mb: 3, fontFamily: 'Roboto, sans-serif' }}
			/>
			{renderStadiums(searchInput ? filteredResults : stadiums)}
		</Container>
	);
}
