import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/baseball-wallpaper.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
          transform: 'translateZ(0)',
          transition: 'background-image 0.3s ease-in-out',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor:
            theme.palette.mode === 'light'
              ? alpha('#FFF', 0.15)
              : alpha('#000', 0.15),
          zIndex: -1,
        },
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            Home Run Reviews&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              {/* Inner text if needed */}
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="black"
            backgroundColor="white"
            
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' },  borderRadius: 5, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}
          >
            How was your experience at these stadiums?<br/>
            Feel free to leave your thoughts.<br/>
            Be sure to sign in to let us know what you think.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
