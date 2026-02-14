import React, { useState, useEffect, useRef } from 'react';
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
  Fab
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

// Import voice commands
import useVoiceCommands from './hooks/useVoiceCommands';

// Mobile-first theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#00897b',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 70,
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
      },
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
});

function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);
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

  const ActiveScreenComponent = screens[activeScreen].component;

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

  return (
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
            bgcolor: 'white',
            color: 'text.primary',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {screens[activeScreen].label}
              </Typography>
              {activeScreen === 0 && (
                <Typography variant="caption" color="text.secondary">
                  Good morning, {userData.name.split(' ')[0]}
                </Typography>
              )}
            </Box>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Box sx={{
          flex: 1,
          overflow: 'auto',
          bgcolor: 'background.default',
          position: 'relative'
        }}>
          <ActiveScreenComponent userData={userData} />
        </Box>

        {/* Voice Assistant FAB */}
        <Fab
          color="secondary"
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 16,
            zIndex: 1000,
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
      </Box>
    </ThemeProvider>
  );
}

export default App;
