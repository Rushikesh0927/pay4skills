import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import { Home } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '8rem', fontWeight: 'bold', color: 'primary.main' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2, color: 'text.primary' }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: '600px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button 
          component={Link} 
          to="/"
          variant="contained"
          color="primary"
          startIcon={<Home />}
          size="large"
          sx={{ borderRadius: 2, px: 4, py: 1 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound; 