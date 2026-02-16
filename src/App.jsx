import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Fab,
  alpha,
  CircularProgress
} from '@mui/material';
import {
  Home as HomeIcon,
  Assignment as TasksIcon,
  People as CustomersIcon,
  CalendarMonth as CalendarIcon,
  MoreVert as MoreIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Mic as VoiceIcon
} from '@mui/icons-material';

// Import screens
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import CustomersScreen from './screens/CustomersScreen';
import CalendarScreen from './screens/CalendarScreen';
import MoreScreen from './screens/MoreScreen';
import DemoScreen from './screens/DemoScreen';

// Import voice commands
import useVoiceCommands from './hooks/useVoiceCommands';

// Import Context Providers
import { CustomerIntelligenceProvider } from './contexts/CustomerIntelligenceContext';
import { IllustrationProvider } from './contexts/IllustrationContext';
import { MeetingPrepProvider } from './contexts/MeetingPrepContext';
import { ComplianceProvider } from './contexts/ComplianceContext';
import { PredictiveAnalyticsProvider } from './contexts/PredictiveAnalyticsContext';

// Lazy load module screens
const IllustrationScreen = lazy(() => import('./screens/modules/IllustrationScreen'));
const LifeStageScreen = lazy(() => import('./screens/modules/LifeStageScreen'));
const MeetingPrepScreen = lazy(() => import('./screens/modules/MeetingPrepScreen'));
const AutomationScreen = lazy(() => import('./screens/modules/AutomationScreen'));
const PredictiveScreen = lazy(() => import('./screens/modules/PredictiveScreen'));
const EnterpriseScreen = lazy(() => import('./screens/modules/EnterpriseScreen'));

// Vibrant color palette
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

