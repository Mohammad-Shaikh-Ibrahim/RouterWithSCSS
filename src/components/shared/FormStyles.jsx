import { Card, Typography, Button, Box } from '@mui/material';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  padding: 24px;
  max-width: 80%;
  margin: 32px auto;
`;

export const StyledTitle = styled(Typography)`
  margin: 32px 0;
`;

export const StyledButton = styled(Button)`
  padding-left: 48px;
  padding-right: 48px;
`;

export const StyledCancelButton = styled(Button)`
  margin-left: 16px;
`;

export const StyledGenderBox = styled(Box)`
  padding: 8px;
  margin-right: 16px;
  border: 1px solid ${props => props.selected ? '#b92031' : '#e0e0e0'};
  border-radius: 4px;
  background-color: ${props => props.selected ? 'rgba(244, 67, 54, 0.085)' : 'transparent'};
`;

export const StyledDisorderBox = styled(Box)`
  padding: 4px;
  margin-right: 12px;
  border: 1px solid ${props => props.selected ? '#b92031' : '#e0e0e0'};
  border-radius: 4px;
  background-color: ${props => props.selected ? 'rgba(244, 67, 54, 0.085)' : 'transparent'};
`; 