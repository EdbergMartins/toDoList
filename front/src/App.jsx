import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FooterBar from './components/FooterBar';
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App() {
  return (
    <div className='body'>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
      <FooterBar />
    </div>
  );
}

export default App; 