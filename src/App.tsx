import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, Box } from '@mui/material';

const SpellingCheckForm = React.lazy(() => import('./pages/SpellingCheckForm'));

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <ToastContainer />
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        }>
          <Routes>
            <Route path="/" element={<SpellingCheckForm />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
