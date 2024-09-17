import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../services/api';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Typography, Collapse, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Language as LanguageIcon, Description as DescriptionIcon, Spellcheck as SpellcheckIcon, CheckCircle as CheckCircleIcon, HighlightOff as HighlightOffIcon, ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const schema = z.object({
  lang: z.string().min(2).max(2).regex(/^[a-zA-Z]{2}$/).refine((val) => ['en', 'es', 'fr', 'de', 'it', 'pt'].includes(val.toLowerCase()), {
    message: 'Invalid language code',
  }),
  content: z.string().min(1, { message: 'Content is required' }),
});

type FormData = z.infer<typeof schema>;
type Suggestion = {
  originalWord: string;
  suggestedWords: string[];
  context?: string | null;
};

type ErrorDetail = {
  position: number;
  length: number;
  message: string;
  severity: string;
};

type ResultData = {
  result: string;
  hasAnyError: boolean;
  errorExplanation: string | null;
  suggestions: Suggestion[] | null;
  errors: ErrorDetail[] | null;
  language: string;
  processingTime: number;
  confidenceScore?: number | null;
};

const FormContainer = styled(Box)`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 30px;
  background: ${({ theme }) => theme.palette.background.default};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition: all 0.4s ease;

  &:hover {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
    transform: translateY(-5px);
  }
`;

const TextArea = styled(TextField)`
  padding: 10px;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  padding: 12px 24px;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    transform: translateY(-3px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.action.disabled};
  }
`;

const StyledSelect = styled(Select)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const ResultCard = styled(Card)`
  margin-top: 25px;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.default};
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HighlightedResult = styled.span`
  color: ${({ theme }) => theme.palette.success.main};
  font-weight: bold;
`;

const SuggestedText = styled.span`
  color: ${({ theme }) => theme.palette.info.main};
  font-weight: bold;
`;

const SpellingCheckForm: React.FC = () => {
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await api.post<ResultData>('/check-spelling', data);
      setResult(response.data);
      toast.success('Spelling check completed successfully!');
    } catch (error) {
      toast.error('An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Spelling Checker
      </Typography>
      <FormControl variant="outlined" error={!!errors.lang} fullWidth>
        <InputLabel id="lang-label">Language</InputLabel>
        <StyledSelect
          labelId="lang-label"
          label="Language"
          defaultValue=""
          {...register('lang')}
          onChange={(e) => setValue('lang', e.target.value as string)}
          startAdornment={<LanguageIcon />}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="fr">French</MenuItem>
          <MenuItem value="de">German</MenuItem>
          <MenuItem value="it">Italian</MenuItem>
          <MenuItem value="pt">Portuguese</MenuItem>
        </StyledSelect>
        {errors.lang && <Typography color="error">{errors.lang.message}</Typography>}
      </FormControl>
      <TextArea
        label="Content"
        variant="outlined"
        multiline
        rows={4}
        {...register('content')}
        error={!!errors.content}
        helperText={errors.content?.message}
        InputProps={{
          startAdornment: <DescriptionIcon />,
        }}
        fullWidth
      />
      <StyledButton type="submit" variant="contained" startIcon={<SpellcheckIcon />} disabled={loading}>
        {loading ? 'Checking...' : 'Check Spelling'}
      </StyledButton>

      <Collapse in={!!result}>
        {result && (
          <ResultCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Result:
              </Typography>
              <Typography variant="body1" gutterBottom>
                <HighlightedResult>{result.result}</HighlightedResult>
              </Typography>

              {result.hasAnyError ? (
                <>
                  <Typography variant="body2" color="error">
                    {result.errorExplanation}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Suggestions:
                  </Typography>
                  <List>
                    {result.suggestions?.map((suggestion, index) => (
                      <ListItem key={index}>
                        <ArrowForwardIosIcon sx={{ color: 'primary.main' }} />
                        <ListItemText
                          primary={`Original: ${suggestion.originalWord}`}
                          secondary={
                            <>
                              <SuggestedText>Suggested: {suggestion.suggestedWords.join(', ')}</SuggestedText>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider />

                  <Typography variant="h6" gutterBottom>
                    Error Details:
                  </Typography>
                  <List>
                    {result.errors?.map((error, index) => (
                      <ListItem key={index}>
                        {error.severity === 'high' ? (
                          <HighlightOffIcon sx={{ color: 'error.main' }} />
                        ) : (
                          <CheckCircleIcon sx={{ color: 'warning.main' }} />
                        )}
                        <ListItemText
                          primary={error.message}
                          secondary={`Position: ${error.position}, Length: ${error.length}, Severity: ${error.severity}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : (
                <Typography variant="body2" color="success.main">
                  No errors found. Your text is well-written!
                </Typography>
              )}

              <Divider />

              <Typography variant="h6" gutterBottom>
                Additional Information:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Language:" secondary={result.language} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Processing Time:" secondary={`${result.processingTime} seconds`} />
                </ListItem>
                {result.confidenceScore !== null && (
                  <ListItem>
                    <ListItemText primary="Confidence Score:" secondary={result.confidenceScore} />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </ResultCard>
        )}
      </Collapse>
    </FormContainer>
  );
};

export default SpellingCheckForm;
