import { useState } from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import UploadForm from './pages/UploadForm';
import ViewPage from './pages/ViewPage';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<UploadForm/>}></Route>
          <Route path="/view" element={<ViewPage/>}></Route>
        </Routes>
      </Router>
  );
}

export default App
