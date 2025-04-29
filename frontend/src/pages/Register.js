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
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { PersonAddOutlined, ArrowBack, ArrowForward, Check } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Validation schemas
const accountDetailsSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  role: Yup.string()
    .oneOf(['student', 'employer'], 'Role must be selected')
    .required('Role is required')
});

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Account Details', 'Registration Complete'];

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Extract only the fields needed for registration
      const { username, email, password, role } = values;
      
      const user = await register({ username, email, password, role });
      
      // Move to success step
      setActiveStep(1);
      
      // Auto redirect after 3 seconds
      setTimeout(() => {
        // Redirect based on user role
        if (user.role === 'student') {
          navigate('/student/dashboard');
        } else if (user.role === 'employer') {
          navigate('/employer/dashboard');
        } else {
          navigate('/');
        }
      }, 3000);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      setActiveStep(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
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
              mb: 4,
            }}
          >
            <Box
              sx={{
                bgcolor: 'secondary.main',
                borderRadius: '50%',
                p: 1,
                display: 'flex',
                mb: 2,
              }}
            >
              <PersonAddOutlined sx={{ color: 'white' }} />
            </Box>
            <Typography component="h1" variant="h5" fontWeight="bold">
              Create Your Pay4Skills Account
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {activeStep === 0 ? (
            <Formik
              initialValues={{ 
                username: '', 
                email: '', 
                password: '', 
                confirmPassword: '',
                role: 'student' 
              }}
              validationSchema={accountDetailsSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    fullWidth
                    margin="normal"
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    autoFocus
                  />
                  
                  <Field
                    as={TextField}
                    name="email"
                    label="Email Address"
                    fullWidth
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
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
                  />
                  
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                  
                  <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
                    <FormLabel component="legend">I am registering as a:</FormLabel>
                    <Field
                      as={RadioGroup}
                      name="role"
                      row
                    >
                      <FormControlLabel 
                        value="student" 
                        control={<Radio />} 
                        label="Student" 
                      />
                      <FormControlLabel 
                        value="employer" 
                        control={<Radio />} 
                        label="Employer" 
                      />
                    </Field>
                  </FormControl>
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    disabled={isSubmitting}
                    endIcon={isSubmitting ? <CircularProgress size={24} /> : <ArrowForward />}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Register'}
                  </Button>
                  
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Typography variant="body2" color="primary">
                          Already have an account? Log in
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          ) : (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Box
                sx={{
                  bgcolor: 'success.main',
                  borderRadius: '50%',
                  width: 80,
                  height: 80,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <Check sx={{ color: 'white', fontSize: 40 }} />
              </Box>
              <Typography variant="h5" gutterBottom>
                Registration Successful!
              </Typography>
              <Typography variant="body1" paragraph>
                Your account has been created. You will be redirected to your dashboard shortly.
              </Typography>
              <CircularProgress size={30} sx={{ mt: 2 }} />
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 