import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Container,
} from '@mui/material';
import styles from './Login.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm'; // Import the SignUpForm component

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // State for controlling the SignUpForm visibility

  const handleLogin = async () => {
    try {
      // Make an HTTP POST request to your authentication endpoint
      const response = await axios.post('http://localhost:4000/user/login', {
        email,
        password,
      });

      // Assuming the server sends back a token upon successful login
      const { token } = response.data;

      // Set the token in the Redux store
      dispatch(setUserToken(token));
      navigate('/productivity');
      // Redirect the user to the dashboard or another page
      // You can use the useHistory hook or <Redirect> from react-router-dom
    } catch (err) {
      // Handle login error
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container className={styles.centerContainer}>
      <Paper elevation={3} className={styles.paper}>
        <Typography variant="h5" align="center" gutterBottom>
          Login Page
        </Typography>
        <form className={styles.form}>
          <TextField
            type="text"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className={styles.error}>{error}</div>}
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            className={styles.button}
            onClick={() => setIsSignUpOpen(true)} // Open the SignUpForm
          >
            Sign Up
          </Button>
        </form>
      </Paper>
      {isSignUpOpen && <SignUpForm onClose={() => setIsSignUpOpen(false)} />}
    </Container>
  );
};

export default LoginPage;
