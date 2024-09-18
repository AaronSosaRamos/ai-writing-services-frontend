import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Typography, Collapse, CardContent, Card } from '@mui/material';
import { Language as LanguageIcon, Tune as TuneIcon, Spellcheck as SpellcheckIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AITextualToneShiftResponse from '../responses/TextualToneShiftResponse';
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
  target_tone: z.string().min(1, { message: 'Target tone is required' }),
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

const TextArea = styled(TextField)`
  padding: 10px;
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

export const AITextualToneShiftForm: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await api.post('/textual-tone-shifts', data);
      setResult(response.data);
      toast.success('Tone adjustment request sent successfully!');
    } catch (error) {
      toast.error('An error occurred while processing the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        AI Textual Tone Shift
      </Typography>

      <FormControl variant="outlined" error={!!errors.lang} fullWidth>
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

      <TextArea
        label="Text"
        variant="outlined"
        multiline
        rows={5}
        {...register('text')}
        error={!!errors.text}
        helperText={errors.text?.message}
        fullWidth
      />

      <TextArea
        label="Target Tone"
        variant="outlined"
        {...register('target_tone')}
        error={!!errors.target_tone}
        helperText={errors.target_tone?.message}
        fullWidth
        InputProps={{
          startAdornment: <TuneIcon />,
        }}
      />

      <SubmitButton type="submit" variant="contained" startIcon={<SpellcheckIcon />} disabled={loading}>
        {loading ? 'Processing...' : 'Adjust Tone'}
      </SubmitButton>

      <Collapse in={!!result}>
        {result && (
          <ResultCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
               Results:
              </Typography>
              <AITextualToneShiftResponse data={result} />
            </CardContent>
          </ResultCard>
        )}
      </Collapse>
    </FormContainer>
  );
};

export default AITextualToneShiftForm;
