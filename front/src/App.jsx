import { Box } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FooterBar from './components/FooterBar';
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App() {
  return (
    <div className=''>
      <NavBar />
      <Box style={{ 'height': '100%', 'min-height': '700px', 'scroll': 'scrolla' }} >
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
      </Box>
      <FooterBar />
    </div>
  );
}

export default App; 