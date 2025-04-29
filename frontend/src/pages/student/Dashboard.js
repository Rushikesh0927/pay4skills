import React, { useState, useContext } from 'react';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

// Dummy components - In a complete implementation, these would be separate files
const StudentOverview = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Welcome to your dashboard</Typography>
    <Typography paragraph>This is where you'll see a summary of your activities, earnings, and more.</Typography>
  </Box>
);

const StudentProfile = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Your Profile</Typography>
    <Typography paragraph>Manage your personal and professional details here.</Typography>
  </Box>
);

const BrowseTasks = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Browse Available Tasks</Typography>
    <Typography paragraph>Find tasks that match your skills and interests.</Typography>
  </Box>
);

const MyApplications = () => (
  <Box>
    <Typography variant="h4" gutterBottom>My Applications</Typography>
    <Typography paragraph>Track and manage your task applications.</Typography>
  </Box>
);

const MyTasks = () => (
  <Box>
    <Typography variant="h4" gutterBottom>My Tasks</Typography>
    <Typography paragraph>View and manage your current and completed tasks.</Typography>
  </Box>
);

const Earnings = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Earnings</Typography>
    <Typography paragraph>Track your earnings and payment history.</Typography>
  </Box>
);

const Badges = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Badges & Achievements</Typography>
    <Typography paragraph>View your badges and accomplishments.</Typography>
  </Box>
);

// Main dashboard component
const Dashboard = () => {
  const { currentUser, isAuthenticated, userRole, logout } = useContext(AuthContext);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/')[2] || 'overview');

  // Protect this route for students only
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'student') {
    return <Navigate to="/" replace />;
  }
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const navItems = [
    { label: 'Overview', path: '/student/overview', id: 'overview' },
    { label: 'Profile', path: '/student/profile', id: 'profile' },
    { label: 'Browse Tasks', path: '/student/browse', id: 'browse' },
    { label: 'My Applications', path: '/student/applications', id: 'applications' },
    { label: 'My Tasks', path: '/student/tasks', id: 'tasks' },
    { label: 'Earnings', path: '/student/earnings', id: 'earnings' },
    { label: 'Badges', path: '/student/badges', id: 'badges' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2, boxShadow: 3 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
              Pay4Skills
            </Typography>
            <Box>
              <Button 
                color="inherit" 
                onClick={logout}
                sx={{ ml: 2 }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main content */}
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {currentUser?.username || 'Student'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser?.email || 'student@example.com'}
                </Typography>
              </Box>
              
              <Box component="nav">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    component={Link}
                    to={item.path}
                    fullWidth
                    sx={{
                      justifyContent: 'flex-start',
                      mb: 1,
                      py: 1,
                      color: activeTab === item.id ? 'primary.main' : 'text.primary',
                      bgcolor: activeTab === item.id ? 'rgba(74, 111, 220, 0.1)' : 'transparent',
                      '&:hover': {
                        bgcolor: activeTab === item.id ? 'rgba(74, 111, 220, 0.2)' : 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                    onClick={() => handleTabChange(item.id)}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
          
          {/* Content area */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 3, minHeight: '70vh' }}>
              <Routes>
                <Route path="/" element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<StudentOverview />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="browse" element={<BrowseTasks />} />
                <Route path="applications" element={<MyApplications />} />
                <Route path="tasks" element={<MyTasks />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="badges" element={<Badges />} />
                <Route path="*" element={<Navigate to="overview" replace />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', py: 3, mt: 'auto' }}>
        <Container>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Pay4Skills | Developed by CMRCET - ECE 2027 Batch
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 