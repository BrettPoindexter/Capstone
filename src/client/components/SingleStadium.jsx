import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from './AppAppBar';
import SingleStadiumHeader from './SingleStadiumHeader';
import Container from '@mui/material/Container';
import FAQ from './FAQ';
import Footer from './Footer';
import getLPTheme from './getLPTheme';
import { Paper, Avatar, Grid, Button, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import HoverRating from './HoverRating';
import InputTags from './InputTags';
import CommentsButton from './CommentsButton';
import DisplayLocalTime from './DisplayLocalTime';


export default function SingleStadium() {
	const [singleStadium, setStadium] = useState();
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const [newReview, setReview] = useState('');
	const [newFoodRating, setNewFoodRating] = useState('');
	const [newSceneryRating, setNewSceneryRating] = useState('');
	const [newPricingRating, setNewPricingRating] = useState('');
	const [newComment, setComment] = useState({});
const token = window.sessionStorage.getItem('token');

	useEffect(() => {
		async function getSingleStadium(stadiumId) {
			try {
				const response = await fetch(
					`/api/stadiums/${stadiumId}`
				);
				const result = await response.json();
				setStadium(result.stadium);
			} catch (error) {
				console.error(error);
			}
		}
		getSingleStadium(id);
	}, singleStadium);

	async function handleCommentSubmit(e, reviewId) {
		e.preventDefault();
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				throw new Error('Not Authenticated');
			}

			const response = await fetch(
				`/api/reviews/${reviewId}/comments`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						text: newComment[reviewId],
					}),
				}
			);
			const result = await response.json();
			setStadium(result.stadium);
			setComment('');
		} catch (error) {
			console.error(error);
		}
	}

	async function handleReviewSubmit(e) {
		e.preventDefault();
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				throw new Error('Not Authenticated');
			}
			const response = await fetch(`/api/stadiums/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					text: newReview,
					scenery_rating: parseInt(newSceneryRating),
					food_rating: parseInt(newFoodRating),
					pricing_rating: parseInt(newPricingRating),
				}),
			});
			const result = await response.json();
			setStadium(result.stadium);
			setReview('');
			setNewFoodRating('');
			setNewSceneryRating('');
			setNewPricingRating('');
		} catch (error) {
			console.error(error);
			localStorage.removeItem('token');
			window.location.href = '/login';
		}
	}

	function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100dvw',
					position: 'fixed',
					bottom: 24,
				}}
			>
				<ToggleButtonGroup
					color='primary'
					exclusive
					value={showCustomTheme}
					onChange={toggleCustomTheme}
					aria-label='Platform'
					sx={{
						backgroundColor: 'background.default',
						'& .Mui-selected': {
							pointerEvents: 'none',
						},
					}}
				>
					<ToggleButton value>
						<AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
						Custom theme
					</ToggleButton>
					<ToggleButton value={false}>MUI Design 2</ToggleButton>
				</ToggleButtonGroup>
			</Box>
		);
	}

	ToggleCustomTheme.propTypes = {
		showCustomTheme: PropTypes.shape({
			valueOf: PropTypes.func.isRequired,
		}).isRequired,
		toggleCustomTheme: PropTypes.func.isRequired,
	};
	const [mode, setMode] = React.useState('light');
	const [showCustomTheme, setShowCustomTheme] = React.useState(true);
	const LPtheme = createTheme(getLPTheme(mode));
	const defaultTheme = createTheme({ palette: { mode } });
	const [value, setValue] = React.useState(0);
	const toggleColorMode = () => {
		setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
	};

	return (
		<>
			{singleStadium && (
				<div>
					<ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
						<CssBaseline />
						<AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
						<Divider />
						<Box sx={{ bgcolor: 'background.default' }}>
							<SingleStadiumHeader stadium={singleStadium} />
							<Container
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'left',
									pb: { xs: 8, sm: 12 }
									
								}}
							>
								<img src={singleStadium.image} />
								<h2 style={{ textDecorationLine: 'underline' }}>
									Reviews and Comments
								</h2>
								<span style={{height: '450px', overflowY: 'scroll'}}>
									{singleStadium.reviews.map((review, index) => {
										return (
											<Paper
												key={index}
												style={{ padding: '40px 20px', marginTop: 20 }}
											>
												<Grid container wrap='nowrap' spacing={2}>
													<Grid item>
														<Avatar alt='Remy Sharp' src='' />
													</Grid>
													<Grid justifyContent='left' item xs zeroMinWidth>
														<h4 style={{ margin: 0, textAlign: 'left' }}>
															{review.user.name}
														</h4>
														<p style={{ textAlign: 'left' }}>{review.text}</p>
														<p style={{ textAlign: 'left', color: 'gray' }}>
															<p style={{ textAlign: 'left' }}>
																<DisplayLocalTime
																	utcTimestamp={review.createdAt}
																/>
															</p>
															<TextField
																fullWidth
																type='text'
																variant='standard'
																size='small'
																sx={{ margin: '1rem 0' }}
																margin='none'
																value={newComment[review.id] || ''}
																onChange={(e) => setComment({...newComment, [review.id]: e.target.value})}
																placeholder='Any comments?'
															/>
															<Button
																variant='contained'
																color='primary'
																onClick={(e) =>
																	handleCommentSubmit(e, review.id)
																}
															>
																Add Comment
															</Button>
															<Rating
																value={review.scenery_rating}
																name='rating'
																readOnly
															/>
														</p>
														<Stack direction='row' spacing={1}>
															<Chip label='#Friendly' />
															<Chip label='#Good Food' />
															<Chip label='#Clean' />
														</Stack>
													</Grid>
												</Grid>
											</Paper>
										);
									})}
								</span>
								<h2 style={{ textDecorationLine: 'underline' }}>
									Leave a Review
								</h2>
								{token && 
								
								<Paper
									style={{
										padding: '40px 20px',
										marginTop: 20,
										borderRadius: 50,
									}}
								>
									<Grid container wrap='nowrap' spacing={2}>
										<Grid justifyContent='left' item xs zeroMinWidth>
											<h4
												style={{ margin: 0, textAlign: 'left', color: 'blue' }}
											>
												
											</h4>
											<InputTags />
											<Grid container direction={'row'} spacing={5}>
												<Grid item>
													<TextField
														variant='standard'
														size='small'
														sx={{ margin: '1rem 0' }}
														type='number'
														value={newFoodRating}
														onChange={(e) => setNewFoodRating(e.target.value)}
														id='food'
														placeholder='Food Rating (1 - 5)'
													/>
												</Grid>
												<Grid item>
													<TextField
														variant='standard'
														size='small'
														sx={{ margin: '1rem 0' }}
														margin='none'
														type='number'
														value={newPricingRating}
														onChange={(e) =>
															setNewPricingRating(e.target.value)
														}
														id='pricing'
														placeholder='Price Rating (1 - 5)'
													/>
												</Grid>
												<Grid item>
													<TextField
														variant='standard'
														size='small'
														sx={{ margin: '1rem 0' }}
														margin='none'
														type='number'
														value={newSceneryRating}
														onChange={(e) =>
															setNewSceneryRating(e.target.value)
														}
														id='scenery'
														placeholder='Scenery Rating (1 - 5)'
													/>
												</Grid>
											</Grid>
											<TextField
												fullWidth
												type='text'
												variant='standard'
												size='small'
												sx={{ margin: '1rem 0' }}
												margin='none'
												value={newReview}
												onChange={(e) => setReview(e.target.value)}
												placeholder='Any comments?'
											/>
											<Grid container direction={'column'} spacing={1}>
												<Grid item color={'blue'} fontWeight={'bold'}>
													Overall Rating
												</Grid>
												<Grid item>
													<HoverRating />
												</Grid>
												<Grid item>
													<CommentsButton handleSubmit={handleReviewSubmit} />
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Paper>
								
								}

								{!token && 
								
								<p style={{color: 'maroon', fontWeight: 'bold'}}>Please <a href='/login'>Login</a> to leave a review</p>
								
								}
								
							</Container>
							<Divider />
							<FAQ />
							<Divider />
							<Footer />
						</Box>
					</ThemeProvider>
				</div>
			)}
		</>
	);
}
