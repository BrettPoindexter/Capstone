import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import stadiumImg from '../assets/stadiumImg.png';
import fiveStars from '../assets/fiveStars.png';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';



export default function Stadiums() {
  const theme = useTheme();
  const [ stadiums, setStadiums ] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Runs the getStadiums function after the page loads
    getStadiums()

    // only runs once because of the [] second argument
  }, [])

  function getStadiums() {
  // Make an HTTP GET request to fetch stadiums data from the backend
fetch('/api/stadiums')
  .then(response => response.json())
  .then(data => {
    
   setStadiums(data.stadiums);
    console.log(data.stadiums);
  })
  .catch(error => {
    console.error('Error fetching stadiums:', error);
  });
  }

  
    const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchInput(searchTerm)

    // filter the items using the apiUsers state
  const filteredItems = stadiums.filter((stadium) => {
    if (searchTerm != "")
    return stadium.name.toLowerCase().includes(searchTerm.toLowerCase())
  }
    );
    setFilteredResults(filteredItems)

  }

  if (searchInput != "")
  {
return (
    <>
    <Container
      id="stadiums"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <TextField icon='search'
                placeholder='Search...'
                onChange={handleInputChange}
                fullWidth
                autoFocus
            />
      
      <Grid container spacing={2}>
        
        {
                
        filteredResults.map((stadium, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                 <img src={stadiumImg} width={320} height={150}/>
                 <img src={fiveStars} width={200} height={30}/>
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  title={stadium.name}               
                  subheader={stadium.location}
                  />
                <CardContent>
                <Typography variant="h6" color="text.secondary">             
                <span>{stadium.team}</span><br/>
                </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
  }
  else
  {
    return (
    <>
    <Container
      id="stadiums"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <TextField icon='search'
                placeholder='Search...'
                onChange={handleInputChange}
                fullWidth
                autoFocus
            />
      
      <Grid container spacing={2}>
        
        {
                
        stadiums.map((stadium, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                 <img src={stadium.image} width={320} height={150}/>
                 <img src={fiveStars} width={200} height={30}/>
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  title={stadium.name}               
                  subheader={stadium.location}
                  />
                <CardContent>
                <Typography variant="h6" color="text.secondary">             
                <span>{stadium.team}</span><br/>
                </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
  }
  
}