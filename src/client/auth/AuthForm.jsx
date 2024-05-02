import { useState } from 'react';
import { useLoginMutation, useRegisterMutation, useGhLoginMutation } from './authSlice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

/**
 * AuthForm allows a user to either login or register for an account
 */
function AuthForm() {
  const nav = useNavigate();
    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();
    const [ghLogin] = useGhLoginMutation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLogin, setIsLogin] = useState(false);
    const authType = isLogin ? 'Login' : 'Register';
    const oppositeAuthCopy = isLogin
        ? "Don't have an account?"
        : "Already have an account?";
    const oppositeAuthType = isLogin ? "Register" : "Login";

    /**
     * Send credentials to server for authentication
     */
async function attemptAuth(e) {
    e.preventDefault();
    setError(null);

    const authMethod = isLogin ? login : register;
    const credentials = isLogin ? { email, password } : { name, email, password };

    try {
        setLoading(true);
        await authMethod(credentials).unwrap();
        setEmail('');
        setName('');
        setPassword('');
        nav('/');
    } catch (err) {
        setLoading(false);
        setError(err.data);
    }
};

const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://fullstackacademy.com/" target="_blank">
        2311-FSA-ET-WEB-PT-SF
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


    return (
        <main>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {authType}
          </Typography>
          {loading && <p>Logging in...</p>}
            {error && <p>{error}</p>}
          <Box component="form" onSubmit={attemptAuth} name={authType} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {!isLogin && (<TextField
                  autoComplete="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Username"
                  autoFocus
                  type='text'
                  name='name'
                  value={name}
                  onChange={(e) => {
                  setName(e.target.value);
                  }}

                />)}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             {authType}
            </Button>
            {isLogin && <Button onClick={(e) => {
                    e.preventDefault();
                    ghLogin();
                }}
                fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
                >Login via Github</Button>}
            <Grid container justifyContent="flex-end">
              <Grid item>
               
                   <p>
                {oppositeAuthCopy}{' '}
                <Link variant="body2"
                    onClick={() => {
                        setIsLogin(!isLogin);
                    }}
                >
                    {oppositeAuthType}
                </Link>
            </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>           
           
        </main>
    );
}

export default AuthForm;
