import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import styled from 'styled-components';

const ResultCard = styled(Card)`
  margin-top: 20px;
  padding: 25px;
  background-color: #fdfdfd;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const NoPlagiarismBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.success.light};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const AIPlagiarismNoResults: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        AI Plagiarism Check Results
      </Typography>

      <NoPlagiarismBox>
        <CheckCircleIcon color="success" style={{ fontSize: 50 }} />
        <Typography variant="h6" gutterBottom>
          No Plagiarism Detected
        </Typography>
        <Typography variant="body1">
          The submitted text has been compared, and no plagiarism was detected.
        </Typography>
      </NoPlagiarismBox>

      <ResultCard>
        <CardContent>
          <Typography variant="h6">Original Text:</Typography>
          <Typography variant="body1" paragraph>
            {data.original_text}
          </Typography>

          <Typography variant="h6">Comparison Text:</Typography>
          <Typography variant="body1" paragraph>
            {data.comparison_text}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            Language: {data.lang.toUpperCase()}
          </Typography>
        </CardContent>
      </ResultCard>
    </Box>
  );
};

export default AIPlagiarismNoResults;
