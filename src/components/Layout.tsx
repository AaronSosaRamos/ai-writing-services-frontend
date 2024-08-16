import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import { lightTheme, darkTheme } from '../styles/theme';
import styled from 'styled-components';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 16px;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <MUIThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <StyledComponentsThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <MainContainer>
          <Navbar toggleTheme={() => setIsDarkMode(!isDarkMode)} />
          <Content>{children}</Content>
          <Footer />
        </MainContainer>
      </StyledComponentsThemeProvider>
    </MUIThemeProvider>
  );
};

export default Layout;
