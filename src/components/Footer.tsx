import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

const FooterContainer = styled(Box)`
  padding: 20px;
  background-color: #1e88e5; /* Azul principal */
  color: #f5f5f5; /* Blanco suave */
  text-align: center;
  transition: background-color 0.4s ease-in-out;

  &:hover {
    background-color: #1976d2; /* Azul más oscuro al hacer hover */
  }
`;

const AppName = styled(Typography)`
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

const FooterText = styled(Typography)`
  font-size: 0.9rem;
  transition: color 0.4s ease-in-out;

  &:hover {
    color: #e0f7fa; /* Azul claro */
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer component="footer">
      <AppName variant="h6">AI Writing Services</AppName>
      <FooterText variant="body2">© 2024 AI Writing Services. All rights reserved.</FooterText>
      <FooterText variant="body2">Made by: Wilfredo Aaron Sosa Ramos</FooterText>
    </FooterContainer>
  );
};

export default Footer;
