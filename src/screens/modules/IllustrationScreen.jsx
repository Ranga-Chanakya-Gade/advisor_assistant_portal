import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import DataCard from '../../components/shared/DataCard';
import InsightCard from '../../components/shared/InsightCard';
import UseCaseCard from '../../components/shared/UseCaseCard';
import { ShowChart, Assessment, Verified } from '@mui/icons-material';
import { useIllustration } from '../../contexts/IllustrationContext';

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

const IllustrationScreen = () => {
  const { loading } = useIllustration();

  return (
    <Container maxWidth="lg" sx={{ pb: 4, pt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Roboto Slab, serif',
          fontWeight: 700,
          mb: 1,
          background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Guided Income Planning & Illustrations
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Agent-assisted income projections, gap analysis, and regulatory compliance
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Active Illustrations"
            value="12"
            trend="up"
            trendValue="+3 this week"
            icon={ShowChart}
            color={colors.green}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Avg Sustainability Score"
            value="84%"
            trend="up"
            trendValue="+2%"
            icon={Assessment}
            color={colors.blue}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Compliance Rate"
            value="100%"
            icon={Verified}
            color={colors.lightGreen}
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
          Ask questions naturally - your agent surfaces the context you need
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Show me income gaps for the Johnson family"
              agentAction="Analyzes current coverage ($500K term life), projects retirement needs based on age 42 and salary $120K, calculates expense ratios, and identifies $28K annual income shortfall starting 2045. Flags spouse coverage as underfunded."
              outcome="Complete gap analysis in seconds, not hours"
              interactionType="voice"
              color={colors.green}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Create retirement illustration for client 1234"
              agentAction="Pulls existing policy data, generates 30-year income projections with 4% inflation adjustment, validates suitability against risk profile (conservative), auto-generates regulatory disclosures per state requirements, and flags 2 compliance items needing review."
              outcome="Compliant illustration ready for client review"
              interactionType="chat"
              color={colors.green}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="What if they retire 3 years early?"
              agentAction="Re-runs projections with retirement age 62 instead of 65, recalculates income needs (3 additional years without earned income), adjusts Social Security timing, identifies additional $45K coverage needed, and updates sustainability score from 84% to 71%."
              outcome="Instant scenario comparison with actionable recommendations"
              interactionType="voice"
              color={colors.green}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UseCaseCard
              userQuery="Which clients need illustration updates?"
              agentAction="Scans all client portfolios, identifies 5 with outdated illustrations (18+ months old), cross-references recent life events (2 promotions, 1 home purchase, 2 beneficiary changes), and prioritizes by policy anniversary proximity."
              outcome="Proactive outreach list with context for each conversation"
              interactionType="chat"
              color={colors.green}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Current Insights */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 2 }}
        >
          Recent Insights
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InsightCard
              type="opportunity"
              title="High-Quality Illustration Opportunities"
              description="5 clients have income gaps that could be addressed with enhanced products. Average gap: $18,000/year."
              actionLabel="View Details"
              metadata={{ Clients: 5, 'Avg Gap': '$18K' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default IllustrationScreen;
