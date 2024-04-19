import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router';
import Scenario1 from './pages/Scenario1';
import Scenario2 from './pages/Scenario2';
import Scenario3 from './pages/Scenario3';
import Scenario4 from './pages/Scenario4';
import Home from './pages/Home';

function App() {
 
  return (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/scenario_un' element={<Scenario1 />} />
    <Route path='/scenario_deux' element={<Scenario2 />} />
    <Route path='/scenario_trois' element={<Scenario3 />} />
    <Route path='/scenario_quatre' element={<Scenario4 />} />
  </Routes>
  );
}

export default App;
