import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Typography, Collapse, CardContent, Card } from '@mui/material';
import { Language as LanguageIcon, Tune as TuneIcon, Spellcheck as SpellcheckIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AITextualToneShiftResponse from '../responses/TextualToneShiftResponse';

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

const mockApiRequest = (data: FormData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        text: "Pues mira, un LLM es básicamente como un cerebro gigante que ha leído un montón de cosas de internet, libros, artículos, ¡todo lo que te puedas imaginar! Entonces, cuando le preguntas algo, no es que piense de verdad, pero usa toda esa información que tiene guardada para darte una respuesta que suene inteligente. Es como si juntara pedacitos de todo lo que ha leído para intentar entender qué le estás diciendo y responder de la mejor forma posible. O sea, no es que sepa realmente, pero hace como que sí. Eso sí, a veces suelta cosas que no tienen ni pies ni cabeza, pero la mayoría del tiempo te deja pensando ¡vaya, qué listo parece este!",
        lang: "es",
        target_tone: "formal",
        tone_analysis: [
          {
            sentence: "Pues mira, un LLM es básicamente como un cerebro gigante que ha leído un montón de cosas de internet, libros, artículos, ¡todo lo que te puedas imaginar!",
            current_tone: "informal",
            change_needed: true,
            reason: "The use of colloquial phrases and exclamations creates an informal tone, which is not suitable for a formal context."
          },
          {
            sentence: "Entonces, cuando le preguntas algo, no es que piense de verdad, pero usa toda esa información que tiene guardada para darte una respuesta que suene inteligente.",
            current_tone: "informal",
            change_needed: true,
            reason: "The conversational style and casual language need to be adjusted for a more formal presentation."
          },
          {
            sentence: "Es como si juntara pedacitos de todo lo que ha leído para intentar entender qué le estás diciendo y responder de la mejor forma posible.",
            current_tone: "informal",
            change_needed: true,
            reason: "The metaphorical and casual wording should be replaced with more formal language to meet the target tone."
          },
          {
            sentence: "O sea, no es que sepa realmente, pero hace como que sí.",
            current_tone: "informal",
            change_needed: true,
            reason: "The informal phrase 'O sea' and the casual expression require a more formal rephrasing."
          },
          {
            sentence: "Eso sí, a veces suelta cosas que no tienen ni pies ni cabeza, pero la mayoría del tiempo te deja pensando ¡vaya, qué listo parece este!",
            current_tone: "informal",
            change_needed: true,
            reason: "The playful language and exclamations contribute to an informal tone that should be revised for formality."
          }
        ],
        tone_shift_suggestions: [
          {
            sentence: "Pues mira, un LLM es básicamente como un cerebro gigante que ha leído un montón de cosas de internet, libros, artículos, ¡todo lo que te puedas imaginar!",
            suggested_tone: "formal",
            suggestion: "Un LLM puede considerarse un sistema de procesamiento de lenguaje natural que ha sido entrenado con una gran cantidad de datos provenientes de diversas fuentes, incluyendo internet, libros y artículos.",
            position: 0
          },
          {
            sentence: "Entonces, cuando le preguntas algo, no es que piense de verdad, pero usa toda esa información que tiene guardada para darte una respuesta que suene inteligente.",
            suggested_tone: "formal",
            suggestion: "Cuando se le formula una pregunta, el LLM no procesa información de manera consciente, sino que utiliza los datos almacenados para generar una respuesta coherente.",
            position: 1
          },
          {
            sentence: "Es como si juntara pedacitos de todo lo que ha leído para intentar entender qué le estás diciendo y responder de la mejor forma posible.",
            suggested_tone: "formal",
            suggestion: "El sistema integra fragmentos de la información que ha analizado para interpretar la consulta realizada y proporcionar una respuesta adecuada.",
            position: 2
          },
          {
            sentence: "O sea, no es que sepa realmente, pero hace como que sí.",
            suggested_tone: "formal",
            suggestion: "No posee conocimiento en el sentido humano, pero simula comprensión a través de patrones aprendidos.",
            position: 3
          },
          {
            sentence: "Eso sí, a veces suelta cosas que no tienen ni pies ni cabeza, pero la mayoría del tiempo te deja pensando ¡vaya, qué listo parece este!",
            suggested_tone: "formal",
            suggestion: "Sin embargo, en ocasiones puede ofrecer respuestas que carecen de coherencia, aunque en general logra proporcionar reflexiones que resultan interesantes.",
            position: 4
          }
        ],
        tone_shift_implementation: [
          {
            original_sentence: "Pues mira, un LLM es básicamente como un cerebro gigante que ha leído un montón de cosas de internet, libros, artículos, ¡todo lo que te puedas imaginar!",
            revised_sentence: "Un LLM puede considerarse un sistema de procesamiento de lenguaje natural que ha sido entrenado con una gran cantidad de datos provenientes de diversas fuentes, incluyendo internet, libros y artículos.",
            final_review: "yes",
            review_notes: "The tone shift was successfully implemented to a more formal style."
          },
          {
            original_sentence: "Entonces, cuando le preguntas algo, no es que piense de verdad, pero usa toda esa información que tiene guardada para darte una respuesta que suene inteligente.",
            revised_sentence: "Cuando se le formula una pregunta, el LLM no procesa información de manera consciente, sino que utiliza los datos almacenados para generar una respuesta coherente.",
            final_review: "yes",
            review_notes: "The formal tone is appropriate for the context."
          },
          {
            original_sentence: "Es como si juntara pedacitos de todo lo que ha leído para intentar entender qué le estás diciendo y responder de la mejor forma posible.",
            revised_sentence: "El sistema integra fragmentos de la información que ha analizado para interpretar la consulta realizada y proporcionar una respuesta adecuada.",
            final_review: "yes",
            review_notes: "The formalization of the sentence enhances clarity."
          },
          {
            original_sentence: "O sea, no es que sepa realmente, pero hace como que sí.",
            revised_sentence: "No posee conocimiento en el sentido humano, pero simula comprensión a través de patrones aprendidos.",
            final_review: "yes",
            review_notes: "The tone shift is successful; the revised sentence is formal and informative."
          },
          {
            original_sentence: "Eso sí, a veces suelta cosas que no tienen ni pies ni cabeza, pero la mayoría del tiempo te deja pensando ¡vaya, qué listo parece este!",
            revised_sentence: "Sin embargo, en ocasiones puede ofrecer respuestas que carecen de coherencia, aunque en general logra proporcionar reflexiones que resultan interesantes.",
            final_review: "yes",
            review_notes: "The revised sentence maintains the original meaning while adopting a formal tone."
          }
        ],
        final_text: "Un LLM puede considerarse un sistema de procesamiento de lenguaje natural que ha sido entrenado con una gran cantidad de datos provenientes de diversas fuentes, incluyendo internet, libros y artículos. Cuando se le formula una pregunta, el LLM no procesa información de manera consciente, sino que utiliza los datos almacenados para generar una respuesta coherente. El sistema integra fragmentos de la información que ha analizado para interpretar la consulta realizada y proporcionar una respuesta adecuada. No posee conocimiento en el sentido humano, pero simula comprensión a través de patrones aprendidos. Sin embargo, en ocasiones puede ofrecer respuestas que carecen de coherencia, aunque en general logra proporcionar reflexiones que resultan interesantes.",
        final_review: "yes",
        review_notes: "The overall text successfully reflects a formal tone, making it suitable for an academic or professional audience.",
        final_check: "yes"
      };
      resolve(response);
    }, 2000);
  });
};

export const AITextualToneShiftForm: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      console.log(data);
      const response = await mockApiRequest(data);
      setResult(response);
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
