import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { LockOutlined, ArrowBack } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const user = await login(values.email, values.password);
      
      // Redirect based on user role
      if (user.role === 'student') {
        navigate('/student/dashboard');
      } else if (user.role === 'employer') {
        navigate('/employer/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Admin quick login
  const handleAdminLogin = () => {
    const adminCredentials = {
      email: 'cmr@cmrcet.ac.in',
      password: 'cmr@students'
    };
    handleSubmit(adminCredentials);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBack />}
          sx={{ alignSelf: 'flex-start', mb: 4 }}
        >
          Back to Home
        </Button>
        
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Box
              sx={{
                bgcolor: 'primary.main',
                borderRadius: '50%',
                p: 1,
                display: 'flex',
                mb: 2,
              }}
            >
              <LockOutlined sx={{ color: 'white' }} />
            </Box>
            <Typography component="h1" variant="h5" fontWeight="bold">
              Log in to Pay4Skills
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Enter your credentials to access your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="email"
                  label="Email Address"
                  fullWidth
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  autoComplete="email"
                  autoFocus
                />
                
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  autoComplete="current-password"
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Log In'}
                </Button>
              </Form>
            )}
          </Formik>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleAdminLogin}
            sx={{ mb: 2 }}
          >
            Admin Login
          </Button>

          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            <Grid item>
              <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Forgot password?
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 