import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText' }} component="footer">
      <Typography variant="body2" align="center">
        © 2024 MyApp. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;