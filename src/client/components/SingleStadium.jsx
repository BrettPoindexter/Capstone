


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
import { Paper, Avatar, Grid, Rating, Chip, Stack } from '@mui/material';
import HoverRating from './HoverRating';
import InputTags from './InputTags';
import CommentsBox from './CommentsBox';
import CommentsButton from './CommentsButton';

export default function SingleStadium() {
  const [singleStadium, setStadium] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getSingleStadium(stadiumId) { 
      try {
        const response = await fetch(`http://localhost:3000/api/stadiums/${stadiumId}`);
        const result = await response.json();
        setStadium(result.stadium);
      } catch (error) {
        console.error(error);
      }
    }
    getSingleStadium(id);
  }, [id]);

  const LPtheme = createTheme(getLPTheme('light'), {
    typography: {
      fontFamily: [
        'Roboto',
        'sans-serif',
      ].join(','),
    },
  });

  const defaultTheme = createTheme(getLPTheme('dark'), {
    typography: {
      fontFamily: [
        'Roboto',
        'sans-serif',
      ].join(','),
    },
  });

  const toggleColorMode = () => {
    // Functionality to toggle color mode
  };

  return (
    <>
      {singleStadium && (
        <div>
          <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <AppAppBar mode={'light'} toggleColorMode={toggleColorMode} />
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
                <img src={singleStadium.image} alt={singleStadium.name} style={{ width: '100%' }} />
                <h2 style={{ textDecorationLine: 'underline', fontFamily: 'Montserrat, sans-serif' }}>Reviews and Comments</h2>
                {singleStadium.reviews.map((review, index) => (
                  <Paper key={index} style={{ padding: "40px 20px", marginTop: 20 }}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar alt="Remy Sharp" src="" />
                      </Grid>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left", fontFamily: 'Montserrat, sans-serif' }}>User ID: {review.userId}</h4>
                        <p style={{ textAlign: "left", fontFamily: 'Roboto, sans-serif' }}>
                          {review.text}
                        </p>
                        <p style={{ textAlign: "left", color: "gray", fontFamily: 'Roboto, sans-serif' }}>
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
                ))}
                <h2 style={{ textDecorationLine: 'underline', fontFamily: 'Montserrat, sans-serif' }}>Leave a Review</h2>
                <Paper style={{ padding: "40px 20px", marginTop: 20, borderRadius: 50 }}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left", color: "blue", fontFamily: 'Montserrat, sans-serif' }}>If IsLoggedIn() show this comments and rating panel, else show Login to post reviews link </h4>
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