import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import styled from 'styled-components';

const NavbarContainer = styled(AppBar)`
  background-color: #1e88e5; /* Azul principal */
  transition: background-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out;

  &:hover {
    background-color: #1976d2; /* Azul más oscuro al hacer hover */
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled(Typography)`
  flex-grow: 1;
  font-weight: bold;
  font-size: 1.7rem;
  color: #f5f5f5; /* Blanco suave */
  cursor: pointer;
  transition: letter-spacing 0.4s ease-in-out;

  &:hover {
    letter-spacing: 0.1em; /* Espaciado de letras sutil al hacer hover */
  }
`;

const ToggleButton = styled(IconButton)`
  color: #e0f7fa; /* Azul claro para el icono */
  transition: transform 0.4s ease-in-out, color 0.4s ease-in-out;

  &:hover {
    color: #ffffff;
    transform: rotate(180deg); /* Rotación suave al hacer hover */
  }
`;

const Navbar: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme();
  };

  return (
    <NavbarContainer position="static" elevation={4}>
      <Toolbar>
        <Title variant="h6">
          AI Spelling Checker
        </Title>
        <ToggleButton edge="end" onClick={handleToggle}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </ToggleButton>
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;