// Mobile-first theme with vibrant colors
const theme = createTheme({
  palette: {
    primary: {
      main: colors.lightBlue,
      dark: colors.blue,
    },
    secondary: {
      main: colors.green,
      light: colors.lightGreen,
    },
    success: {
      main: colors.green,
      light: colors.lightGreen,
    },
    warning: {
      main: colors.orange,
      light: colors.yellow,
    },
    error: {
      main: colors.red,
    },
    background: {
      default: colors.paleAqua,
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 70,
          paddingBottom: 'env(safe-area-inset-bottom)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F2F7F6 100%)',
          borderTop: `2px solid ${colors.lightBlue}`,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: colors.lightBlue,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(0, 173, 238, 0.15)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 173, 238, 0.25)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(0, 173, 238, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0, 173, 238, 0.4)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontFamily: 'Roboto Slab, serif',
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h5: {
      fontFamily: 'Roboto Slab, serif',
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontFamily: 'Roboto Slab, serif',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
});

function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showDemo, setShowDemo] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const homeScreenRef = useRef(null);
  const tasksScreenRef = useRef(null);
  const calendarScreenRef = useRef(null);

  // Mock data - will be replaced with ServiceNow API
  const [userData, setUserData] = useState({
    name: 'Sarah Anderson',
    role: 'Senior Insurance Advisor',
    avatar: null
  });

  const screens = [
    { label: 'Home', icon: HomeIcon, component: HomeScreen },
    { label: 'Tasks', icon: TasksIcon, component: TasksScreen },
    { label: 'Customers', icon: CustomersIcon, component: CustomersScreen },
    { label: 'Calendar', icon: CalendarIcon, component: CalendarScreen },
    { label: 'More', icon: MoreIcon, component: MoreScreen },
  ];

  const modules = {
    illustration: { component: IllustrationScreen, title: 'Income Planning' },
    lifestage: { component: LifeStageScreen, title: 'Life-Stage Intelligence' },
    meetingprep: { component: MeetingPrepScreen, title: 'Meeting Preparation' },
    automation: { component: AutomationScreen, title: 'Compliance & Automation' },
    predictive: { component: PredictiveScreen, title: 'Predictive Insights' },
    enterprise: { component: EnterpriseScreen, title: 'Enterprise Intelligence' },
  };

  const ActiveScreenComponent = screens[activeScreen].component;

  const handleNavigateToDemo = () => {
    setShowDemo(true);
    setActiveModule(null);
  };

  const handleBackFromDemo = () => {
    setShowDemo(false);
  };

  const handleNavigateToModule = (moduleId) => {
    setActiveModule(moduleId);
    setShowDemo(false);
  };

  const handleBackFromModule = () => {
    setActiveModule(null);
  };

  // Handle voice commands
  const handleCommand = (command) => {
    console.log('Received command:', command);

    switch (command.type) {
      case 'CREATE_TASK':
        setActiveScreen(1); // Navigate to Tasks screen
        // The task description is in command.data
        break;

      case 'SCHEDULE_APPOINTMENT':
        setActiveScreen(3); // Navigate to Calendar screen
        break;

      case 'VIEW_CUSTOMERS':
        setActiveScreen(2); // Navigate to Customers screen
        break;

      case 'READ_TASKS':
        setActiveScreen(1);
        // Could trigger reading tasks aloud
        break;

      case 'READ_APPOINTMENTS':
        setActiveScreen(3);
        // Could trigger reading appointments aloud
        break;

      case 'DAILY_SUMMARY':
        setActiveScreen(0);
        // Trigger daily summary on home screen
        if (homeScreenRef.current?.speakDailySummary) {
          setTimeout(() => homeScreenRef.current.speakDailySummary(), 500);
        }
        break;

      case 'NAVIGATE':
        setActiveScreen(command.screen);
        break;

      case 'OPEN_MODULE':
        handleNavigateToModule(command.module);
        break;

      default:
        console.log('Unknown command type:', command.type);
    }
  };

  const { isListening, startListening, speakAndListen } = useVoiceCommands(handleCommand);

  const handleVoiceAssist = () => {
    // Start conversational mode
    const greetings = [
      "Hi there! What can I help you with today?",
      "Hello! How can I assist you?",
      "Hey! What would you like to do?",
      "Hi! I'm here to help. What do you need?"
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    speakAndListen(greeting, 100);
  };

  // Get current screen title
  const getCurrentTitle = () => {
    if (showDemo) return 'Personalized Engagement';
    if (activeModule) return modules[activeModule]?.title || 'Module';
    return screens[activeScreen].label;
  };

  return (
    <CustomerIntelligenceProvider>
      <IllustrationProvider>
        <MeetingPrepProvider>
          <ComplianceProvider>
            <PredictiveAnalyticsProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100vh',
                  overflow: 'hidden',
                  paddingTop: 'env(safe-area-inset-top)',
                  paddingBottom: 'env(safe-area-inset-bottom)',
                }}>
                  {/* Top App Bar */}
                  <AppBar
                    position="static"
                    elevation={0}
                    sx={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F2F7F6 100%)',
                      color: 'text.primary',
                      borderBottom: `3px solid ${colors.lightBlue}`,
                    }}
                  >
                    <Toolbar>
                      {(showDemo || activeModule) && (
                        <IconButton onClick={showDemo ? handleBackFromDemo : handleBackFromModule} sx={{ mr: 1 }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </IconButton>
                      )}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {getCurrentTitle()}
                        </Typography>
                        {activeScreen === 0 && !showDemo && !activeModule && (
                          <Typography variant="caption" color="text.secondary">
                            Good morning, {userData.name.split(' ')[0]}
                          </Typography>
                        )}
                      </Box>
                      {!showDemo && !activeModule && (
                        <>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                          <IconButton>
                            <Badge badgeContent={notificationCount} color="error">
                              <NotificationsIcon />
                            </Badge>
                          </IconButton>
                        </>
                      )}
                    </Toolbar>
                  </AppBar>

                  {/* Main Content Area */}
                  <Box sx={{
                    flex: 1,
                    overflow: 'auto',
                    background: `linear-gradient(180deg, ${colors.paleAqua} 0%, ${alpha(colors.lightBlue, 0.1)} 100%)`,
                    position: 'relative'
                  }}>
                    {showDemo ? (
                      <DemoScreen />
                    ) : activeModule ? (
                      <Suspense fallback={
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                          <CircularProgress />
                        </Box>
                      }>
                        {React.createElement(modules[activeModule].component)}
                      </Suspense>
                    ) : (
                      <ActiveScreenComponent
                        userData={userData}
                        onNavigateToDemo={handleNavigateToDemo}
                        onNavigateToModule={handleNavigateToModule}
                      />
                    )}
                  </Box>

        {/* Voice Assistant FAB */}
        <Fab
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 16,
            zIndex: 1000,
            background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.blue} 100%)`,
            color: 'white',
            boxShadow: `0 4px 16px ${alpha(colors.lightBlue, 0.4)}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
              boxShadow: `0 6px 20px ${alpha(colors.lightBlue, 0.5)}`,
            },
            animation: isListening ? 'pulse 1.5s ease-in-out infinite' : 'none',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1)',
                boxShadow: '0 0 0 0 rgba(0, 137, 123, 0.7)'
              },
              '50%': {
                transform: 'scale(1.05)',
                boxShadow: '0 0 0 10px rgba(0, 137, 123, 0)'
              },
              '100%': {
                transform: 'scale(1)',
                boxShadow: '0 0 0 0 rgba(0, 137, 123, 0)'
              }
            }
          }}
          onClick={handleVoiceAssist}
        >
          <VoiceIcon />
        </Fab>

                  {/* Bottom Navigation */}
                  {!showDemo && !activeModule && (
                    <Paper
                      sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000
                      }}
                      elevation={3}
                    >
                      <BottomNavigation
                        value={activeScreen}
                        onChange={(event, newValue) => setActiveScreen(newValue)}
                        showLabels
                      >
                        {screens.map((screen, index) => (
                          <BottomNavigationAction
                            key={index}
                            label={screen.label}
                            icon={<screen.icon />}
                          />
                        ))}
                      </BottomNavigation>
                    </Paper>
                  )}
                </Box>
              </ThemeProvider>
            </PredictiveAnalyticsProvider>
          </ComplianceProvider>
        </MeetingPrepProvider>
      </IllustrationProvider>
    </CustomerIntelligenceProvider>
  );
}

export default App;
