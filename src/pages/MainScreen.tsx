import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Slide,
  Container,
} from '@mui/material';
import { Spellcheck, Edit, Link, ChangeCircle, Plagiarism } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 6px 15px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'
    }`,
  },
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: '12px',
  padding: theme.spacing(2),
  minHeight: '200px',
}));

const services = [
  {
    icon: <Spellcheck fontSize="large" color="primary" />,
    title: 'Spelling Check',
    description: 'Automatically check and correct the spelling of your documents.',
  },
  {
    icon: <Edit fontSize="large" color="primary" />,
    title: 'Writing Enhancement',
    description: 'Improve the quality and clarity of your texts with advanced suggestions.',
  },
  {
    icon: <Link fontSize="large" color="primary" />,
    title: 'Addition of Connectors',
    description: 'Add appropriate connectors to enhance the flow of your texts.',
  },
  {
    icon: <ChangeCircle fontSize="large" color="primary" />,
    title: 'Textual Tone Shifts',
    description: 'Adjust the tone of your text according to the context and audience.',
  },
  {
    icon: <Plagiarism fontSize="large" color="primary" />,
    title: 'Plagiarism Check',
    description: 'Ensure the originality of your texts with advanced tools.',
  },
];

const MainScreen: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      {/* Título principal centrado */}
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          color: 'primary.main',
        }}
      >
        AI WRITING SERVICES
      </Typography>
      
      {/* Descripción debajo del título */}
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        paragraph
        sx={{
          maxWidth: '600px',
          margin: '0 auto',
          mb: 6,
        }}
      >
        Enhance your writing with our intelligent AI-powered services. From spelling checks to plagiarism detection, we provide the tools to improve your text with ease and efficiency.
      </Typography>
      
      {/* Tarjetas de servicios */}
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            key={service.title}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard>
                <CardContent>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
                    {service.icon}
                  </div>
                  <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'medium' }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {service.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button size="medium" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          </Slide>
        ))}
      </Grid>
    </Container>
  );
};

export default MainScreen;
