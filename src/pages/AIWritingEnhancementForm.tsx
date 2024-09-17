import React, { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Typography, Collapse, Card, CardContent, CircularProgress } from '@mui/material';
import { Language as LanguageIcon, Spellcheck as SpellcheckIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import WritingEnhancementMockedViewer from '../responses/WritingEnhancementResponse';

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

const mockApiResponse = () => {
  return new Promise((resolve) => {
    const data = {
        text: "bueno aki te traigo un parrafo mas largo que tiene bastantes errores de ortografia y no hay ningun tipo de acentos ni signos de puntuacion bien utilizados asi que la lectura se vuelve mas dificil porque las ideas no estan conectadas de forma clara por ejemplo cuando estas hablando de un tema y de repente cambias a otro sin siquiera poner una coma o un punto y seguido esto hace que todo el parrafo se vea muy desordenado y confuso lo que dificulta mucho entender cual es el punto principal que se quiere expresar",
        normalized_text: "Bueno, aquí te traigo un párrafo más largo que tiene bastantes errores de ortografía y no hay ningún tipo de acentos ni signos de puntuación bien utilizados. Así que la lectura se vuelve más difícil porque las ideas no están conectadas de forma clara. Por ejemplo, cuando estás hablando de un tema y de repente cambias a otro sin siquiera poner una coma o un punto y seguido, esto hace que todo el párrafo se vea muy desordenado y confuso, lo que dificulta mucho entender cuál es el punto principal que se quiere expresar.",
        advanced_grammar_text: "Bueno, aquí te traigo un párrafo más largo que tiene bastantes errores de ortografía y carece de acentos y signos de puntuación bien utilizados. Esto hace que la lectura sea más difícil, ya que las ideas no están conectadas de forma clara. Por ejemplo, cuando hablas de un tema y de repente cambias a otro sin poner una coma o un punto y seguido, todo el párrafo se ve desordenado y confuso, lo que dificulta entender cuál es el punto principal que se quiere expresar.",
        clarity_readability_text: "Aquí tienes un párrafo más largo que presenta varios errores de ortografía y carece de acentos y signos de puntuación adecuados. Esto dificulta la lectura, ya que las ideas no están conectadas de manera clara. Por ejemplo, cuando mencionas un tema y de repente cambias a otro sin usar una coma o un punto y seguido, el párrafo se vuelve desordenado y confuso, lo que hace que sea difícil comprender el punto principal que deseas expresar.",
        corrected_style_text: "A continuación, se presenta un párrafo más extenso que contiene diversos errores ortográficos y carece de acentuación y puntuación adecuadas. Esta situación complica la lectura, dado que las ideas no están claramente conectadas. Por ejemplo, al abordar un tema y luego cambiar abruptamente a otro sin la utilización de una coma o un punto y seguido, el párrafo se torna desordenado y confuso, lo que dificulta la comprensión del mensaje principal que se desea transmitir.",
        "normalize_corrections": [
            {
                "before": "bueno aki te traigo un parrafo mas largo que tiene bastantes errores de ortografia y no hay ningun tipo de acentos ni signos de puntuacion bien utilizados asi que la lectura se vuelve mas dificil porque las ideas no estan conectadas de forma clara por ejemplo cuando estas hablando de un tema y de repente cambias a otro sin siquiera poner una coma o un punto y seguido esto hace que todo el parrafo se vea muy desordenado y confuso lo que dificulta mucho entender cual es el punto principal que se quiere expresar",
                "after": "Bueno, aquí te traigo un párrafo más largo que tiene bastantes errores de ortografía y no hay ningún tipo de acentos ni signos de puntuación bien utilizados. Así que la lectura se vuelve más difícil porque las ideas no están conectadas de forma clara. Por ejemplo, cuando estás hablando de un tema y de repente cambias a otro sin siquiera poner una coma o un punto y seguido, esto hace que todo el párrafo se vea muy desordenado y confuso, lo que dificulta mucho entender cuál es el punto principal que se quiere expresar.",
                "explanation": "Se corrigieron errores de acentuación, se añadieron comas y puntos para mejorar la claridad, y se ajustó la redacción para que el texto sea más formal y legible."
            }
        ],
        "advanced_grammar_corrections": [
            {
                "before": "no hay ningún tipo de acentos ni signos de puntuación bien utilizados.",
                "after": "carece de acentos y signos de puntuación bien utilizados.",
                "explanation": "Se ha cambiado 'no hay ningún tipo de' por 'carece de' para lograr mayor concisión y elegancia en la expresión."
            },
            {
                "before": "Así que la lectura se vuelve más difícil porque las ideas no están conectadas de forma clara.",
                "after": "Esto hace que la lectura sea más difícil, ya que las ideas no están conectadas de forma clara.",
                "explanation": "Se ha sustituido 'Así que' por 'Esto hace que' para mejorar la fluidez de la oración y se ha cambiado 'se vuelve' por 'sea' para mayor claridad."
            },
            {
                "before": "cuando estás hablando de un tema y de repente cambias a otro sin siquiera poner una coma o un punto y seguido, esto hace que todo el párrafo se vea muy desordenado y confuso, lo que dificulta mucho entender cuál es el punto principal que se quiere expresar.",
                "after": "cuando hablas de un tema y de repente cambias a otro sin poner una coma o un punto y seguido, todo el párrafo se ve desordenado y confuso, lo que dificulta entender cuál es el punto principal que se quiere expresar.",
                "explanation": "Se ha cambiado 'estás hablando' por 'hablas' para simplificar la estructura de la oración y se ha eliminado 'muy' antes de 'desordenado' para evitar la redundancia."
            }
        ],
        "clarity_readability_corrections": [
            {
                "before": "Bueno, aquí te traigo un párrafo más largo que tiene bastantes errores de ortografía y carece de acentos y signos de puntuación bien utilizados.",
                "after": "Aquí tienes un párrafo más largo que presenta varios errores de ortografía y carece de acentos y signos de puntuación adecuados.",
                "explanation": "Se eliminó 'Bueno' para dar un tono más directo y se cambiaron algunas palabras para mejorar la fluidez y claridad."
            },
            {
                "before": "Esto hace que la lectura sea más difícil, ya que las ideas no están conectadas de forma clara.",
                "after": "Esto dificulta la lectura, ya que las ideas no están conectadas de manera clara.",
                "explanation": "Se simplificó la estructura de la oración para mayor claridad."
            },
            {
                "before": "Por ejemplo, cuando hablas de un tema y de repente cambias a otro sin poner una coma o un punto y seguido, todo el párrafo se ve desordenado y confuso, lo que dificulta entender cuál es el punto principal que se quiere expresar.",
                "after": "Por ejemplo, cuando mencionas un tema y de repente cambias a otro sin usar una coma o un punto y seguido, el párrafo se vuelve desordenado y confuso, lo que hace que sea difícil comprender el punto principal que deseas expresar.",
                "explanation": "Se cambiaron algunas palabras para mejorar la claridad y la coherencia de la oración."
            }
        ],
        "stylistic_corrections": [
            {
                "before": "Aquí tienes un párrafo más largo que presenta varios errores de ortografía y carece de acentos y signos de puntuación adecuados.",
                "after": "A continuación, se presenta un párrafo más extenso que contiene diversos errores ortográficos y carece de acentuación y puntuación adecuadas.",
                "explanation": "Se mejoró la fluidez y formalidad del texto al utilizar un vocabulario más variado y una estructura más clara."
            },
            {
                "before": "Esto dificulta la lectura, ya que las ideas no están conectadas de manera clara.",
                "after": "Esta situación complica la lectura, dado que las ideas no están claramente conectadas.",
                "explanation": "Se utilizó un lenguaje más sofisticado para mejorar el tono del texto."
            },
            {
                "before": "Por ejemplo, cuando mencionas un tema y de repente cambias a otro sin usar una coma o un punto y seguido, el párrafo se vuelve desordenado y confuso, lo que hace que sea difícil comprender el punto principal que deseas expresar.",
                "after": "Por ejemplo, al abordar un tema y luego cambiar abruptamente a otro sin la utilización de una coma o un punto y seguido, el párrafo se torna desordenado y confuso, lo que dificulta la comprensión del mensaje principal que se desea transmitir.",
                "explanation": "Se mejoró la cohesión y claridad del ejemplo presentado, además de utilizar un lenguaje más preciso."
            }
        ]
    };

    setTimeout(() => resolve(data), 2000);
  });
};

export const AIWritingEnhancementForm: React.FC = () => {
  const [result, setResult] = useState<any | null>(null);
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
      console.log(data)
      const response = await mockApiResponse();
      setResult(response);
      toast.success('Text enhanced successfully!');
    } catch (error) {
      toast.error('An error occurred while enhancing the text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        AI Writing Enhancement
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
        {loading ? 'Enhancing...' : 'Enhance Text'}
      </StyledButton>

      <Collapse in={!!result}>
        {result && (
          <ResultCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Enhancement Results:
              </Typography>
              <WritingEnhancementMockedViewer data={result} />
            </CardContent>
          </ResultCard>
        )}
      </Collapse>
    </FormContainer>
  );
};
