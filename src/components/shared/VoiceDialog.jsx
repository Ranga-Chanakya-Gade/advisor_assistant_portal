import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  alpha
} from '@mui/material';
import { Close as CloseIcon, Mic as MicIcon } from '@mui/icons-material';

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

const VoiceDialog = ({
  open,
  onClose,
  onCommand,
  title = 'Voice Command',
  isListening = false,
  transcript = '',
  prompt = 'Speak your command...'
}) => {
  const [displayTranscript, setDisplayTranscript] = useState('');

  useEffect(() => {
    if (transcript) {
      setDisplayTranscript(transcript);
    }
  }, [transcript]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          border: `3px solid ${colors.lightBlue}`,
          boxShadow: `0 8px 32px ${alpha(colors.lightBlue, 0.3)}`
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 600 }}
          >
            {title}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 4
          }}
        >
          {/* Microphone Icon */}
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: alpha(colors.lightBlue, 0.15),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              position: 'relative',
              animation: isListening ? 'pulse 1.5s ease-in-out infinite' : 'none',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  boxShadow: `0 0 0 0 ${alpha(colors.lightBlue, 0.7)}`
                },
                '50%': {
                  transform: 'scale(1.05)',
                  boxShadow: `0 0 0 20px ${alpha(colors.lightBlue, 0)}`
                },
                '100%': {
                  transform: 'scale(1)',
                  boxShadow: `0 0 0 0 ${alpha(colors.lightBlue, 0)}`
                }
              }
            }}
          >
            <MicIcon sx={{ fontSize: 64, color: colors.lightBlue }} />
            {isListening && (
              <CircularProgress
                size={140}
                thickness={2}
                sx={{
                  color: colors.lightBlue,
                  position: 'absolute',
                  top: -10,
                  left: -10
                }}
              />
            )}
          </Box>

          {/* Status Text */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Roboto Slab, serif',
              color: isListening ? colors.lightBlue : 'text.secondary',
              mb: 2,
              textAlign: 'center'
            }}
          >
            {isListening ? 'Listening...' : prompt}
          </Typography>

          {/* Transcript Display */}
          {displayTranscript && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: alpha(colors.lightBlue, 0.08),
                borderRadius: 2,
                border: `1px solid ${alpha(colors.lightBlue, 0.3)}`,
                width: '100%',
                minHeight: 60
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}
              >
                "{displayTranscript}"
              </Typography>
            </Box>
          )}

          {/* Help Text */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 3, textAlign: 'center', maxWidth: 400 }}
          >
            Try commands like: "Create task", "Schedule appointment", "Show customers", or "Read my tasks"
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceDialog;
