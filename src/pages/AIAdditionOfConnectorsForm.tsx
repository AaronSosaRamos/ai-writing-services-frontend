import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Typography, Collapse, CardContent, Card } from '@mui/material';
import { Language as LanguageIcon, Spellcheck as SpellcheckIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AIAdditionOfConnectorsViewer from '../responses/AdditionOfConnectorsResponse';

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

const mockApiRequest = (data: FormData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        text: "La empresa presentó sus resultados financieros al cierre del tercer trimestre. Las cifras mostraron un incremento significativo en los ingresos brutos. El equipo directivo se reunió para discutir estrategias futuras. Los inversores expresaron su interés en las nuevas iniciativas de expansión. El mercado respondió con un leve aumento en el valor de las acciones. La compañía está planeando una reestructuración de sus operaciones. El objetivo es mejorar la eficiencia y reducir costos operativos. Los empleados fueron informados sobre los posibles cambios en la estructura organizativa. La dirección revisará los procesos internos para optimizar la productividad. Las proyecciones indican un crecimiento sostenido en los próximos años. El departamento de marketing está evaluando nuevas oportunidades para aumentar la participación en el mercado global.",
        lang: data.lang,
        logical_relations: [
          { sentence: "La empresa presentó sus resultados financieros al cierre del tercer trimestre.", relation: "addition", confidence: 0.9 },
          { sentence: "Las cifras mostraron un incremento significativo en los ingresos brutos.", relation: "cause-effect", confidence: 0.85 },
          { sentence: "El equipo directivo se reunió para discutir estrategias futuras.", relation: "addition", confidence: 0.8 },
          { sentence: "Los inversores expresaron su interés en las nuevas iniciativas de expansión.", relation: "cause-effect", confidence: 0.8 },
          { sentence: "El mercado respondió con un leve aumento en el valor de las acciones.", relation: "cause-effect", confidence: 0.85 },
          { sentence: "La compañía está planeando una reestructuración de sus operaciones.", relation: "addition", confidence: 0.9 },
          { sentence: "El objetivo es mejorar la eficiencia y reducir costos operativos.", relation: "purpose", confidence: 0.9 },
          { sentence: "Los empleados fueron informados sobre los posibles cambios en la estructura organizativa.", relation: "addition", confidence: 0.8 },
          { sentence: "La dirección revisará los procesos internos para optimizar la productividad.", relation: "purpose", confidence: 0.85 },
          { sentence: "Las proyecciones indican un crecimiento sostenido en los próximos años.", relation: "prediction", confidence: 0.9 },
          { sentence: "El departamento de marketing está evaluando nuevas oportunidades para aumentar la participación en el mercado global.", relation: "addition", confidence: 0.8 },
        ],
        connector_suggestions: [
          { connector: "Además", position: 1, relation_type: "addition" },
          { connector: "Esto se debe a que", position: 2, relation_type: "cause-effect" },
          { connector: "Asimismo", position: 3, relation_type: "addition" },
          { connector: "Como resultado", position: 4, relation_type: "cause-effect" },
          { connector: "Por lo tanto", position: 5, relation_type: "cause-effect" },
          { connector: "Además", position: 6, relation_type: "addition" },
          { connector: "Con el objetivo de", position: 7, relation_type: "purpose" },
          { connector: "Asimismo", position: 8, relation_type: "addition" },
          { connector: "Para mejorar", position: 9, relation_type: "purpose" },
          { connector: "Se estima que", position: 10, relation_type: "prediction" },
          { connector: "Además", position: 11, relation_type: "addition" },
        ],
        text_with_connectors: "La empresa presentó sus resultados financieros al cierre del tercer trimestre. Además, las cifras mostraron un incremento significativo en los ingresos brutos. Esto se debe a que el equipo directivo se reunió para discutir estrategias futuras. Asimismo, los inversores expresaron su interés en las nuevas iniciativas de expansión. Como resultado, el mercado respondió con un leve aumento en el valor de las acciones. Por lo tanto, la compañía está planeando una reestructuración de sus operaciones. Con el objetivo de mejorar la eficiencia y reducir costos operativos, los empleados fueron informados sobre los posibles cambios en la estructura organizativa. Asimismo, la dirección revisará los procesos internos para optimizar la productividad. Se estima que las proyecciones indican un crecimiento sostenido en los próximos años. Además, el departamento de marketing está evaluando nuevas oportunidades para aumentar la participación en el mercado global.",
        fluency_corrections: [
          {
            start_index: 0,
            end_index: 57,
            correction: "La empresa presentó sus resultados financieros correspondientes al cierre del tercer trimestre.",
            explanation: "La frase se ha reestructurado para dar mayor claridad y precisión sobre a qué se refieren los resultados financieros.",
          },
          {
            start_index: 58,
            end_index: 88,
            correction: "Las cifras mostraron un incremento significativo en los ingresos brutos, impulsado por la reciente estrategia del equipo directivo.",
            explanation: "Se ha añadido una referencia al equipo directivo para conectar mejor la causa con el efecto y mejorar la fluidez de la frase.",
          },
          {
            start_index: 155,
            end_index: 158,
            correction: "Por esta razón,",
            explanation: "El cambio de 'Como resultado,' a 'Por esta razón,' mejora la conexión lógica entre las oraciones.",
          },
          {
            start_index: 231,
            end_index: 231,
            correction: "que",
            explanation: "Añadir 'que' al final de la oración mejora la fluidez al conectar mejor las ideas.",
          },
          {
            start_index: 311,
            end_index: 341,
            correction: "Se prevé que las proyecciones indican un crecimiento sostenido en los próximos años.",
            explanation: "El cambio de 'Se estima que' a 'Se prevé que' mejora la claridad y naturalidad de la frase.",
          },
          {
            start_index: 342,
            end_index: 396,
            correction: "Adicionalmente, el departamento de marketing está evaluando nuevas oportunidades para aumentar su participación en el mercado global.",
            explanation: "El término 'Adicionalmente' es más fluido que 'Además,' y se ha añadido 'su' para especificar que se refiere a la participación del departamento.",
          },
        ],
        final_text: "La empresa presentó sus resultados financieros correspondientes al cierre del tercer trimestre. Las cifras mostraron un incremento significativo en los ingresos brutos, impulsado por la reciente estrategia del equipo directivo. Asimismo, los inversores expresaron su interés en las nuevas iniciativas de expansión. Por esta razón, el mercado respondió con un leve aumento en el valor de las acciones. Por lo tanto, la compañía está planeando una reestructuración de sus operaciones. Con el objetivo de mejorar la eficiencia y reducir costos operativos, los empleados fueron informados sobre los posibles cambios en la estructura organizativa. Asimismo, la dirección revisará los procesos internos para optimizar la productividad. Se prevé que las proyecciones indican un crecimiento sostenido en los próximos años. Adicionalmente, el departamento de marketing está evaluando nuevas oportunidades para aumentar su participación en el mercado global."
      };
      resolve(response);
    }, 2000); 
  });
};

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
      console.log(data)
      const response = await mockApiRequest(data); 
      setResult(response);
      toast.success('Text processed with connectors successfully!');
      console.log(response); 
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
