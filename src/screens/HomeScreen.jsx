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
  Tooltip,
  Paper,
  alpha,
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
  VolumeOff,
  AttachMoney,
  CheckCircle,
  AccessTime,
  Cake,
} from '@mui/icons-material';
import useSpeech from '../hooks/useSpeech';

// Color Palette
const colors = {
  orange: '#F6921E',
  yellow: '#E8DE23',
  lightGreen: '#8BC53F',
  green: '#37A526',
  lightBlue: '#00ADEE',
  blue: '#1B75BB',
  red: '#D02E2E',
  paleAqua: '#F2F7F6',
};

const HomeScreen = ({ userData }) => {
  const { speak, stop, isSpeaking, isEnabled, toggleEnabled, getRandomResponse } = useSpeech();

  const stats = {
    tasksToday: 12,
    tasksCompleted: 8,
    appointmentsToday: 3,
    leadsActive: 24,
    opportunitiesOpen: 15
  };

  const completionRate = Math.round((stats.tasksCompleted / stats.tasksToday) * 100);

  const aiInsights = [
    {
      type: 'priority',
      icon: <Stars />,
      iconColor: colors.red,
      bgGradient: `linear-gradient(135deg, ${alpha(colors.red, 0.1)} 0%, ${alpha(colors.red, 0.05)} 100%)`,
      title: 'High Priority',
      message: 'Follow up with John Smith - Policy renewal expires in 3 days',
      action: 'View Customer'
    },
    {
      type: 'opportunity',
      icon: <TrendingUp />,
      iconColor: colors.green,
      bgGradient: `linear-gradient(135deg, ${alpha(colors.green, 0.1)} 0%, ${alpha(colors.green, 0.05)} 100%)`,
      title: 'Personalized Recommendation',
      message: 'Sarah Johnson qualifies for life insurance upgrade based on recent life event',
      action: 'Create Opportunity'
    },
    {
      type: 'reminder',
      icon: <Cake />,
      iconColor: colors.orange,
      bgGradient: `linear-gradient(135deg, ${alpha(colors.orange, 0.1)} 0%, ${alpha(colors.orange, 0.05)} 100%)`,
      title: 'Special Occasion',
      message: 'Client birthday today: Michael Chen - Send wishes',
      action: 'Send Message'
    }
  ];

  const quickActions = [
    {
      icon: <Assignment />,
      label: 'New Task',
      color: colors.blue,
      bgColor: alpha(colors.blue, 0.1)
    },
    {
      icon: <Event />,
      label: 'Schedule',
      color: colors.green,
      bgColor: alpha(colors.green, 0.1)
    },
    {
      icon: <Phone />,
      label: 'Call Log',
      color: colors.orange,
      bgColor: alpha(colors.orange, 0.1)
    },
    {
      icon: <People />,
      label: 'Add Customer',
      color: colors.lightBlue,
      bgColor: alpha(colors.lightBlue, 0.1)
    }
  ];

  // Speak welcome message on load
  useEffect(() => {
    if (isEnabled) {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
      const firstName = userData.name.split(' ')[0];

      let motivation = '';
      if (completionRate >= 75) {
        motivation = "You're crushing it today! ";
      } else if (completionRate >= 50) {
        motivation = "You're making great progress! ";
      } else if (completionRate > 0) {
        motivation = "Keep up the good work! ";
      }

      const urgentTasks = 4;
      const urgentNote = urgentTasks > 0 ? ` Just a heads up, you have ${urgentTasks} urgent items that need your attention.` : '';
      const welcomeMessage = `${greeting} ${firstName}! ${motivation}You have ${stats.tasksToday} tasks on your plate today, and ${stats.appointmentsToday} appointments scheduled.${urgentNote} Let's make it a productive day!`;

      const timer = setTimeout(() => speak(welcomeMessage), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

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

  const speakDailySummary = () => {
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
    <Box sx={{ minHeight: '100vh', py: 3 }}>
      <Container maxWidth="lg">
        {/* Welcome Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Roboto Slab, serif',
              fontWeight: 700,
              color: colors.blue,
              mb: 0.5
            }}
          >
            Good morning, {userData.name.split(' ')[0]}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your work today
          </Typography>
        </Box>

        {/* Productivity Overview Card */}
        <Card
          elevation={0}
          sx={{
            mb: 4,
            background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.blue} 100%)`,
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: alpha('#FFFFFF', 0.1),
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -80,
              left: -80,
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: alpha('#FFFFFF', 0.08),
            }}
          />
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CheckCircle sx={{ fontSize: 32, mr: 1.5, color: 'white' }} />
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    Today's Progress
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                      {stats.tasksCompleted} of {stats.tasksToday} tasks completed
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                      {completionRate}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={completionRate}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: alpha('#FFFFFF', 0.25),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: colors.yellow,
                        borderRadius: 5,
                      }
                    }}
                  />
                </Box>

                <Typography variant="body2" sx={{ color: 'white', opacity: 0.85 }}>
                  Great progress! Keep up the momentum 🚀
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    textAlign: 'center',
                    bgcolor: alpha('#FFFFFF', 0.15),
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      color: 'white',
                      fontWeight: 800,
                      fontSize: { xs: '3rem', md: '4rem' },
                      lineHeight: 1,
                      mb: 1
                    }}
                  >
                    {stats.tasksToday}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                    Total Tasks Today
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(colors.blue, 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${alpha(colors.blue, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(colors.blue, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Assignment sx={{ color: colors.blue, fontSize: 24 }} />
                  </Box>
                  <Chip
                    label="4 urgent"
                    size="small"
                    sx={{
                      bgcolor: alpha(colors.red, 0.1),
                      color: colors.red,
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: colors.blue }}>
                  {stats.tasksToday}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tasks Due Today
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} md={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(colors.green, 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${alpha(colors.green, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(colors.green, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Event sx={{ color: colors.green, fontSize: 24 }} />
                  </Box>
                  <AccessTime sx={{ color: colors.orange, fontSize: 20 }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: colors.green }}>
                  {stats.appointmentsToday}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Appointments
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} md={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(colors.orange, 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${alpha(colors.orange, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(colors.orange, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <People sx={{ color: colors.orange, fontSize: 24 }} />
                  </Box>
                  <TrendingUp sx={{ color: colors.green, fontSize: 20 }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: colors.orange }}>
                  {stats.leadsActive}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Leads
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} md={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(colors.lightGreen, 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${alpha(colors.lightGreen, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(colors.lightGreen, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AttachMoney sx={{ color: colors.lightGreen, fontSize: 24 }} />
                  </Box>
                  <Stars sx={{ color: colors.yellow, fontSize: 20 }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: colors.lightGreen }}>
                  {stats.opportunitiesOpen}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Opportunities
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Proactive Insights */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Lightbulb sx={{ color: colors.orange, fontSize: 28, mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Proactive Insights
              </Typography>
              <Chip
                label="Agent-Driven"
                size="small"
                sx={{
                  ml: 1.5,
                  bgcolor: alpha(colors.orange, 0.1),
                  color: colors.orange,
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Read daily summary">
                <IconButton
                  size="small"
                  onClick={speakDailySummary}
                  sx={{
                    bgcolor: alpha(colors.lightBlue, 0.1),
                    '&:hover': { bgcolor: alpha(colors.lightBlue, 0.2) },
                  }}
                >
                  <VolumeUp sx={{ color: colors.lightBlue, fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={isEnabled ? "Voice enabled" : "Voice disabled"}>
                <IconButton
                  size="small"
                  onClick={toggleEnabled}
                  sx={{
                    bgcolor: alpha(isEnabled ? colors.green : colors.red, 0.1),
                    '&:hover': { bgcolor: alpha(isEnabled ? colors.green : colors.red, 0.2) },
                  }}
                >
                  {isEnabled ? (
                    <VolumeUp sx={{ color: colors.green, fontSize: 18 }} />
                  ) : (
                    <VolumeOff sx={{ color: colors.red, fontSize: 18 }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {aiInsights.map((insight, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                mb: 2,
                borderRadius: 3,
                border: `1px solid ${alpha(insight.iconColor, 0.2)}`,
                background: insight.bgGradient,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(8px)',
                  boxShadow: `0 4px 16px ${alpha(insight.iconColor, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: alpha(insight.iconColor, 0.15),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {React.cloneElement(insight.icon, { sx: { color: insight.iconColor, fontSize: 28 } })}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      {insight.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {insight.message}
                    </Typography>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: insight.iconColor,
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {insight.action}
                      <ArrowForward sx={{ fontSize: 16, ml: 0.5 }} />
                    </Box>
                  </Box>
                  <Tooltip title="Read aloud">
                    <IconButton
                      size="small"
                      onClick={() => speakInsight(insight)}
                      sx={{
                        bgcolor: alpha(insight.iconColor, 0.1),
                        '&:hover': { bgcolor: alpha(insight.iconColor, 0.2) },
                      }}
                    >
                      <VolumeUp sx={{ fontSize: 18, color: insight.iconColor }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Quick Actions */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${alpha(colors.lightBlue, 0.2)}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      textAlign: 'center',
                      cursor: 'pointer',
                      bgcolor: action.bgColor,
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      border: `1px solid transparent`,
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 24px ${alpha(action.color, 0.2)}`,
                        border: `1px solid ${alpha(action.color, 0.3)}`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: alpha(action.color, 0.15),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 1.5,
                      }}
                    >
                      {React.cloneElement(action.icon, { sx: { color: action.color, fontSize: 28 } })}
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      {action.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default HomeScreen;
