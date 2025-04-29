import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar,
  Divider,
  AppBar,
  Toolbar
} from '@mui/material';
import { 
  School, 
  Business, 
  Chat, 
  Payment, 
  Security,
  CheckCircle,
  EmojiEvents,
  People,
  Speed
} from '@mui/icons-material';

// Mock team data
const teamMembers = [
  { name: 'Sai Siddeshwar', id: '23H51A0430', role: 'Frontend Developer' },
  { name: 'Sowmya', id: '22H51A0490', role: 'UI/UX Designer' },
  { name: 'Pranay', id: '23H51A0491', role: 'Backend Developer' },
  { name: 'Srikar', id: '23H51A04B5', role: 'Database Specialist' },
  { name: 'Asvitha', id: '23H51A04E3', role: 'Full Stack Developer' },
  { name: 'Sai Venkat', id: '23H51A04F1', role: 'DevOps Engineer' }
];

const Landing = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header/Navbar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: 'white' }}>
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Pay4Skills
            </Typography>
            <Box>
              <Button component={Link} to="/login" color="primary" sx={{ mr: 2 }}>
                Login
              </Button>
              <Button component={Link} to="/register" variant="contained" color="primary">
                Register
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          py: 10,
          backgroundImage: 'linear-gradient(135deg, #4A6FDC 0%, #6384E8 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Showcase Your Skills, Get Hired
              </Typography>
              <Typography variant="h5" paragraph>
                A dedicated marketplace for college students to earn by completing skill-based tasks
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  color="secondary"
                  sx={{ mr: 2, px: 4, py: 1.5, borderRadius: 2 }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{ px: 4, py: 1.5, borderRadius: 2, color: 'white', borderColor: 'white' }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/hero-image.svg"
                alt="Students working together"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  display: 'block',
                  mx: 'auto',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Simple steps to start earning through your skills
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, mb: 3 }}>
                <School sx={{ fontSize: 40 }} />
              </Avatar>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  1. Create Profile
                </Typography>
                <Typography variant="body1">
                  Sign up as a student, create your profile highlighting skills and qualifications. Upload your resume to showcase your talents.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 80, height: 80, mb: 3 }}>
                <Business sx={{ fontSize: 40 }} />
              </Avatar>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  2. Apply for Tasks
                </Typography>
                <Typography variant="body1">
                  Browse available tasks that match your skills, apply with a cover letter, and get selected by employers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, mb: 3 }}>
                <Payment sx={{ fontSize: 40 }} />
              </Avatar>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  3. Earn Money
                </Typography>
                <Typography variant="body1">
                  Complete tasks, submit deliverables, and get paid upon confirmation. Build your rating and earn badges.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Key Features */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Why Choose Pay4Skills
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            Our platform offers unique advantages for students
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.light', mx: 'auto', mb: 2 }}>
                  <Chat />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Real-time Collaboration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chat directly with employers and collaborate effectively
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'success.light', mx: 'auto', mb: 2 }}>
                  <Payment />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Secure Payments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transparent payment process with proof verification
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'warning.light', mx: 'auto', mb: 2 }}>
                  <EmojiEvents />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Achievement Badges
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Earn recognition and showcase your accomplishments
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'error.light', mx: 'auto', mb: 2 }}>
                  <Security />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Admin Moderation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Safe platform with active moderation and support
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Meet the Team */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Meet the Team
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          CMRCET - ECE 2027 Batch
        </Typography>

        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: 'auto', 
                        bgcolor: index % 2 === 0 ? 'primary.main' : 'secondary.main',
                        fontSize: 36
                      }}
                    >
                      {member.name.charAt(0)}
                    </Avatar>
                  </Box>
                  <Typography variant="h6" align="center">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                    {member.id}
                  </Typography>
                  <Typography variant="body1" align="center">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: 6, mt: 8 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Pay4Skills
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                A platform connecting students with employers through skill-based tasks
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Typography variant="body2" component="div">
                <Link to="/register" style={{ color: 'white', display: 'block', marginBottom: '8px' }}>Register</Link>
                <Link to="/login" style={{ color: 'white', display: 'block', marginBottom: '8px' }}>Login</Link>
                <Link to="/about" style={{ color: 'white', display: 'block', marginBottom: '8px' }}>About Us</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">
                CMR College of Engineering & Technology<br />
                Hyderabad, Telangana
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.2)' }} />
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Pay4Skills | Developed by CMRCET - ECE 2027 Batch
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing; 