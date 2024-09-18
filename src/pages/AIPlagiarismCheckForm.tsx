import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography, MenuItem, FormControl, InputLabel, Select, CircularProgress, Collapse, CardContent, Card } from '@mui/material';
import { Plagiarism as PlagiarismIcon, Compare as CompareIcon, Language as LanguageIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AIPlagiarismResults from '../responses/PlagiarismCheckResponse';
import api from '../services/api';
import AIPlagiarismNoResults from '../responses/NoPlagiarismResponse';

const schema = z.object({
    original_text: z.string().min(1, { message: 'Original text is required' }),
    comparison_text: z.string().min(1, { message: 'Comparison text is required' }),
    lang: z.string().min(2).max(2).regex(/^[a-zA-Z]{2}$/).refine((val) => ['en', 'es', 'fr', 'de', 'it', 'pt'].includes(val.toLowerCase()), {
        message: 'Invalid language code',
    }),
});

type FormData = z.infer<typeof schema>;

const FormContainer = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const SubmitButton = styled(Button)`
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
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

const AIPlagiarismCheckForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);

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
            const response = await api.post('/plagiarism-check', data);
            setResult(response.data);
            toast.success('Plagiarism check complete!');
        } catch (error) {
            toast.error('An error occurred during the plagiarism check.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" align="center" gutterBottom>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <PlagiarismIcon fontSize="large" style={{ marginRight: 8 }} />
                    AI Plagiarism Check
                </Box>
            </Typography>

            <TextField
                label="Original Text"
                variant="outlined"
                multiline
                rows={5}
                {...register('original_text')}
                error={!!errors.original_text}
                helperText={errors.original_text?.message}
                fullWidth
            />

            <TextField
                label="Comparison Text"
                variant="outlined"
                multiline
                rows={5}
                {...register('comparison_text')}
                error={!!errors.comparison_text}
                helperText={errors.comparison_text?.message}
                fullWidth
            />

            <FormControl fullWidth variant="outlined" error={!!errors.lang}>
                <InputLabel id="lang-label">Language</InputLabel>
                <Select
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
                </Select>
                {errors.lang && <Typography color="error">{errors.lang.message}</Typography>}
            </FormControl>

            <SubmitButton type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : <><CompareIcon /> Check Plagiarism</>}
            </SubmitButton>

            <Collapse in={!!result}>
                {result && (
                    <ResultCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Results:
                            </Typography>
                            {
                                result.is_plagiarized === 'yes' && (
                                    <AIPlagiarismResults data={result} />
                                )
                            }
                            {
                                result.is_plagiarized === 'no' && (
                                    <AIPlagiarismNoResults data={result} />
                                )
                            }
                        </CardContent>
                    </ResultCard>
                )}
            </Collapse>
        </FormContainer>
    );
};

export default AIPlagiarismCheckForm;
