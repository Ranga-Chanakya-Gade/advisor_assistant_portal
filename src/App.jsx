import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  PersonAdd as LeadsIcon,
  BusinessCenter as OpportunitiesIcon,
  Description as QuotesIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import LeadsTab from './components/LeadsTab';
import OpportunitiesTab from './components/OpportunitiesTab';
import QuotesTab from './components/QuotesTab';
import RecentTab from './components/RecentTab';
import serviceNowAPI from './services/serviceNowAPI';
import './App.css';
import dxcLogo from './assets/DXCHorizontalTaglineFullColorDark.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    leads: [],
    opportunities: [],
    quotes: [],
    recentItems: []
  });

  const [stats, setStats] = useState({
    leadsCount: 0,
    opportunitiesCount: 0,
    quotesCount: 0,
    recentCount: 0
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [leads, opportunities, quotes, recentItems] = await Promise.all([
        serviceNowAPI.getLeads(),
        serviceNowAPI.getOpportunities(),
        serviceNowAPI.getQuotes(),
        serviceNowAPI.getRecentItems()
      ]);

      setDashboardData({
        leads,
        opportunities,
        quotes,
        recentItems
      });

      setStats({
        leadsCount: leads.length,
        opportunitiesCount: opportunities.length,
        quotesCount: quotes.length,
        recentCount: recentItems.length
      });
    } catch (error) {
      console.error('Error loading data:', error);
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    const mockLeads = [
      {
        sys_id: '1',
        number: 'LEAD0001',
        first_name: 'John',
        last_name: 'Smith',
        company: 'ABC Insurance',
        email: 'john.smith@example.com',
        business_phone: '555-0101',
        lead_type: 'New Business',
        lead_rating: 'Hot',
        stage: 'Qualified'
      },
      {
        sys_id: '2',
        number: 'LEAD0002',
        first_name: 'Sarah',
        last_name: 'Johnson',
        company: 'XYZ Corp',
        email: 'sarah.j@example.com',
        business_phone: '555-0102',
        lead_type: 'Existing Business',
        lead_rating: 'Warm',
        stage: 'Contacted'
      }
    ];

    const mockOpportunities = [
      {
        sys_id: '1',
        number: 'OPP0001',
        consumer: 'Johnson Family',
        short_description: 'Life Insurance Policy',
        amount: '$50,000',
        industry: 'Insurance',
        rating: 'High',
        stage: 'Propose',
        sales_cycle_type: 'Standard'
      }
    ];

    const mockQuotes = [
      {
        sys_id: '1',
        number: 'QTE0001',
        description: 'Auto Insurance Quote',
        amount: '$1,200',
        status: 'Pending',
        valid_until: '2025-01-31'
      }
    ];

    setDashboardData({
      leads: mockLeads,
      opportunities: mockOpportunities,
      quotes: mockQuotes,
      recentItems: []
    });

    setStats({
      leadsCount: mockLeads.length,
      opportunitiesCount: mockOpportunities.length,
      quotesCount: mockQuotes.length,
      recentCount: 0
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Advisor Assistant
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
          {/* Dashboard Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LeadsIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Leads</Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.leadsCount}
                  </Typography>
                  <Chip label="Active" size="small" color="success" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <OpportunitiesIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Opportunities</Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.opportunitiesCount}
                  </Typography>
                  <Chip label="In Progress" size="small" color="warning" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <QuotesIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Quotes</Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.quotesCount}
                  </Typography>
                  <Chip label="Pending" size="small" color="info" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <HistoryIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Recent</Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.recentCount}
                  </Typography>
                  <Chip label="Updated" size="small" color="default" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label={`Leads (${stats.leadsCount})`} icon={<LeadsIcon />} iconPosition="start" />
              <Tab label={`Opportunities (${stats.opportunitiesCount})`} icon={<OpportunitiesIcon />} iconPosition="start" />
              <Tab label={`Quotes (${stats.quotesCount})`} icon={<QuotesIcon />} iconPosition="start" />
              <Tab label={`Recent (${stats.recentCount})`} icon={<HistoryIcon />} iconPosition="start" />
            </Tabs>
          </Box>

          {/* Tab Panels */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <>
              <TabPanel value={activeTab} index={0}>
                <LeadsTab leads={dashboardData.leads} onRefresh={loadAllData} />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <OpportunitiesTab opportunities={dashboardData.opportunities} onRefresh={loadAllData} />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <QuotesTab quotes={dashboardData.quotes} onRefresh={loadAllData} />
              </TabPanel>
              <TabPanel value={activeTab} index={3}>
                <RecentTab recentItems={dashboardData.recentItems} />
              </TabPanel>
            </>
          )}
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Powered by
          </Typography>
          <img
            src={dxcLogo}
            alt="DXC Technology"
            style={{ height: '40px', opacity: 0.8 }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
