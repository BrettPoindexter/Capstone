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
import getLPTheme, { green } from './getLPTheme';
import { Paper, Avatar, Grid, Button } from "@mui/material";
import Rating from '@mui/material/Rating'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import HoverRating from './HoverRating';
import InputTags from './InputTags';
import CommentsBox from './CommentsBox';
import CommentsButton from './CommentsButton';



export default function SingleStadium() {
	const [singleStadium, setStadium] = useState();
	const { id } = useParams();
  const [newComment, setComment] = useState();

	useEffect(() => {
		async function getSingleStadium(stadiumId) { 
			try {
				const response = await fetch(
					`http://localhost:3000/api/stadiums/${stadiumId}`
				);
				const result = await response.json();
				setStadium(result.stadium);
			} catch (error) {
				console.error(error);
			}
		}
		getSingleStadium(id);
	}, [id]);


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
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
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
          pb: { xs: 8, sm: 12 },
        }}
      >
		<img src={singleStadium.image}  />
		<h2 style={{textDecorationLine:'underline'}}>Reviews and Comments</h2>
<span>	
	{singleStadium.reviews.map((review, index) => {
                        return <Paper key={index} style={{ padding: "40px 20px", marginTop: 20}}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src="" />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>User ID: {review.userId}</h4>
            <p style={{ textAlign: "left" }}>
              {review.text}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
			  <Rating
          value={review.scenery_rating}
          name="rating"
          readOnly
        />	
            </p>
			 <Stack direction="row" spacing={1}>
			<Chip label="#Friendly" />
			<Chip label="#Good Food" />
			<Chip label="#Clean" />
			</Stack>
          </Grid>
        </Grid>
		</Paper>		
                    })} 
</span>
<h2 style={{textDecorationLine:'underline'}}>Leave a Review</h2>
<Paper style={{ padding: "40px 20px", marginTop: 20, borderRadius: 50}}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left", color: "blue" }}>If IsLoggedIn() show this comments and rating panel, else show Login to post reviews link </h4>
            <InputTags />
           <CommentsBox />
            <HoverRating />
            <CommentsButton />
          </Grid>
        </Grid>
		</Paper>		
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

{/* <div><Link to={`/`}>Return</Link></div>
                    <br />
                    <img src={singleStadium.image}/>
					<h1>{singleStadium.name}</h1>
					<p>{singleStadium.team}</p>
					<p>{singleStadium.location}</p>
					<p>{singleStadium.division}</p>
                    <div>
                        <h2>Reviews: </h2>
                    {singleStadium.reviews.map((review, index) => {
                        return <li key={index}>{review.text}</li>
                    })}
                    </div> */}