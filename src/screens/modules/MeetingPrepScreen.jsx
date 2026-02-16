import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import DataCard from '../../components/shared/DataCard';
import InsightCard from '../../components/shared/InsightCard';
import UseCaseCard from '../../components/shared/UseCaseCard';
import { Event, CheckCircle, Description } from '@mui/icons-material';
import { useMeetingPrep } from '../../contexts/MeetingPrepContext';

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

const MeetingPrepScreen = () => {
  const { loading } = useMeetingPrep();

  return (
    <Container maxWidth="lg" sx={{ pb: 4, pt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Roboto Slab, serif',
          fontWeight: 700,
          mb: 1,
          background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.yellow} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Meeting Preparation Intelligence
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Pre-meeting data assembly, conversation guidance, and document preparation
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Upcoming Meetings"
            value="7"
            subtitle="Next 7 days"
            icon={Event}
            color={colors.orange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Prep Completed"
            value="5/7"
            trend="up"
            trendValue="71%"
            icon={CheckCircle}
            color={colors.green}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Documents Ready"
            value="12"
            icon={Description}
            color={colors.blue}
          />
        </Grid>
      </Grid>

      {/* Agent Use Cases */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 1 }}
        >
          How Your Agent Helps
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Walk into every meeting fully prepared - your agent gathers what matters
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Prepare for my 2pm meeting with Sarah"
              agentAction="Compiles client snapshot: 3 active policies ($800K total coverage), last contact 45 days ago, birthday next month (milestone alert), recent home purchase detected from address change. Surfaces conversation priorities: congratulate on new home, discuss increased asset protection, review beneficiary designations."
              outcome="Personalized meeting brief with context you'd otherwise miss"
              interactionType="voice"
              color={colors.orange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="What should I discuss with John Smith?"
              agentAction="Analyzes upcoming policy anniversary (term life expires in 6 months), flags conversion deadline approaching, identifies coverage gap vs. current mortgage ($350K policy, $425K mortgage), notes competitor quote activity in CRM, recommends leading with 'securing your family's home.'"
              outcome="Strategic conversation guide based on life stage and urgency"
              interactionType="chat"
              color={colors.orange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Compare our rates to competitors for tomorrow's meeting"
              agentAction="Pulls client profile (age 35, non-smoker, excellent health), retrieves current CompanyA quote ($42/month for $500K), fetches competitor rates: CompanyB ($45/month), CompanyC ($39/month), calculates lifetime savings positioning, and generates comparison talking points with value differentiators beyond price."
              outcome="Competitive intelligence ready for objection handling"
              interactionType="voice"
              color={colors.orange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Show me upgrade options for the Martinez family"
              agentAction="Reviews current whole life policy ($250K, $180/month premium), assesses family income growth (+$40K since purchase), checks eligibility for Whole Life Plus (qualified - health exam 2 years ago), calculates enhanced cash value benefits ($15K additional at age 65), identifies disability income gap (no coverage for $95K earner)."
              outcome="Tailored upgrade path with specific product recommendations"
              interactionType="chat"
              color={colors.orange}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Meeting Priorities */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 2 }}
        >
          Upcoming Priorities
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InsightCard
              type="priority"
              title="Tomorrow: John Smith Review"
              description="Policy anniversary approaching. Client expressed interest in increasing coverage. Key topics: retirement planning, beneficiary updates."
              priority="High"
              actionLabel="View Brief"
              metadata={{ Meeting: 'Tomorrow 2:00 PM', Duration: '60 min' }}
            />
          </Grid>
          <Grid item xs={12}>
            <InsightCard
              type="reminder"
              title="Documents Need Signatures"
              description="3 meetings this week require pre-signed beneficiary forms and disclosure statements."
              actionLabel="Prepare Documents"
              metadata={{ Meetings: 3, Forms: 7 }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MeetingPrepScreen;
