import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Typography, Collapse, CardContent, Card } from '@mui/material';
import { Language as LanguageIcon, Spellcheck as SpellcheckIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AIAdditionOfConnectorsViewer from '../responses/AdditionOfConnectorsResponse';
import api from '../services/api';

const schema = z.object({
  lang: z
    .string()
    .min(2)
    .max(2)
    .regex(/^[a-zA-Z]{2}$/)
    .refine((val) => ['en', 'es', 'fr', 'de', 'it', 'pt'].includes(val.toLowerCase()), {
      message: 'Invalid language code',
    }),
  text: z.string().min(1, { message: 'Text is required' }),
});

type FormData = z.infer<typeof schema>;

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

export const AIAdditionOfConnectorsForm: React.FC = () => {
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
      const response = await api.post('/addition-of-connectors', data);
      setResult(response.data);
      toast.success('Text processed with connectors successfully!');
    } catch (error) {
      toast.error('An error occurred while processing the text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        AI Addition of Connectors
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

      <TextField
        label="Text"
        variant="outlined"
        multiline
        rows={5}
        {...register('text')}
        error={!!errors.text}
        helperText={errors.text?.message}
        fullWidth
      />

      <StyledButton type="submit" variant="contained" startIcon={<SpellcheckIcon />} disabled={loading}>
        {loading ? 'Processing...' : 'Add Connectors'}
      </StyledButton>

      <Collapse in={!!result}>
        {result && (
          <ResultCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Results:
              </Typography>
              <AIAdditionOfConnectorsViewer data={result} />
            </CardContent>
          </ResultCard>
        )}
      </Collapse>
    </FormContainer>
  );
};

export default AIAdditionOfConnectorsForm;
