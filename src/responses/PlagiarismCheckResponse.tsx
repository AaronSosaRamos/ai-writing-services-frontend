import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Card, CardContent, Chip, CircularProgress } from '@mui/material';
import { CheckCircle as CheckCircleIcon, ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';
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

const CategoryTitle = styled(Typography)`
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.palette.primary.dark};
`;

const SentenceItem = styled(ListItem)`
  padding: 10px;
  border-left: 4px solid ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 10px;
`;

const SuggestionBox = styled(Box)`
  margin-top: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.palette.action.hover};
  border-left: 4px solid ${({ theme }) => theme.palette.warning.main};
  border-radius: 8px;
`;

interface TextAnalysisSectionProps {
  text_analysis: any;
}

interface PlagiarismSuggestionSectionProps {
  suggestions: any;
}

interface PlagiarismCorrectionsSectionProps {
  corrections: any;
}

interface FinalPlagiarismCheckSectionProps {
  final_check: any;
}

interface AIPlagiarismResultsProps {
  data: any;
}

const TextAnalysisSection: React.FC<TextAnalysisSectionProps> = ({ text_analysis }) => (
  <ResultCard>
    <CardContent>
      <CategoryTitle variant="h6">Text Analysis</CategoryTitle>
      <List>
        {text_analysis.map((item: any, index: number) => (
          <SentenceItem key={index}>
            <ListItemText
              primary={
                <>
                  <Typography variant="body1">
                    <strong>Original:</strong> {item.sentence_original}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Comparison:</strong> {item.sentence_comparison}
                  </Typography>
                </>
              }
              secondary={
                <>
                  <Chip
                    label={`Plagiarism Likelihood: ${item.likelihood_of_plagiarism * 100}%`}
                    color={item.flagged_for_review ? 'error' : 'success'}
                  />
                  {item.flagged_for_review && (
                    <Box marginTop={1}>
                      <Typography variant="body2" color="error">
                        <ErrorOutlineIcon /> Flagged for Review
                      </Typography>
                    </Box>
                  )}
                </>
              }
            />
          </SentenceItem>
        ))}
      </List>
    </CardContent>
  </ResultCard>
);

const PlagiarismSuggestionSection: React.FC<PlagiarismSuggestionSectionProps> = ({ suggestions }) => (
  <ResultCard>
    <CardContent>
      <CategoryTitle variant="h6">Suggestions to Avoid Plagiarism</CategoryTitle>
      <List>
        {suggestions.map((item: any, index: number) => (
          <SentenceItem key={index}>
            <ListItemText
              primary={
                <>
                  <Typography variant="body1">
                    <strong>Original:</strong> {item.sentence_original}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Comparison:</strong> {item.sentence_comparison}
                  </Typography>
                </>
              }
              secondary={
                <SuggestionBox>
                  <Typography variant="body2">
                    <strong>Suggestion:</strong> {item.suggestion}
                  </Typography>
                </SuggestionBox>
              }
            />
          </SentenceItem>
        ))}
      </List>
    </CardContent>
  </ResultCard>
);

const PlagiarismCorrectionsSection: React.FC<PlagiarismCorrectionsSectionProps> = ({ corrections }) => (
  <ResultCard>
    <CardContent>
      <CategoryTitle variant="h6">Plagiarism Corrections</CategoryTitle>
      <List>
        {corrections.map((correction: any, index: number) => (
          <SentenceItem key={index}>
            <ListItemText
              primary={
                <>
                  <Typography variant="body1">
                    <strong>Original:</strong> {correction.original_sentence}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Corrected:</strong> {correction.corrected_sentence}
                  </Typography>
                </>
              }
              secondary={
                <SuggestionBox>
                  <Typography variant="body2">
                    <strong>Reason for Correction:</strong> {correction.reason_for_correction}
                  </Typography>
                </SuggestionBox>
              }
            />
          </SentenceItem>
        ))}
      </List>
    </CardContent>
  </ResultCard>
);

const FinalPlagiarismCheckSection: React.FC<FinalPlagiarismCheckSectionProps> = ({ final_check }) => (
  <ResultCard>
    <CardContent>
      <CategoryTitle variant="h6">Final Plagiarism Check</CategoryTitle>
      <Typography variant="body1" paragraph>
        <strong>Final Text:</strong> {final_check.final_text}
      </Typography>
      <Typography variant="body1">
        <strong>Review Notes:</strong> {final_check.review_notes}
      </Typography>
      <Typography variant="body1">
        <CheckCircleIcon color="success" /> Final Check Passed: {final_check.final_check === 'yes' ? 'Yes' : 'No'}
      </Typography>
    </CardContent>
  </ResultCard>
);

const PlagiarismLevelDisplay = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.action.hover};
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const AIPlagiarismResults: React.FC<AIPlagiarismResultsProps> = ({ data }) => {
  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        AI Plagiarism Check Results
      </Typography>

      <PlagiarismLevelDisplay>
        <Typography variant="h6">
          Plagiarism Level: {data.plagiarism_level}%
        </Typography>
        <CircularProgress variant="determinate" value={data.plagiarism_level} size={50} />
      </PlagiarismLevelDisplay>

      <TextAnalysisSection text_analysis={data.text_analysis} />

      <Divider sx={{ margin: '20px 0' }} />

      <PlagiarismSuggestionSection suggestions={data.plagiarism_suspicion_suggestions} />

      <Divider sx={{ margin: '20px 0' }} />

      <PlagiarismCorrectionsSection corrections={data.plagiarism_corrections} />

      <Divider sx={{ margin: '20px 0' }} />

      <FinalPlagiarismCheckSection final_check={data.final_plagiarism_check} />
    </Box>
  );
};

export default AIPlagiarismResults;
