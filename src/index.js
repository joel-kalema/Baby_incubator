import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
// import App from './App';
import Docteur from './main';
import Parent from './parent';
import Login from './login';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/parent" element={<Parent />} />
    <Route path="/doctor" element={<Docteur />} />
  </Routes>
</BrowserRouter>
);

reportWebVitals();
