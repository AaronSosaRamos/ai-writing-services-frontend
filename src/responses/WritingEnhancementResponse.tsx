import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box, Chip } from '@mui/material';
import { CheckCircle as CheckCircleIcon, ArrowRightAlt as ArrowRightAltIcon, ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';
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

const CorrectionIcon = styled(CheckCircleIcon)`
  color: ${({ theme }) => theme.palette.success.main};
  margin-right: 16px;
  font-size: 1.8rem;
`;

const ErrorIcon = styled(ErrorOutlineIcon)`
  color: ${({ theme }) => theme.palette.error.main};
  margin-right: 16px;
  font-size: 1.8rem;
`;

const BeforeAfterWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const ArrowIcon = styled(ArrowRightAltIcon)`
  margin: 0 10px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.palette.info.main};
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

const SectionDivider = styled(Divider)`
  margin: 30px 0;
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
  white-space: pre-wrap; /* This will preserve new lines and spacing in the text */
`;

interface Correction {
  before: string;
  after: string;
  explanation: string;
}

interface ResultDisplayProps {
  category: string;
  corrections: Correction[];
}

const WritingEnhancementResultDisplay: React.FC<ResultDisplayProps> = ({ category, corrections }) => (
  <ResultCard>
    <CardContent>
      <CategoryTitle variant="h6">{category}</CategoryTitle>

      <CorrectionList>
        {corrections.map((correction, index) => (
          <CorrectionItem key={index}>
            <CorrectionIcon />
            <ListItemText
              primary={
                <BeforeAfterWrapper>
                  <BeforeText variant="body1">"{correction.before}"</BeforeText>
                  <ArrowIcon />
                  <AfterText variant="body1">"{correction.after}"</AfterText>
                </BeforeAfterWrapper>
              }
              secondary={
                <ExplanationWrapper>
                  <ExplanationTitle variant="subtitle1">Explanation:</ExplanationTitle>
                  <ExplanationText variant="body2">
                    {correction.explanation}
                  </ExplanationText>
                </ExplanationWrapper>
              }
            />
            {index < corrections.length - 1 && <SectionDivider />}
          </CorrectionItem>
        ))}
      </CorrectionList>
    </CardContent>
  </ResultCard>
);

interface WritingEnhancementMockedViewer{
    data: any
}

const WritingEnhancementMockedViewer: React.FC<WritingEnhancementMockedViewer> = ({data}) => {
    return (
        <Box>
        <Typography variant="h4" align="center" gutterBottom>
          AI Writing Enhancement Result
        </Typography>
  
        <TextCard>
          <CardContent>
            <SectionTitle>Original Text:</SectionTitle>
            <EnhancedText>{data.text}</EnhancedText>
          </CardContent>
        </TextCard>
  
        <TextCard>
          <CardContent>
            <SectionTitle>Normalized Text:</SectionTitle>
            <EnhancedText>{data.normalized_text}</EnhancedText>
          </CardContent>
        </TextCard>
  
        <TextCard>
          <CardContent>
            <SectionTitle>Advanced Grammar Text:</SectionTitle>
            <EnhancedText>{data.advanced_grammar_text}</EnhancedText>
          </CardContent>
        </TextCard>
  
        <TextCard>
          <CardContent>
            <SectionTitle>Clarity and Readability Text:</SectionTitle>
            <EnhancedText>{data.clarity_readability_text}</EnhancedText>
          </CardContent>
        </TextCard>
  
        <TextCard>
          <CardContent>
            <SectionTitle>Corrected Style Text:</SectionTitle>
            <EnhancedText>{data.corrected_style_text}</EnhancedText>
          </CardContent>
        </TextCard>
  
        <Divider sx={{ margin: '20px 0' }} />
  
        <WritingEnhancementResultDisplay category="Normalization Corrections" corrections={data.normalize_corrections} />
        <WritingEnhancementResultDisplay category="Advanced Grammar Corrections" corrections={data.advanced_grammar_corrections} />
        <WritingEnhancementResultDisplay category="Clarity and Readability Corrections" corrections={data.clarity_readability_corrections} />
        <WritingEnhancementResultDisplay category="Stylistic Corrections" corrections={data.stylistic_corrections} />
      </Box>
    );
};

export default WritingEnhancementMockedViewer;
