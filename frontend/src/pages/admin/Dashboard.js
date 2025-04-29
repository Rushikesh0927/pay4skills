import React, { useState, useContext } from 'react';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

// Dummy components - In a complete implementation, these would be separate files
const AdminOverview = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
    <Typography paragraph>Welcome to the admin dashboard. You can manage all aspects of the platform from here.</Typography>
  </Box>
);

const UserManagement = () => (
  <Box>
    <Typography variant="h4" gutterBottom>User Management</Typography>
    <Typography paragraph>View and manage all users (students and employers) registered on the platform.</Typography>
  </Box>
);

const TaskManagement = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Task Management</Typography>
    <Typography paragraph>View and manage all tasks posted on the platform.</Typography>
  </Box>
);

const ReportManagement = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Reports & Disputes</Typography>
    <Typography paragraph>Handle reports and disputes submitted by users.</Typography>
  </Box>
);

const PaymentManagement = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Payment Management</Typography>
    <Typography paragraph>Review and manage payment transactions on the platform.</Typography>
  </Box>
);

const PlatformAnalytics = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Platform Analytics</Typography>
    <Typography paragraph>View platform-wide analytics and usage statistics.</Typography>
  </Box>
);

const Announcements = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Announcements</Typography>
    <Typography paragraph>Send announcements and notifications to users.</Typography>
  </Box>
);

// Main dashboard component
const Dashboard = () => {
  const { currentUser, isAuthenticated, userRole, logout } = useContext(AuthContext);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/')[2] || 'overview');

  // Protect this route for admin only
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const navItems = [
    { label: 'Overview', path: '/admin/overview', id: 'overview' },
    { label: 'User Management', path: '/admin/users', id: 'users' },
    { label: 'Task Management', path: '/admin/tasks', id: 'tasks' },
    { label: 'Reports & Disputes', path: '/admin/reports', id: 'reports' },
    { label: 'Payment Management', path: '/admin/payments', id: 'payments' },
    { label: 'Platform Analytics', path: '/admin/analytics', id: 'analytics' },
    { label: 'Announcements', path: '/admin/announcements', id: 'announcements' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: 2, boxShadow: 3 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
              Pay4Skills Admin
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
                  Admin Control Panel
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser?.email || 'admin@example.com'}
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
                <Route path="overview" element={<AdminOverview />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="tasks" element={<TaskManagement />} />
                <Route path="reports" element={<ReportManagement />} />
                <Route path="payments" element={<PaymentManagement />} />
                <Route path="analytics" element={<PlatformAnalytics />} />
                <Route path="announcements" element={<Announcements />} />
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