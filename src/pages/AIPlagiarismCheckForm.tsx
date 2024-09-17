import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography, MenuItem, FormControl, InputLabel, Select, CircularProgress, Collapse, CardContent, Card } from '@mui/material';
import { Plagiarism as PlagiarismIcon, Compare as CompareIcon, Language as LanguageIcon } from '@mui/icons-material'; // Icons added
import styled from 'styled-components';
import { toast } from 'react-toastify';
import AIPlagiarismResults from '../responses/PlagiarismCheckResponse';

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

const mockApiResponse = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                original_text: "La tecnología ha avanzado a pasos agigantados en las últimas décadas, transformando la manera en que las personas viven y trabajan. Hoy en día, es posible comunicarse con alguien al otro lado del mundo en cuestión de segundos, gracias a las redes globales de internet. Además, los dispositivos móviles permiten acceder a una cantidad infinita de información desde cualquier lugar, haciendo que el mundo esté más conectado que nunca.",
                comparison_text: "En las últimas décadas, la tecnología ha evolucionado enormemente, cambiando la forma en que vivimos y trabajamos. Actualmente, es posible conectarse con cualquier persona en el mundo en cuestión de segundos, gracias a las redes de internet. Los teléfonos móviles, por su parte, nos brindan acceso a una cantidad ilimitada de información desde cualquier sitio, logrando que estemos más interconectados que nunca.",
                lang: "es",
                is_plagiarized: "yes",
                plagiarism_level: 85,
                text_analysis: [
                    {
                        sentence_original: "La tecnología ha avanzado a pasos agigantados en las últimas décadas, transformando la manera en que las personas viven y trabajan.",
                        sentence_comparison: "En las últimas décadas, la tecnología ha evolucionado enormemente, cambiando la forma en que vivimos y trabajamos.",
                        likelihood_of_plagiarism: 0.8,
                        flagged_for_review: true
                    },
                    {
                        sentence_original: "Hoy en día, es posible comunicarse con alguien al otro lado del mundo en cuestión de segundos, gracias a las redes globales de internet.",
                        sentence_comparison: "Actualmente, es posible conectarse con cualquier persona en el mundo en cuestión de segundos, gracias a las redes de internet.",
                        likelihood_of_plagiarism: 0.85,
                        flagged_for_review: true
                    },
                    {
                        sentence_original: "Además, los dispositivos móviles permiten acceder a una cantidad infinita de información desde cualquier lugar, haciendo que el mundo esté más conectado que nunca.",
                        sentence_comparison: "Los teléfonos móviles, por su parte, nos brindan acceso a una cantidad ilimitada de información desde cualquier sitio, logrando que estemos más interconectados que nunca.",
                        likelihood_of_plagiarism: 0.9,
                        flagged_for_review: true
                    }
                ],
                plagiarism_suspicion_suggestions: [
                    {
                        sentence_original: "La tecnología ha avanzado a pasos agigantados en las últimas décadas, transformando la manera en que las personas viven y trabajan.",
                        sentence_comparison: "En las últimas décadas, la tecnología ha evolucionado enormemente, cambiando la forma en que vivimos y trabajamos.",
                        suggestion: "The original sentence and the comparison sentence share similar structures and meanings, particularly in their discussion of technological advancement and its impact on lifestyle and work. To avoid plagiarism, consider rephrasing to include more original phrasing or examples.",
                        likelihood_of_plagiarism: 0.8
                    },
                    {
                        sentence_original: "Hoy en día, es posible comunicarse con alguien al otro lado del mundo en cuestión de segundos, gracias a las redes globales de internet.",
                        sentence_comparison: "Actualmente, es posible conectarse con cualquier persona en el mundo en cuestión de segundos, gracias a las redes de internet.",
                        suggestion: "Both sentences convey the same idea about instantaneous communication through the internet, using similar terms. A suggestion would be to change the structure and wording significantly, such as specifying different means of communication or providing contextual examples.",
                        likelihood_of_plagiarism: 0.85
                    },
                    {
                        sentence_original: "Además, los dispositivos móviles permiten acceder a una cantidad infinita de información desde cualquier lugar, haciendo que el mundo esté más conectado que nunca.",
                        sentence_comparison: "Los teléfonos móviles, por su parte, nos brindan acceso a una cantidad ilimitada de información desde cualquier sitio, logrando que estemos más interconectados que nunca.",
                        suggestion: "The original and comparison sentences express the same concept regarding mobile devices and information access, using very similar phrases. To mitigate plagiarism risk, consider rephrasing to highlight unique perspectives or implications of mobile technology use.",
                        likelihood_of_plagiarism: 0.9
                    }
                ],
                plagiarism_corrections: [
                    {
                        original_sentence: "La tecnología ha avanzado a pasos agigantados en las últimas décadas, transformando la manera en que las personas viven y trabajan.",
                        corrected_sentence: "En las últimas décadas, hemos visto un progreso impresionante en el campo tecnológico, lo que ha modificado significativamente cómo las personas llevan a cabo sus actividades diarias y laborales.",
                        reason_for_correction: "This correction changes the structure and wording while maintaining the core idea. By using phrases like 'progreso impresionante' and 'actividades diarias y laborales', the sentence feels more original and reduces similarity to the flagged sentence."
                    },
                    {
                        original_sentence: "Hoy en día, es posible comunicarse con alguien al otro lado del mundo en cuestión de segundos, gracias a las redes globales de internet.",
                        corrected_sentence: "Actualmente, la comunicación con personas que se encuentran a miles de kilómetros puede realizarse en instantes, facilitada por las vastas redes de internet que conectan el mundo.",
                        reason_for_correction: "This revision alters the structure and introduces terms such as 'facilitada por' and 'vastas redes', which provide a fresh perspective on the same concept, thus minimizing potential plagiarism."
                    },
                    {
                        original_sentence: "Además, los dispositivos móviles permiten acceder a una cantidad infinita de información desde cualquier lugar, haciendo que el mundo esté más conectado que nunca.",
                        corrected_sentence: "Asimismo, los teléfonos inteligentes y tabletas ofrecen la posibilidad de obtener una enorme variedad de información desde prácticamente cualquier ubicación, lo que ha incrementado la interconexión global.",
                        reason_for_correction: "The rephrased sentence incorporates different terms and a broader context ('teléfonos inteligentes y tabletas', 'incrementado la interconexión global') while maintaining the original meaning, effectively reducing the risk of plagiarism."
                    }
                ],
                final_plagiarism_check: {
                    final_text: "En las últimas décadas, hemos visto un progreso impresionante en el campo tecnológico, lo que ha modificado significativamente cómo las personas llevan a cabo sus actividades diarias y laborales. Actualmente, la comunicación con personas que se encuentran a miles de kilómetros puede realizarse en instantes, facilitada por las vastas redes de internet que conectan el mundo. Asimismo, los teléfonos inteligentes y tabletas ofrecen la posibilidad de obtener una enorme variedad de información desde prácticamente cualquier ubicación, lo que ha incrementado la interconexión global.",
                    final_check: "yes",
                    review_notes: "The corrections made to the text successfully rephrased the original sentences while preserving the intended meaning, significantly reducing the risk of plagiarism."
                }
            });
        }, 2000);
    });
};

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
            console.log(data);
            const response = await mockApiResponse();
            setResult(response);
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
                            <AIPlagiarismResults data={result} />
                        </CardContent>
                    </ResultCard>
                )}
            </Collapse>
        </FormContainer>
    );
};

export default AIPlagiarismCheckForm;
