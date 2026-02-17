import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Paper,
  Chip,
  Button,
  Stack,
  Fade,
  IconButton,
  alpha,
  Slider,
  Grid,
  TextField,
  InputAdornment,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  CheckCircle,
  Warning,
  Lightbulb,
  Cake,
  ArrowForward,
  Close,
  ShowChart,
  Security,
  TuneOutlined,
  AttachMoneyOutlined,
  PercentOutlined,
  AccountBalanceOutlined,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from 'recharts';

const colors = {
  orange: '#F6921E',
  lightGreen: '#8BC53F',
  lightBlue: '#00ADEE',
  blue: '#1B75BB',
  paleAqua: '#F2F7F6',
};

const IllustrationWorkflowScreen = ({
  onClose,
  onNavigateToEngagement,
  clientData = {
    name: 'John Smith',
    age: 63,
    currentValue: 485000,
  },
  illustrationParams = {
    customerName: 'John Smith',
    age: 65,
    monthlyWithdrawal: 2000,
  }
}) => {
  // Use dynamic customer name from params, fallback to clientData
  const customerName = illustrationParams.customerName || clientData.name;
  const [currentStep, setCurrentStep] = useState(0);

  // Interactive parameters state
  const [params, setParams] = useState({
    monthlyPremium: 500,
    monthlyWithdrawal: illustrationParams.monthlyWithdrawal || 2000,
    growthRate: 6.0,
    inflationRate: 2.5,
    annualFees: 1.0,
    withdrawalStartAge: illustrationParams.age || 65,
    monthlyIncome: 8000,
    currentValue: clientData.currentValue || 485000,
  });

  const [showParameters, setShowParameters] = useState(true);

  // Reset to default parameters
  const resetParameters = () => {
    setParams({
      monthlyPremium: 500,
      monthlyWithdrawal: illustrationParams.monthlyWithdrawal || 2000,
      growthRate: 6.0,
      inflationRate: 2.5,
      annualFees: 1.0,
      withdrawalStartAge: illustrationParams.age || 65,
      monthlyIncome: 8000,
      currentValue: clientData.currentValue || 485000,
    });
  };

  // Progressive step reveal
  useEffect(() => {
    if (currentStep === 0) {
      const timer = setTimeout(() => setCurrentStep(1), 1000);
      return () => clearTimeout(timer);
    }
    if (currentStep > 0 && currentStep < 4) {
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Generate chart data with adjustable parameters
  const generateChartData = () => {
    const data = [];
    let value = params.currentValue;
    const annualWithdrawal = params.monthlyWithdrawal * 12;
    const annualPremium = params.monthlyPremium * 12;
    const netGrowthRate = (params.growthRate - params.annualFees) / 100;

    for (let age = clientData.age; age <= 95; age++) {
      const isWithdrawing = age >= params.withdrawalStartAge;

      data.push({
        age,
        value: Math.round(value),
        withdrawal: isWithdrawing ? annualWithdrawal : 0,
        premium: !isWithdrawing ? annualPremium : 0,
      });

      // Apply growth
      value = value * (1 + netGrowthRate);

      // Add premiums before withdrawal age
      if (!isWithdrawing) {
        value += annualPremium;
      }

      // Subtract withdrawals after withdrawal age
      if (isWithdrawing) {
        value -= annualWithdrawal;
      }

      if (value < 0) value = 0;
    }
    return data;
  };

  const chartData = generateChartData();
  const projectedAt85 = chartData.find(d => d.age === 85)?.value || 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.paleAqua, pb: 4 }}>
      {/* Simple Header */}
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
          color: '#fff',
          p: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Income Planning Illustration
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {customerName} • Age {illustrationParams.age} Withdrawals
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: '#fff' }}>
              <Close />
            </IconButton>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {/* Step 1: Illustration Chart */}
        <Fade in={currentStep >= 1} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShowChart sx={{ fontSize: 28, color: colors.blue, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  Policy Projection
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Projected account value with ${params.monthlyWithdrawal.toLocaleString()}/month withdrawals starting at age {params.withdrawalStartAge}
              </Typography>

              {/* Chart */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: 2 }}>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                      dataKey="age"
                      stroke="#666"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#666"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <ChartTooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Account Value']}
                      contentStyle={{ borderRadius: '8px', border: `1px solid ${colors.lightBlue}` }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={colors.blue}
                      fill={colors.lightBlue}
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>

              {/* Key Metrics */}
              <Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 150 }}>
                  <Typography variant="caption" color="text.secondary">Current Value</Typography>
                  <Typography variant="h6" fontWeight={700} color={colors.blue}>
                    ${params.currentValue.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: 150 }}>
                  <Typography variant="caption" color="text.secondary">Monthly Premium</Typography>
                  <Typography variant="h6" fontWeight={700} color={colors.lightGreen}>
                    ${params.monthlyPremium.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: 150 }}>
                  <Typography variant="caption" color="text.secondary">Monthly Withdrawal</Typography>
                  <Typography variant="h6" fontWeight={700} color={colors.orange}>
                    ${params.monthlyWithdrawal.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: 150 }}>
                  <Typography variant="caption" color="text.secondary">Projected at 85</Typography>
                  <Typography variant="h6" fontWeight={700} color={projectedAt85 > 0 ? colors.lightGreen : colors.orange}>
                    ${projectedAt85.toLocaleString()}
                  </Typography>
                </Box>
              </Stack>

              {/* Compact Parameter Adjusters - Directly Below Metrics */}
              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${alpha(colors.lightBlue, 0.2)}` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TuneOutlined sx={{ fontSize: 20, color: colors.lightBlue }} />
                    <Typography variant="subtitle2" fontWeight={700}>
                      Adjust Parameters
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      onClick={resetParameters}
                      sx={{ textTransform: 'none', minWidth: 'auto', px: 1, fontSize: '0.75rem' }}
                    >
                      Reset
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setShowParameters(!showParameters)}
                      sx={{ textTransform: 'none', minWidth: 'auto', px: 1, fontSize: '0.75rem' }}
                    >
                      {showParameters ? 'Hide' : 'Show'}
                    </Button>
                  </Stack>
                </Box>

                {showParameters && (
                  <Box>
                    <Grid container spacing={2}>
                      {/* Row 1 */}
                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.lightGreen, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Premium
                          </Typography>
                          <TextField
                            value={params.monthlyPremium}
                            onChange={(e) => setParams({ ...params, monthlyPremium: Number(e.target.value) || 0 })}
                            size="small"
                            type="number"
                            fullWidth
                            InputProps={{
                              startAdornment: <InputAdornment position="start" sx={{ fontSize: '0.75rem' }}>$</InputAdornment>,
                            }}
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.monthlyPremium}
                            onChange={(e, val) => setParams({ ...params, monthlyPremium: val })}
                            min={0}
                            max={2000}
                            step={50}
                            sx={{ color: colors.lightGreen, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.orange, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Withdrawal
                          </Typography>
                          <TextField
                            value={params.monthlyWithdrawal}
                            onChange={(e) => setParams({ ...params, monthlyWithdrawal: Number(e.target.value) || 0 })}
                            size="small"
                            type="number"
                            fullWidth
                            InputProps={{
                              startAdornment: <InputAdornment position="start" sx={{ fontSize: '0.75rem' }}>$</InputAdornment>,
                            }}
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.monthlyWithdrawal}
                            onChange={(e, val) => setParams({ ...params, monthlyWithdrawal: val })}
                            min={0}
                            max={5000}
                            step={100}
                            sx={{ color: colors.orange, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.blue, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Growth Rate
                          </Typography>
                          <TextField
                            value={params.growthRate}
                            onChange={(e) => setParams({ ...params, growthRate: Number(e.target.value) || 0 })}
                            size="small"
                            type="number"
                            fullWidth
                            InputProps={{
                              endAdornment: <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>%</InputAdornment>,
                            }}
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.growthRate}
                            onChange={(e, val) => setParams({ ...params, growthRate: val })}
                            min={0}
                            max={12}
                            step={0.5}
                            sx={{ color: colors.blue, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.orange, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Policy Fees
                          </Typography>
                          <TextField
                            value={params.annualFees}
                            onChange={(e) => setParams({ ...params, annualFees: Number(e.target.value) || 0 })}
                            size="small"
                            type="number"
                            fullWidth
                            InputProps={{
                              endAdornment: <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>%</InputAdornment>,
                            }}
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.annualFees}
                            onChange={(e, val) => setParams({ ...params, annualFees: val })}
                            min={0}
                            max={3}
                            step={0.1}
                            sx={{ color: colors.orange, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.lightBlue, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Start Age
                          </Typography>
                          <TextField
                            value={params.withdrawalStartAge}
                            onChange={(e) => setParams({ ...params, withdrawalStartAge: Number(e.target.value) || clientData.age })}
                            size="small"
                            type="number"
                            fullWidth
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.withdrawalStartAge}
                            onChange={(e, val) => setParams({ ...params, withdrawalStartAge: val })}
                            min={clientData.age}
                            max={75}
                            step={1}
                            sx={{ color: colors.lightBlue, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} md={2}>
                        <Box sx={{ bgcolor: alpha(colors.lightGreen, 0.05), p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Monthly Income
                          </Typography>
                          <TextField
                            value={params.monthlyIncome}
                            onChange={(e) => setParams({ ...params, monthlyIncome: Number(e.target.value) || 2000 })}
                            size="small"
                            type="number"
                            fullWidth
                            InputProps={{
                              startAdornment: <InputAdornment position="start" sx={{ fontSize: '0.75rem' }}>$</InputAdornment>,
                            }}
                            sx={{
                              '& .MuiInputBase-input': { fontSize: '0.875rem', py: 0.5 },
                              '& .MuiInputBase-root': { height: 32 }
                            }}
                          />
                          <Slider
                            value={params.monthlyIncome}
                            onChange={(e, val) => setParams({ ...params, monthlyIncome: val })}
                            min={2000}
                            max={20000}
                            step={500}
                            sx={{ color: colors.lightGreen, height: 4, mt: 1 }}
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Compact Impact Summary */}
                    <Box sx={{ mt: 2, p: 1.5, bgcolor: alpha(colors.lightBlue, 0.05), borderRadius: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Income Replacement</Typography>
                          <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
                            {((params.monthlyWithdrawal / params.monthlyIncome) * 100).toFixed(1)}%
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Net Growth</Typography>
                          <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
                            {(params.growthRate - params.annualFees).toFixed(1)}%
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Years to Withdrawal</Typography>
                          <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
                            {params.withdrawalStartAge - clientData.age} years
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 2: Intelligent Insights */}
        <Fade in={currentStep >= 2} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Lightbulb sx={{ fontSize: 28, color: colors.orange, mr: 1.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  Intelligent Analysis
                </Typography>
              </Box>

              <Stack spacing={2}>
                {/* Income Sustainability */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(projectedAt85 > 100000 ? colors.lightGreen : colors.orange, 0.1), borderLeft: `4px solid ${projectedAt85 > 100000 ? colors.lightGreen : colors.orange}` }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    {projectedAt85 > 100000 ? (
                      <CheckCircle sx={{ color: colors.lightGreen, fontSize: 20 }} />
                    ) : (
                      <Warning sx={{ color: colors.orange, fontSize: 20 }} />
                    )}
                    <Typography variant="subtitle2" fontWeight={700}>
                      {projectedAt85 > 100000 ? 'Income Sustainable' : 'Low Balance Warning'}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {projectedAt85 > 100000
                      ? `Current policy supports $${(params.monthlyWithdrawal * 12).toLocaleString()}/year in withdrawals through age 85+ with healthy account balance of $${projectedAt85.toLocaleString()}.`
                      : `With current parameters, account balance at age 85 is only $${projectedAt85.toLocaleString()}. Consider increasing premiums or reducing withdrawal amounts.`
                    }
                  </Typography>
                </Paper>

                {/* Net Cash Flow */}
                <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.blue, 0.1), borderLeft: `4px solid ${colors.blue}` }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <TrendingUp sx={{ color: colors.blue, fontSize: 20 }} />
                    <Typography variant="subtitle2" fontWeight={700}>
                      Premium vs. Withdrawal Analysis
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    You're contributing ${params.monthlyPremium.toLocaleString()}/month until age {params.withdrawalStartAge}, then withdrawing ${params.monthlyWithdrawal.toLocaleString()}/month. Net growth rate after fees: {(params.growthRate - params.annualFees).toFixed(1)}%
                  </Typography>
                </Paper>

                {/* Alternative Strategy */}
                {params.withdrawalStartAge < 67 && (
                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.lightBlue, 0.1), borderLeft: `4px solid ${colors.lightBlue}` }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Lightbulb sx={{ color: colors.lightBlue, fontSize: 20 }} />
                      <Typography variant="subtitle2" fontWeight={700}>
                        Optimization Opportunity
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Delaying withdrawals to age {params.withdrawalStartAge + 2} could increase your monthly income by approximately ${Math.round(params.monthlyWithdrawal * 0.15).toLocaleString()} while maintaining sustainability.
                    </Typography>
                  </Paper>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 3: Compliance Check */}
        <Fade in={currentStep >= 3} timeout={800}>
          <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ fontSize: 28, color: colors.lightGreen, mr: 1.5 }} />
                  <Typography variant="h6" fontWeight={700}>
                    Suitability Check
                  </Typography>
                </Box>
                <Chip
                  icon={<CheckCircle />}
                  label="Approved"
                  size="small"
                  sx={{ bgcolor: colors.lightGreen, color: '#fff', fontWeight: 600 }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Withdrawal strategy of ${params.monthlyWithdrawal.toLocaleString()}/month ({((params.monthlyWithdrawal / params.monthlyIncome) * 100).toFixed(0)}% income replacement) starting at age {params.withdrawalStartAge} aligns with client's stated retirement objectives and risk tolerance. Regulator-ready documentation prepared.
              </Typography>

              <Paper elevation={0} sx={{ p: 2, bgcolor: '#fff', border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: 'block', mb: 0.5 }}>
                  COMPLIANCE SUMMARY
                </Typography>
                <Typography variant="body2">
                  ✓ Income needs verified • ✓ Risk profile matched • ✓ Alternative strategies documented
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Fade>

        {/* Step 4: Life-Stage Milestone - Birthday Approaching */}
        <Fade in={currentStep >= 4} timeout={800}>
          <Card
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 3,
              border: `2px solid ${colors.orange}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 24px ${alpha(colors.orange, 0.2)}`,
              }
            }}
            onClick={() => {
              if (onNavigateToEngagement) {
                onNavigateToEngagement(customerName);
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Cake sx={{ fontSize: 28, color: colors.orange, mr: 1.5 }} />
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        Upcoming Milestone Detected
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {customerName} turns {params.withdrawalStartAge} in 2 weeks
                      </Typography>
                    </Box>
                  </Box>

                  <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(colors.orange, 0.1), borderRadius: 2, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Recommended Action:</strong> Send personalized birthday outreach with coverage adequacy review. This milestone is an ideal opportunity for proactive engagement and retention.
                    </Typography>
                  </Paper>

                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: colors.orange,
                      color: '#fff',
                      fontWeight: 700,
                      '&:hover': { bgcolor: alpha(colors.orange, 0.9) }
                    }}
                  >
                    Create Personalized Outreach
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default IllustrationWorkflowScreen;
