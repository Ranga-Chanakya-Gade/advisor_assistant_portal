import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Alert,
  Tooltip
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  Event,
  People,
  Phone,
  Stars,
  ArrowForward,
  Lightbulb,
  VolumeUp,
  VolumeOff
} from '@mui/icons-material';
import useSpeech from '../hooks/useSpeech';

const HomeScreen = ({ userData }) => {
  const { speak, stop, isSpeaking, isEnabled, toggleEnabled, getRandomResponse } = useSpeech();
  // Mock data - will be replaced with ServiceNow API
  const stats = {
    tasksToday: 12,
    tasksCompleted: 8,
    appointmentsToday: 3,
    leadsActive: 24,
    opportunitiesOpen: 15
  };

  const aiInsights = [
    {
      type: 'priority',
      icon: <Stars />,
      title: 'High Priority',
      message: 'Follow up with John Smith - Policy renewal expires in 3 days',
      action: 'View Customer'
    },
    {
      type: 'opportunity',
      icon: <TrendingUp />,
      title: 'Smart Recommendation',
      message: 'Sarah Johnson qualifies for life insurance upgrade based on recent life event',
      action: 'Create Opportunity'
    },
    {
      type: 'reminder',
      icon: <Event />,
      title: 'Special Occasion',
      message: 'Client birthday today: Michael Chen - Send wishes',
      action: 'Send Message'
    }
  ];

  const quickActions = [
    { icon: <Assignment />, label: 'New Task', color: '#1976d2' },
    { icon: <Event />, label: 'Schedule', color: '#2e7d32' },
    { icon: <Phone />, label: 'Call Log', color: '#ed6c02' },
    { icon: <People />, label: 'Customer', color: '#9c27b0' }
  ];

  // Speak welcome message on load
  useEffect(() => {
    if (isEnabled) {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
      const firstName = userData.name.split(' ')[0];

      const completionRate = Math.round((stats.tasksCompleted / stats.tasksToday) * 100);
      let motivation = '';
      if (completionRate >= 75) {
        motivation = "You're crushing it today! ";
      } else if (completionRate >= 50) {
        motivation = "You're making great progress! ";
      } else if (completionRate > 0) {
        motivation = "Keep up the good work! ";
      }

      const urgentTasks = 4; // from mock data
      const urgentNote = urgentTasks > 0 ? ` Just a heads up, you have ${urgentTasks} urgent items that need your attention.` : '';

      const welcomeMessage = `${greeting} ${firstName}! ${motivation}You have ${stats.tasksToday} tasks on your plate today, and ${stats.appointmentsToday} appointments scheduled.${urgentNote} Let's make it a productive day!`;

      // Delay slightly to let page load
      const timer = setTimeout(() => speak(welcomeMessage), 1500);
      return () => clearTimeout(timer);
    }
  }, []); // Only run once on mount

  // Speak AI insight
  const speakInsight = (insight) => {
    const intros = [
      "Here's something important: ",
      "I wanted to let you know: ",
      "Quick heads up: ",
      "This needs your attention: ",
      "Don't forget: "
    ];
    const intro = getRandomResponse(intros);
    const message = `${intro}${insight.message}. ${insight.action}?`;
    speak(message);
  };

  // Speak daily summary
  const speakDailySummary = () => {
    const completionRate = Math.round((stats.tasksCompleted / stats.tasksToday) * 100);

    let performance = '';
    if (completionRate >= 80) {
      performance = "Wow! You're absolutely crushing it today. ";
    } else if (completionRate >= 60) {
      performance = "Great job! You're doing really well. ";
    } else if (completionRate >= 40) {
      performance = "You're making solid progress. ";
    } else {
      performance = "Let's focus on getting these tasks done. ";
    }

    const summary = `Alright, here's your daily overview. ${performance}You've completed ${stats.tasksCompleted} out of ${stats.tasksToday} tasks, that's ${completionRate} percent done. Looking at your calendar, you have ${stats.appointmentsToday} appointments scheduled for today. On the sales side, you're managing ${stats.leadsActive} active leads and ${stats.opportunitiesOpen} open opportunities, with a pipeline value of four hundred and fifty thousand dollars. You've got this!`;
    speak(summary);
  };

  return (
    <Container maxWidth="md" sx={{ pb: 10, pt: 2 }}>
      {/* Productivity Overview */}
      <Card sx={{ mb: 2, background: 'linear-gradient(135deg, #1976d2 0%, #00897b 100%)', color: 'white' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
              <TrendingUp />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                Today's Progress
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {stats.tasksCompleted} of {stats.tasksToday} tasks completed
              </Typography>
            </Box>
            <Typography variant="h3" fontWeight="bold">
              {Math.round((stats.tasksCompleted / stats.tasksToday) * 100)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(stats.tasksCompleted / stats.tasksToday) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.2)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'white'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Assignment color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Tasks
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.tasksToday}
              </Typography>
              <Chip label="4 urgent" size="small" color="error" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Event color="success" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Appointments
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.appointmentsToday}
              </Typography>
              <Chip label="Next: 2:30 PM" size="small" color="success" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <People color="info" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Active Leads
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.leadsActive}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                +3 this week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp color="warning" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Opportunities
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.opportunitiesOpen}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                $450K pipeline
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Insights Section */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Lightbulb sx={{ color: '#f59e0b', mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            AI Insights
          </Typography>
          <Chip label="Powered by AI" size="small" sx={{ ml: 1 }} />
          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <Tooltip title="Read daily summary">
              <IconButton size="small" onClick={speakDailySummary} color="primary">
                <VolumeUp />
              </IconButton>
            </Tooltip>
            <Tooltip title={isEnabled ? "Voice enabled" : "Voice disabled"}>
              <IconButton size="small" onClick={toggleEnabled} color={isEnabled ? "secondary" : "default"}>
                {isEnabled ? <VolumeUp /> : <VolumeOff />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {aiInsights.map((insight, index) => (
          <Card key={index} sx={{ mb: 1.5 }}>
            <CardContent sx={{ '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Avatar
                  sx={{
                    bgcolor: insight.type === 'priority' ? '#00897b' :
                            insight.type === 'opportunity' ? '#2e7d32' : '#1976d2',
                    width: 40,
                    height: 40,
                    mr: 2
                  }}
                >
                  {insight.icon}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    {insight.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {insight.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ display: 'flex', alignItems: 'center', mt: 1, cursor: 'pointer' }}
                  >
                    {insight.action}
                    <ArrowForward sx={{ fontSize: 14, ml: 0.5 }} />
                  </Typography>
                </Box>
                <Tooltip title="Read aloud">
                  <IconButton
                    size="small"
                    onClick={() => speakInsight(insight)}
                    color="secondary"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    <VolumeUp fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Quick Actions */}
      <Card>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid item xs={3} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:active': { transform: 'scale(0.95)' }
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: action.color,
                      width: 56,
                      height: 56,
                      mb: 1
                    }}
                  >
                    {action.icon}
                  </Avatar>
                  <Typography variant="caption" align="center">
                    {action.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomeScreen;
