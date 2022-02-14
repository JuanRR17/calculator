import React from 'react';
import { BrowserRouter as Router, 
    Routes, Route } from 'react-router-dom';
import Calculator from './Calculator';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calculator/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
