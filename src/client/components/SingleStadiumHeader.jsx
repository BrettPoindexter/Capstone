import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareIcon from '@mui/icons-material/Share';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { blue } from '@mui/material/colors';

export default function SingleStadiumHeader({ stadium }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(stadium.link)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
        <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 15 },
          pb: { xs: 8, sm: 1 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
      <Typography align="center" variant= 'h4' sx={{margin: "auto"}} color="blue" fontWeight="bold">  
        {stadium.name}
      </Typography>

      <Grid container justifyContent="center">
        <GroupsIcon fontSize="medium" color="disabled" sx={{marginRight: "5px"}}/>
        <Typography align="center" color="maroon" fontWeight="bold" sx={{marginRight: "15px"}}> 
          Team: {stadium.team}
        </Typography>
        <LocationOnIcon fontSize="medium" color="disabled" sx={{marginRight: "5px"}}/>
        <Typography align="center" color="purple" fontWeight="bold">
          Location: {stadium.location}
        </Typography>
      </Grid>
      
      <Grid container justifyContent="center" sx={{marginBottom: "10px"}}> 
        <IconButton sx={{ "&:hover": { color: 'indigo' } }}  target="_blank" href={'https://www.facebook.com/sharer.php?u='+stadium.link}>
          <FacebookIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ "&:hover": { color: 'lightBlue' } }}  target="_blank" href={'https://twitter.com/share?url='+stadium.link+'&text='+stadium.title+'&via=[via]&hashtags=[hashtags]'}>
          <TwitterIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ "&:hover": { color: 'blue' } }}  target="_blank" href={'https://www.linkedin.com/shareArticle?url='+stadium.link+'&title='+stadium.title}>
          <LinkedInIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ "&:hover": { color: 'red' } }} target="_blank" href={'https://reddit.com/submit?url='+stadium.link+'&title='+stadium.title}>
          <RedditIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ "&:hover": { color: 'black' } }}  onClick={handleClick}>
          <ShareIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ "&:hover": { color: 'teal' } }}  onClick={() => window.print()}>
          <PrintIcon fontSize="small" />
        </IconButton>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          The link to this blog has been saved to your clipboard.
        </Alert>
      </Snackbar>
      </Stack>
      </Container>
    </div>
  );
}