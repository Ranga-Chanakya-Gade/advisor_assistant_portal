import React from 'react';
import { Chip, alpha } from '@mui/material';

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

const MetricBadge = ({
  label,
  value,
  type = 'info',
  size = 'medium',
  icon: Icon
}) => {
  // Determine badge color based on type
  const getTypeColor = () => {
    switch (type) {
      case 'success':
        return colors.green;
      case 'warning':
        return colors.orange;
      case 'error':
      case 'risk':
        return colors.red;
      case 'primary':
        return colors.lightBlue;
      default:
        return colors.blue;
    }
  };

  const color = getTypeColor();

  // Determine badge variant based on value (for risk scores)
  const getVariant = () => {
    if (typeof value === 'number') {
      if (value >= 75) return { color: colors.red, label: 'High' };
      if (value >= 50) return { color: colors.orange, label: 'Medium' };
      if (value >= 25) return { color: colors.yellow, label: 'Low' };
      return { color: colors.green, label: 'Minimal' };
    }
    return { color, label: value };
  };

  const variant = getVariant();

  return (
    <Chip
      icon={Icon ? <Icon sx={{ fontSize: size === 'small' ? 16 : 20 }} /> : undefined}
      label={label ? `${label}: ${variant.label}` : variant.label}
      size={size}
      sx={{
        bgcolor: alpha(variant.color, 0.15),
        color: variant.color,
        fontWeight: 700,
        fontSize: size === 'small' ? '0.75rem' : '0.875rem',
        border: `2px solid ${alpha(variant.color, 0.3)}`,
        '& .MuiChip-icon': {
          color: variant.color
        }
      }}
    />
  );
};

export default MetricBadge;
