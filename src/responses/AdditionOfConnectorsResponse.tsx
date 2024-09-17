import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { CheckCircle as CheckCircleIcon, ArrowRightAlt as ArrowRightAltIcon } from '@mui/icons-material';
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
  white-space: pre-wrap; 
`;

interface AIAdditionOfConnectorsProps {
  data: any;
}

const AIAdditionOfConnectorsViewer: React.FC<AIAdditionOfConnectorsProps> = ({ data }) => (
  <Box>
    <Typography variant="h4" align="center" gutterBottom>
      AI Addition of Connectors Result
    </Typography>

    <TextCard>
      <CardContent>
        <SectionTitle>Original Text:</SectionTitle>
        <EnhancedText>{data.text}</EnhancedText>
      </CardContent>
    </TextCard>

    <TextCard>
      <CardContent>
        <SectionTitle>Text with Connectors:</SectionTitle>
        <EnhancedText>{data.text_with_connectors}</EnhancedText>
      </CardContent>
    </TextCard>

    <ResultCard>
      <CardContent>
        <CategoryTitle>Logical Relations</CategoryTitle>
        <CorrectionList>
          {data.logical_relations.map((relation: any, index: number) => (
            <CorrectionItem key={index}>
              <CorrectionIcon />
              <ListItemText
                primary={`"${relation.sentence}"`}
                secondary={`Relation: ${relation.relation} (Confidence: ${(relation.confidence * 100).toFixed(2)}%)`}
              />
            </CorrectionItem>
          ))}
        </CorrectionList>
      </CardContent>
    </ResultCard>

    <SectionDivider />

    <ResultCard>
      <CardContent>
        <CategoryTitle>Connector Suggestions</CategoryTitle>
        <CorrectionList>
          {data.connector_suggestions.map((suggestion: any, index: number) => (
            <CorrectionItem key={index}>
              <CorrectionIcon />
              <ListItemText
                primary={`Suggested Connector: ${suggestion.connector}`}
                secondary={`Relation Type: ${suggestion.relation_type}`}
              />
            </CorrectionItem>
          ))}
        </CorrectionList>
      </CardContent>
    </ResultCard>

    <SectionDivider />

    <ResultCard>
      <CardContent>
        <CategoryTitle>Fluency Corrections</CategoryTitle>
        <CorrectionList>
          {data.fluency_corrections.map((correction: any, index: number) => (
            <CorrectionItem key={index}>
              <CorrectionIcon />
              <ListItemText
                primary={
                  <BeforeAfterWrapper>
                    <BeforeText variant="body1">From: {correction.start_index} to {correction.end_index}</BeforeText>
                    <ArrowIcon />
                    <AfterText variant="body1">{correction.correction}</AfterText>
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
            </CorrectionItem>
          ))}
        </CorrectionList>
      </CardContent>
    </ResultCard>

    <SectionDivider />

    <TextCard>
      <CardContent>
        <SectionTitle>Final Text:</SectionTitle>
        <EnhancedText>{data.final_text}</EnhancedText>
      </CardContent>
    </TextCard>
  </Box>
);

export default AIAdditionOfConnectorsViewer;
