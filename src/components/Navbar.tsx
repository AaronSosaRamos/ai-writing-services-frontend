import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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

const FullScreenMenu = styled(Box)<{ darkMode: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ darkMode }) => (darkMode ? '#333' : '#ffffff')}; /* Fondo dinámico */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Alineación centrada verticalmente */
  z-index: 1300; /* MUI AppBar default z-index is 1100 */
  transition: background-color 0.4s ease-in-out;
  padding-top: 50px; /* Espacio adicional en la parte superior */
`;

const MenuItemStyled = styled(MenuItem)`
  font-size: 1.5rem; /* Tamaño de fuente más grande */
  margin: 15px 0; /* Espaciado entre los elementos del menú */
  width: 80%;
  text-align: center;
  color: inherit;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* Líneas divisorias suaves */
  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Fondo al pasar el ratón */
  }
`;

const Navbar: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme();
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <NavbarContainer position="static" elevation={4}>
        <Toolbar>
          <Title variant="h6">
            AI Spelling Checker
          </Title>
          {!isMobile ? (
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <MenuItem onClick={handleMenuClose}>Home</MenuItem>
              <MenuItem onClick={handleMenuClose}>Spelling Check</MenuItem>
              <ToggleButton edge="end" onClick={handleToggle}>
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </ToggleButton>
            </Box>
          ) : (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ marginLeft: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </NavbarContainer>

      {isMobile && (
        <Slide direction="down" in={menuOpen} mountOnEnter unmountOnExit>
          <FullScreenMenu darkMode={isDarkMode}>
            <IconButton onClick={handleMenuClose} sx={{ position: 'absolute', top: 16, right: 16 }}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000' }}>
              AI Spelling Checker
            </Typography>
            <MenuItemStyled onClick={handleMenuClose}>Home</MenuItemStyled>
            <MenuItemStyled onClick={handleMenuClose}>Spelling Check</MenuItemStyled>
            <IconButton onClick={handleToggle} sx={{ marginTop: '20px' }}>
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </FullScreenMenu>
        </Slide>
      )}
    </>
  );
};

export default Navbar;
