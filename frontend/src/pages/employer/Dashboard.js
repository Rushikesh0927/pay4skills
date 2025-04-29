import React, { useState, useContext } from 'react';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

// Dummy components - In a complete implementation, these would be separate files
const EmployerOverview = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Welcome to Employer Dashboard</Typography>
    <Typography paragraph>This is where you'll see a summary of your hiring activities and posts.</Typography>
  </Box>
);

const EmployerProfile = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Company Profile</Typography>
    <Typography paragraph>Manage your company profile and details.</Typography>
  </Box>
);

const PostTask = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Post New Task</Typography>
    <Typography paragraph>Create a new task for students to apply.</Typography>
  </Box>
);

const ManageTasks = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Manage Tasks</Typography>
    <Typography paragraph>View and manage your posted tasks.</Typography>
  </Box>
);

const Applications = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Applications</Typography>
    <Typography paragraph>Review student applications for your tasks.</Typography>
  </Box>
);

const ActiveTasks = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Active Tasks</Typography>
    <Typography paragraph>Manage in-progress tasks and communication with students.</Typography>
  </Box>
);

const Payments = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Payments</Typography>
    <Typography paragraph>Manage payments for completed tasks.</Typography>
  </Box>
);

// Main dashboard component
const Dashboard = () => {
  const { currentUser, isAuthenticated, userRole, logout } = useContext(AuthContext);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/')[2] || 'overview');

  // Protect this route for employers only
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'employer') {
    return <Navigate to="/" replace />;
  }
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const navItems = [
    { label: 'Overview', path: '/employer/overview', id: 'overview' },
    { label: 'Company Profile', path: '/employer/profile', id: 'profile' },
    { label: 'Post New Task', path: '/employer/post-task', id: 'post-task' },
    { label: 'Manage Tasks', path: '/employer/manage-tasks', id: 'manage-tasks' },
    { label: 'Applications', path: '/employer/applications', id: 'applications' },
    { label: 'Active Tasks', path: '/employer/active-tasks', id: 'active-tasks' },
    { label: 'Payments', path: '/employer/payments', id: 'payments' },
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
                  {currentUser?.username || 'Company Name'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser?.email || 'company@example.com'}
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
                <Route path="overview" element={<EmployerOverview />} />
                <Route path="profile" element={<EmployerProfile />} />
                <Route path="post-task" element={<PostTask />} />
                <Route path="manage-tasks" element={<ManageTasks />} />
                <Route path="applications" element={<Applications />} />
                <Route path="active-tasks" element={<ActiveTasks />} />
                <Route path="payments" element={<Payments />} />
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