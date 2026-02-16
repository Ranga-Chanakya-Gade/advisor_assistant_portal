import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, LinearProgress, Divider, Chip, alpha } from '@mui/material';
import DataCard from '../../components/shared/DataCard';
import InsightCard from '../../components/shared/InsightCard';
import UseCaseCard from '../../components/shared/UseCaseCard';
import AgentInteraction from '../../components/shared/AgentInteraction';
import { ShowChart, Assessment, Verified, TrendingUp, Warning } from '@mui/icons-material';
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
  const [demoData, setDemoData] = useState(null);

  const handleAgentQuery = (query) => {
    const lowerQuery = query.toLowerCase();

    // Income gaps query
    if (lowerQuery.includes('gap') || lowerQuery.includes('johnson')) {
      return (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I've analyzed the Johnson family's coverage. Here's what I found:
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: alpha(colors.blue, 0.05), border: `1px solid ${alpha(colors.blue, 0.2)}` }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Current Coverage
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    $500,000
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    20-year term life • Age 42 • Salary $120K
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: alpha(colors.red, 0.05), border: `1px solid ${alpha(colors.red, 0.2)}` }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Projected Income Gap
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="error">
                    $28,000/year
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Starting 2045 (retirement at 65)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, p: 2, bgcolor: alpha(colors.yellow, 0.1), borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Warning sx={{ color: colors.orange, fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={600}>
                Key Findings
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Spouse coverage underfunded (currently $250K, recommended $400K+ for childcare replacement)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Retirement income needs exceed current coverage by 23%
            </Typography>
            <Typography variant="body2">
              • Policy expires before retirement - consider permanent coverage
            </Typography>
          </Box>
        </Box>
      );
    }

    // Retirement illustration query
    if (lowerQuery.includes('retirement') || lowerQuery.includes('illustration') || lowerQuery.includes('1234')) {
      return (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I've generated a comprehensive retirement illustration for client #1234:
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: alpha(colors.green, 0.05) }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">
                    30-Year Projection
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    $75,000/year
                  </Typography>
                  <Typography variant="caption">
                    With 4% inflation adjustment
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: alpha(colors.blue, 0.05) }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">
                    Risk Profile Match
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    Conservative
                  </Typography>
                  <Chip label="Suitable" size="small" color="success" sx={{ mt: 0.5 }} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: alpha(colors.orange, 0.05) }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">
                    Compliance Status
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    2 Items
                  </Typography>
                  <Typography variant="caption">
                    Need review
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ p: 2, bgcolor: alpha(colors.lightBlue, 0.05), borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              ✓ Auto-Generated Disclosures
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • State-specific regulatory disclosures (California)
              • Income projection disclaimers
              • Non-guaranteed rate notices
            </Typography>
          </Box>
        </Box>
      );
    }

    // Early retirement scenario
    if (lowerQuery.includes('early') || lowerQuery.includes('3 year')) {
      return (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I've re-run the projections with retirement at age 62 instead of 65:
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: alpha(colors.blue, 0.05) }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Original Scenario (Age 65)
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption">Sustainability Score</Typography>
                    <Typography variant="caption" fontWeight={600}>84%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={84} sx={{ height: 8, borderRadius: 4 }} />
                  <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                    Adequate coverage through retirement
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: alpha(colors.orange, 0.05), border: `2px solid ${colors.orange}` }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Early Retirement (Age 62)
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption">Sustainability Score</Typography>
                    <Typography variant="caption" fontWeight={600}>71%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={71} color="warning" sx={{ height: 8, borderRadius: 4 }} />
                  <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                    Additional $45K coverage recommended
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, p: 2, bgcolor: alpha(colors.green, 0.05), borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Impact Analysis
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              • 3 additional years without earned income ($360K total)
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              • Social Security timing adjustment (reduced early benefits)
            </Typography>
            <Typography variant="body2">
              • Coverage gap increases from $18K to $28K annually
            </Typography>
          </Box>
        </Box>
      );
    }

    // Clients needing updates
    if (lowerQuery.includes('need') || lowerQuery.includes('update') || lowerQuery.includes('outdated')) {
      return (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I've scanned your book of business and identified 5 clients with outdated illustrations:
          </Typography>

          {[
            { name: 'Sarah Mitchell', months: 22, event: 'Promotion to VP Sales', priority: 'High', anniversary: '45 days' },
            { name: 'David Chen', months: 19, event: 'Home purchase ($650K)', priority: 'High', anniversary: '120 days' },
            { name: 'Emily Rodriguez', months: 18, event: 'Beneficiary change', priority: 'Medium', anniversary: '180 days' },
          ].map((client, idx) => (
            <Card key={idx} sx={{ mb: 2, border: `2px solid ${idx < 2 ? colors.orange : alpha(colors.blue, 0.3)}` }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {client.name}
                  </Typography>
                  <Chip
                    label={client.priority}
                    size="small"
                    color={client.priority === 'High' ? 'error' : 'default'}
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary">
                      Last Illustration
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {client.months} months ago
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary">
                      Recent Life Event
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {client.event}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary">
                      Policy Anniversary
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {client.anniversary}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      );
    }

    // Default response
    return (
      <Typography>
        I can help you with income planning and illustration queries. Try asking about income gaps, creating illustrations, scenario planning, or finding clients who need updates.
      </Typography>
    );
  };

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

      {/* Interactive Agent Demo */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600, mb: 1 }}
        >
          Try It: Ask Your Agent
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Type or click a suggested query to see your agent in action
        </Typography>
        <AgentInteraction
          suggestedQueries={[
            "Show me income gaps for the Johnsons",
            "Create retirement illustration for client 1234",
            "What if they retire 3 years early?",
            "Which clients need illustration updates?"
          ]}
          onQuery={handleAgentQuery}
          placeholder="Ask about income planning, illustrations, or coverage gaps..."
        />
      </Box>

      <Divider sx={{ my: 4 }} />

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
