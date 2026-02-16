import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  Divider,
  Paper,
  alpha,
  useTheme,
  Fade,
  Stack,
} from '@mui/material';
import {
  Cake,
  Email,
  Phone,
  CheckCircle,
  Verified,
  TrendingUp,
  Psychology,
  Schedule,
  SendOutlined,
  TaskAlt,
  AttachMoney,
  AccessTime,
  Language,
  Security,
  Lightbulb,
  AutoAwesome,
  MailOutline,
  LocalPhone,
  CardGiftcard,
  ArrowForward,
  Stars,
} from '@mui/icons-material';

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

const DemoScreen = () => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
  };

  // Step 1: Customer Insight Trigger
  const Step1 = () => (
    <Fade in timeout={600}>
      <Card
        sx={{
          maxWidth: 800,
          mx: 'auto',
          background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(27, 117, 187, 0.3)',
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: alpha('#FFFFFF', 0.1),
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: alpha('#FFFFFF', 0.08),
          }}
        />

        <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                background: alpha('#FFFFFF', 0.2),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Cake sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.5, fontSize: '0.875rem' }}>
                Customer Milestone Alert
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9, display: 'block' }}>
                Proactive Engagement Opportunity
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: alpha('#FFFFFF', 0.2) }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: '2.5rem',
                fontFamily: 'Roboto Slab, serif',
                fontWeight: 700,
                background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.yellow} 100%)`,
                border: '4px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              SJ
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: 'Roboto Slab, serif',
                  fontWeight: 800,
                  mb: 0.5,
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                Upcoming Birthday
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, opacity: 0.95 }}>
                Sarah Johnson turns <Box component="span" sx={{ fontWeight: 700, fontSize: '1.5em' }}>65</Box> tomorrow
              </Typography>

              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Chip
                  icon={<AttachMoney sx={{ color: 'white !important' }} />}
                  label="$185K Policy Value"
                  sx={{
                    bgcolor: colors.green,
                    color: 'white',
                    fontWeight: 600,
                    px: 1,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
                <Chip
                  icon={<Schedule sx={{ color: 'white !important' }} />}
                  label="8 Years Customer"
                  sx={{
                    bgcolor: colors.lightGreen,
                    color: 'white',
                    fontWeight: 600,
                    px: 1,
                  }}
                />
                <Chip
                  icon={<Stars sx={{ color: 'white !important' }} />}
                  label="High Engagement"
                  sx={{
                    bgcolor: colors.orange,
                    color: 'white',
                    fontWeight: 600,
                    px: 1,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );

  // Step 2: Communication Preferences
  const Step2 = () => (
    <Fade in timeout={600}>
      <Card
        sx={{
          maxWidth: 800,
          mx: 'auto',
          background: colors.paleAqua,
          boxShadow: '0 8px 32px rgba(0, 173, 238, 0.15)',
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.blue} 100%)`,
            p: 3,
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                bgcolor: alpha('#FFFFFF', 0.2),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Email sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700 }}>
                Communication Preferences
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Retrieved from customer profile & consent management
              </Typography>
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            {/* Preferred Channels */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.green, 0.1)} 0%, ${alpha(colors.lightGreen, 0.1)} 100%)`,
                border: `2px solid ${colors.lightGreen}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ color: colors.green, mr: 1.5, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Preferred Channels
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, ml: 5 }}>
                <Chip
                  icon={<Email />}
                  label="Email"
                  sx={{
                    bgcolor: colors.green,
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
                <Chip
                  icon={<Phone />}
                  label="Phone"
                  sx={{
                    bgcolor: colors.lightGreen,
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
              </Box>
            </Paper>

            {/* Avoid */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: alpha(colors.red, 0.08),
                border: `2px solid ${alpha(colors.red, 0.3)}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: colors.red,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5,
                  }}
                >
                  <Box sx={{ width: 12, height: 2, bgcolor: 'white' }} />
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Do Not Contact Via
                </Typography>
              </Box>
              <Box sx={{ ml: 5 }}>
                <Chip
                  label="SMS Marketing"
                  sx={{
                    bgcolor: alpha(colors.red, 0.2),
                    color: colors.red,
                    fontWeight: 600,
                    border: `1px solid ${colors.red}`,
                  }}
                />
              </Box>
            </Paper>

            {/* Details */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 3,
                  background: alpha(colors.orange, 0.1),
                  border: `2px solid ${alpha(colors.orange, 0.3)}`,
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <AccessTime sx={{ color: colors.orange, mr: 1.5, fontSize: 24 }} />
                  <Typography variant="subtitle2" fontWeight={700} color={colors.orange}>
                    Best Contact Time
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ ml: 5 }}>
                  Morning (8-11 AM)
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 3,
                  background: alpha(colors.blue, 0.1),
                  border: `2px solid ${alpha(colors.blue, 0.3)}`,
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Language sx={{ color: colors.blue, mr: 1.5, fontSize: 24 }} />
                  <Typography variant="subtitle2" fontWeight={700} color={colors.blue}>
                    Language
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ ml: 5 }}>
                  English
                </Typography>
              </Paper>
            </Box>

            {/* Compliance */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.green, 0.15)} 0%, ${alpha(colors.lightGreen, 0.15)} 100%)`,
                border: `2px solid ${colors.green}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Security sx={{ color: colors.green, mr: 2, fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} color={colors.green}>
                    ✓ Compliance Verified
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    All consents active • TCPA compliant • Privacy preferences honored
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Stack>
        </CardContent>
      </Card>
    </Fade>
  );

  // Step 3: Age-Based Engagement Patterns
  const Step3 = () => (
    <Fade in timeout={600}>
      <Card
        sx={{
          maxWidth: 800,
          mx: 'auto',
          background: colors.paleAqua,
          boxShadow: '0 8px 32px rgba(246, 146, 30, 0.2)',
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.yellow} 100%)`,
            p: 3,
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  bgcolor: alpha('#FFFFFF', 0.25),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <Psychology sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700 }}>
                  Age-Based Engagement Insights
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  Agent-driven behavioral analysis
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={<AutoAwesome sx={{ color: 'white !important' }} />}
              label="Proactive Insight"
              sx={{
                bgcolor: alpha('#FFFFFF', 0.25),
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.blue, 0.1)} 0%, ${alpha(colors.lightBlue, 0.1)} 100%)`,
                border: `3px solid ${colors.lightBlue}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.blue}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                <Lightbulb sx={{ color: colors.blue, mr: 2, fontSize: 28, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} color={colors.blue} gutterBottom>
                    Customers 60+ prefer personalized & human tone
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Avoid generic automated messaging. Personal touch increases response by{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: colors.green }}>47%</Box>.
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.lightGreen, 0.15)} 0%, ${alpha(colors.green, 0.15)} 100%)`,
                border: `3px solid ${colors.lightGreen}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.green}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                <TrendingUp sx={{ color: colors.green, mr: 2, fontSize: 28, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} color={colors.green} gutterBottom>
                    Higher engagement with advisor-led communication
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    This demographic responds{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: colors.orange }}>3x better</Box>{' '}
                    to direct advisor contact vs. automated emails.
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.orange, 0.15)} 0%, ${alpha(colors.yellow, 0.15)} 100%)`,
                border: `3px solid ${colors.orange}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.orange}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                <CardGiftcard sx={{ color: colors.orange, mr: 2, fontSize: 28, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700} color={colors.orange} gutterBottom>
                    Physical mail increases trust for milestone events
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Printed cards for birthdays show{' '}
                    <Box component="span" sx={{ fontWeight: 700, color: colors.blue }}>62% higher</Box>{' '}
                    brand sentiment among seniors.
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Confidence Score */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
                color: 'white',
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Verified sx={{ mr: 1.5, fontSize: 32 }} />
                  <Typography variant="h6" fontWeight={700}>
                    Confidence Score
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 150 }}>
                    <LinearProgress
                      variant="determinate"
                      value={92}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        bgcolor: alpha('#FFFFFF', 0.3),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'white',
                          borderRadius: 6,
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="h4" fontWeight={800}>
                    92%
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Stack>
        </CardContent>
      </Card>
    </Fade>
  );

  // Step 4: Outreach Strategy Decision
  const Step4 = () => (
    <Fade in timeout={600}>
      <Card
        sx={{
          maxWidth: 800,
          mx: 'auto',
          background: colors.paleAqua,
          boxShadow: '0 8px 32px rgba(27, 117, 187, 0.2)',
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
            p: 3,
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                bgcolor: alpha('#FFFFFF', 0.25),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <AutoAwesome sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700 }}>
                Personalized Outreach Strategy
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.95 }}>
                Agent-recommended multi-channel approach
              </Typography>
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(colors.lightGreen, 0.2)} 0%, ${alpha(colors.green, 0.2)} 100%)`,
              border: `3px solid ${colors.lightGreen}`,
            }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
              Based on preferences and engagement data:
            </Typography>
            <Typography variant="h5" color={colors.green} fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
              Multi-Touch Personalized Engagement Strategy
            </Typography>
          </Paper>

          <Stack spacing={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.blue, 0.1)} 0%, ${alpha(colors.lightBlue, 0.05)} 100%)`,
                border: `3px solid ${colors.blue}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.blue}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, fontSize: 32 }} />
                <MailOutline sx={{ color: colors.blue, mr: 1.5, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Email with personalized message
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ ml: 8, fontWeight: 500 }}>
                Send warm, advisor-signed birthday message via preferred email channel
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.lightGreen, 0.15)} 0%, ${alpha(colors.green, 0.05)} 100%)`,
                border: `3px solid ${colors.lightGreen}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.green}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, fontSize: 32 }} />
                <LocalPhone sx={{ color: colors.lightGreen, mr: 1.5, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Advisor phone follow-up recommended
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ ml: 8, fontWeight: 500 }}>
                Schedule personal call 2 days after birthday during preferred morning hours
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.orange, 0.15)} 0%, ${alpha(colors.yellow, 0.1)} 100%)`,
                border: `3px solid ${colors.orange}`,
                borderRadius: 3,
                borderLeft: `8px solid ${colors.orange}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, fontSize: 32 }} />
                <CardGiftcard sx={{ color: colors.orange, mr: 1.5, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                  Send printed milestone card
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ ml: 8, fontWeight: 500 }}>
                Premium 65th birthday card to arrive within 3-5 business days
              </Typography>
            </Paper>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Security sx={{ fontSize: 32, mr: 2 }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  ✓ Compliance Approved
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  All channels verified against consent preferences and regulatory requirements
                </Typography>
              </Box>
            </Box>
          </Paper>
        </CardContent>
      </Card>
    </Fade>
  );

  // Step 5: Generated Message
  const Step5 = () => (
    <Fade in timeout={600}>
      <Card
        sx={{
          maxWidth: 800,
          mx: 'auto',
          background: colors.paleAqua,
          boxShadow: '0 8px 32px rgba(139, 197, 63, 0.2)',
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${colors.lightGreen} 0%, ${colors.green} 100%)`,
            p: 3,
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  bgcolor: alpha('#FFFFFF', 0.25),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <SendOutlined sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700 }}>
                  Personalized Message
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  Agent-generated, compliance-approved
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={<Verified sx={{ color: 'white !important' }} />}
              label="Approved"
              sx={{
                bgcolor: alpha('#FFFFFF', 0.25),
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: 'white',
              border: `3px solid ${colors.lightBlue}`,
              borderRadius: 3,
              mb: 3,
              boxShadow: '0 4px 16px rgba(0, 173, 238, 0.1)',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Roboto, sans-serif',
                lineHeight: 1.9,
                fontSize: '1.1rem',
                whiteSpace: 'pre-line',
                color: 'text.primary',
              }}
            >
              {`Dear Sarah,

Wishing you a wonderful 65th birthday! It has been our privilege to support you over the years. If there is anything you need as you celebrate this milestone, I'm here to help.

Warm regards,
Michael
Senior Advisor`}
            </Typography>
          </Paper>

          <Stack spacing={2}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: alpha(colors.blue, 0.08),
                border: `2px solid ${alpha(colors.blue, 0.3)}`,
                borderRadius: 3,
                borderLeft: `6px solid ${colors.blue}`,
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                <Box component="span" sx={{ color: colors.blue, fontWeight: 700 }}>Personalization:</Box>{' '}
                Uses customer first name, milestone age, and relationship duration
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: alpha(colors.lightGreen, 0.08),
                border: `2px solid ${alpha(colors.lightGreen, 0.3)}`,
                borderRadius: 3,
                borderLeft: `6px solid ${colors.lightGreen}`,
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                <Box component="span" sx={{ color: colors.lightGreen, fontWeight: 700 }}>Tone:</Box>{' '}
                Warm, professional, and human (not promotional)
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: alpha(colors.green, 0.08),
                border: `2px solid ${alpha(colors.green, 0.3)}`,
                borderRadius: 3,
                borderLeft: `6px solid ${colors.green}`,
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                <Box component="span" sx={{ color: colors.green, fontWeight: 700 }}>Compliance:</Box>{' '}
                No sales language, TCPA compliant, consent verified
              </Typography>
            </Paper>
          </Stack>
        </CardContent>
      </Card>
    </Fade>
  );

  // Step 6: Follow-up Automation
  const Step6 = () => (
    <Fade in timeout={600}>
      <Card
        sx={{
          maxWidth: 800,
          mx: 'auto',
          background: colors.paleAqua,
          boxShadow: '0 8px 32px rgba(55, 165, 38, 0.2)',
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
            p: 3,
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  bgcolor: alpha('#FFFFFF', 0.25),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <TaskAlt sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700 }}>
                  Automated Follow-Up
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  Automated task scheduling complete
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={<AutoAwesome sx={{ color: 'white !important' }} />}
              label="Automated"
              sx={{
                bgcolor: alpha('#FFFFFF', 0.25),
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3} sx={{ mb: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.blue, 0.1)} 0%, ${alpha(colors.lightBlue, 0.05)} 100%)`,
                border: `3px solid ${colors.blue}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, mt: 0.5, fontSize: 32 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: 'Roboto Slab, serif' }}>
                    Advisor Call Scheduled
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom fontWeight={500}>
                    Personal follow-up call with Sarah Johnson
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                    <Chip
                      icon={<Schedule sx={{ color: 'white !important' }} />}
                      label="Feb 18, 2026 @ 9:30 AM"
                      sx={{ bgcolor: colors.lightBlue, color: 'white', fontWeight: 600 }}
                    />
                    <Chip
                      label="Michael (Advisor)"
                      sx={{ bgcolor: colors.blue, color: 'white', fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.orange, 0.15)} 0%, ${alpha(colors.yellow, 0.1)} 100%)`,
                border: `3px solid ${colors.orange}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, mt: 0.5, fontSize: 32 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: 'Roboto Slab, serif' }}>
                    Printed Card Request Sent
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom fontWeight={500}>
                    Premium 65th birthday milestone card
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                    <Chip
                      icon={<CardGiftcard sx={{ color: 'white !important' }} />}
                      label="Delivery: 3-5 days"
                      sx={{ bgcolor: colors.orange, color: 'white', fontWeight: 600 }}
                    />
                    <Chip
                      label="Address verified"
                      sx={{ bgcolor: colors.yellow, color: '#333', fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${alpha(colors.lightGreen, 0.15)} 0%, ${alpha(colors.green, 0.1)} 100%)`,
                border: `3px solid ${colors.lightGreen}`,
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <CheckCircle sx={{ color: colors.green, mr: 2, mt: 0.5, fontSize: 32 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: 'Roboto Slab, serif' }}>
                    Policy Review Reminder Set
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom fontWeight={500}>
                    Opportune time to discuss coverage options
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                    <Chip
                      icon={<Schedule sx={{ color: 'white !important' }} />}
                      label="During follow-up call"
                      sx={{ bgcolor: colors.lightGreen, color: 'white', fontWeight: 600 }}
                    />
                    <Chip
                      label="Milestone opportunity"
                      sx={{ bgcolor: colors.green, color: 'white', fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUp sx={{ mr: 2, fontSize: 36 }} />
              <Typography variant="h5" fontWeight={700} sx={{ fontFamily: 'Roboto Slab, serif' }}>
                Expected Impact
              </Typography>
            </Box>
            <Stack spacing={2}>
              {[
                '47% higher engagement through personalized touch',
                '3x better response with advisor-led follow-up',
                '62% improvement in brand sentiment with physical card',
              ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: colors.yellow,
                      mr: 2,
                    }}
                  />
                  <Typography variant="body1" fontWeight={500}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </CardContent>
      </Card>
    </Fade>
  );

  const steps = [
    { component: <Step1 />, title: 'Customer Milestone' },
    { component: <Step2 />, title: 'Communication Preferences' },
    { component: <Step3 />, title: 'Engagement Insights' },
    { component: <Step4 />, title: 'Strategy Decision' },
    { component: <Step5 />, title: 'Personalized Message' },
    { component: <Step6 />, title: 'Follow-Up Automation' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${alpha(colors.lightBlue, 0.15)} 0%, ${alpha(colors.paleAqua, 0.5)} 50%, ${alpha(colors.lightBlue, 0.15)} 100%)`,
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        {/* Feature Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontFamily: 'Roboto Slab, serif',
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            Personalized Customer Engagement
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom fontWeight={600}>
            Proactive Birthday Outreach
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontSize: '1.1rem' }}>
            Your personal agent surfaces relevant context and creates personalized engagement
            strategies based on what matters most to each customer
          </Typography>
        </Box>

        {/* Progress Indicator */}
        <Box sx={{ mb: 5, maxWidth: 900, mx: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            {steps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                }}
              >
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      left: '50%',
                      width: '100%',
                      height: 4,
                      bgcolor: index < currentStep ? colors.green : alpha(colors.lightBlue, 0.3),
                      transition: 'all 0.3s ease',
                      borderRadius: 2,
                    }}
                  />
                )}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background:
                      index <= currentStep
                        ? `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`
                        : alpha(colors.lightBlue, 0.2),
                    color: index <= currentStep ? 'white' : 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    mb: 1,
                    position: 'relative',
                    zIndex: 1,
                    border: `3px solid ${index <= currentStep ? colors.green : alpha(colors.lightBlue, 0.3)}`,
                    boxShadow: index <= currentStep ? `0 4px 12px ${alpha(colors.green, 0.4)}` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {index < currentStep ? <CheckCircle sx={{ fontSize: 24 }} /> : index + 1}
                </Box>
                <Typography
                  variant="caption"
                  color={index <= currentStep ? 'text.primary' : 'text.secondary'}
                  fontWeight={index === currentStep ? 700 : 500}
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    textAlign: 'center',
                    fontSize: '0.75rem',
                  }}
                >
                  {step.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Current Step Content */}
        <Box sx={{ minHeight: 500, mb: 4 }}>{steps[currentStep].component}</Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          {currentStep > 0 && (
            <Button
              variant="outlined"
              size="large"
              onClick={handlePrevious}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderColor: colors.lightBlue,
                color: colors.blue,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: colors.blue,
                  bgcolor: alpha(colors.lightBlue, 0.1),
                },
              }}
            >
              Previous
            </Button>
          )}

          {currentStep < steps.length - 1 ? (
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={handleNext}
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1rem',
                background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.lightBlue} 100%)`,
                boxShadow: `0 4px 16px ${alpha(colors.lightBlue, 0.4)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${colors.blue} 20%, ${colors.lightBlue} 100%)`,
                  boxShadow: `0 6px 20px ${alpha(colors.lightBlue, 0.5)}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={handleRestart}
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1rem',
                background: `linear-gradient(135deg, ${colors.green} 0%, ${colors.lightGreen} 100%)`,
                boxShadow: `0 4px 16px ${alpha(colors.green, 0.4)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${colors.green} 20%, ${colors.lightGreen} 100%)`,
                  boxShadow: `0 6px 20px ${alpha(colors.green, 0.5)}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Start Over
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DemoScreen;
