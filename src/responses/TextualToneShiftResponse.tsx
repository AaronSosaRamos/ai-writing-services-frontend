import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
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

const CorrectionList = styled(List)`
  margin-top: 10px;
`;

const CorrectionItem = styled(ListItem)`
  align-items: flex-start;
  padding: 0;
  margin-bottom: 20px;
  border-left: 4px solid ${({ theme }) => theme.palette.primary.main};
  padding-left: 16px;
`;

const BeforeText = styled(Typography)`
  font-weight: 600;
  color: #e57373;
`;

const AfterText = styled(Typography)`
  font-weight: 600;
  color: #81c784;
`;

const ExplanationWrapper = styled(Box)`
  margin-top: 10px;
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.action.hover};
  border-radius: 8px;
`;

const ExplanationTitle = styled(Typography)`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.warning.main};
  margin-bottom: 5px;
`;

const ExplanationText = styled(Typography)`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.palette.text.primary};
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 8px 12px;
  border-left: 4px solid ${({ theme }) => theme.palette.warning.main};
  border-radius: 4px;
`;

const TextCard = styled(Card)`
  margin-bottom: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  animation: fadeIn 0.6s ease-in-out;
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

const SectionTitle = styled(Typography)`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 10px;
`;

const EnhancedText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  line-height: 1.6;
  white-space: pre-wrap;
`;

interface ToneShiftResponseProps {
  data: any;
}

const ToneAnalysisDisplay: React.FC<{ toneAnalysis: any[] }> = ({ toneAnalysis }) => (
  <ResultCard>
    <CardContent>
      <CategoryTitle variant="h6">Tone Analysis</CategoryTitle>
      <CorrectionList>
        {toneAnalysis.map((analysis: any, index: number) => (
          <CorrectionItem key={index}>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" color="primary">Sentence:</Typography>
                  <BeforeText>{analysis.sentence}</BeforeText>
                  <Typography variant="subtitle1" color="primary">Current Tone:</Typography>
                  <Typography>{analysis.current_tone}</Typography>
                  <Typography variant="subtitle1" color="primary">Reason:</Typography>
                  <ExplanationText>{analysis.reason}</ExplanationText>
                </>
              }
            />
            {index < toneAnalysis.length - 1 && <Divider />}
          </CorrectionItem>
        ))}
      </CorrectionList>
    </CardContent>
  </ResultCard>
);

const ToneShiftSuggestionsDisplay: React.FC<{ toneShiftSuggestions: any[] }> = ({ toneShiftSuggestions }) => (
  <ResultCard>
    <CardContent>
      <CategoryTitle variant="h6">Tone Shift Suggestions</CategoryTitle>
      <CorrectionList>
        {toneShiftSuggestions.map((suggestion: any, index: number) => (
          <CorrectionItem key={index}>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" color="primary">Sentence:</Typography>
                  <BeforeText>{suggestion.sentence}</BeforeText>
                  <Typography variant="subtitle1" color="primary">Suggested Revision:</Typography>
                  <AfterText>{suggestion.suggestion}</AfterText>
                </>
              }
            />
            {index < toneShiftSuggestions.length - 1 && <Divider />}
          </CorrectionItem>
        ))}
      </CorrectionList>
    </CardContent>
  </ResultCard>
);

const ToneShiftImplementationDisplay: React.FC<{ toneShiftImplementation: any[] }> = ({ toneShiftImplementation }) => (
  <ResultCard>
    <CardContent>
      <CategoryTitle variant="h6">Tone Shift Implementation</CategoryTitle>
      <CorrectionList>
        {toneShiftImplementation.map((implementation: any, index: number) => (
          <CorrectionItem key={index}>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" color="primary">Original Sentence:</Typography>
                  <BeforeText>{implementation.original_sentence}</BeforeText>
                  <Typography variant="subtitle1" color="primary">Revised Sentence:</Typography>
                  <AfterText>{implementation.revised_sentence}</AfterText>
                  <Typography variant="subtitle1" color="primary">Review Notes:</Typography>
                  <ExplanationText>{implementation.review_notes}</ExplanationText>
                </>
              }
            />
            {index < toneShiftImplementation.length - 1 && <Divider />}
          </CorrectionItem>
        ))}
      </CorrectionList>
    </CardContent>
  </ResultCard>
);

const AITextualToneShift: React.FC<ToneShiftResponseProps> = ({ data }) => {
  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        AI Textual Tone Shift Result
      </Typography>

      <TextCard>
        <CardContent>
          <SectionTitle>Original Text:</SectionTitle>
          <EnhancedText>{data.text}</EnhancedText>
        </CardContent>
      </TextCard>

      <TextCard>
        <CardContent>
          <SectionTitle>Final Text with Tone Shift:</SectionTitle>
          <EnhancedText>{data.final_text}</EnhancedText>
        </CardContent>
      </TextCard>

      <ToneAnalysisDisplay toneAnalysis={data.tone_analysis} />
      <ToneShiftSuggestionsDisplay toneShiftSuggestions={data.tone_shift_suggestions} />
      <ToneShiftImplementationDisplay toneShiftImplementation={data.tone_shift_implementation} />

      <TextCard>
        <CardContent>
          <SectionTitle>Final Review Notes:</SectionTitle>
          <EnhancedText>{data.review_notes}</EnhancedText>
        </CardContent>
      </TextCard>
    </Box>
  );
};

export default AITextualToneShift;
