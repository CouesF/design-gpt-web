// design-gpt-web/client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MethodPage from './pages/MethodPage';
import GraphPage from './pages/GraphPage';
import MainPage from './pages/MainPage';
import MethodListPage from './pages/MethodListPage';

const App = () => {
  const subPath = process.env.REACT_APP_SUBDIRECTORY_PREFIX || '';
  return (
    <Router basename={subPath}>
    {/* // <Router> */}

      <Routes>
        <Route path="/method/:id" element={<MethodPage />} />
        <Route path="/graph-page" element={<GraphPage />} />
        <Route path="/method-list" element={<MethodListPage />} />
        <Route path="/" element={<MainPage />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
