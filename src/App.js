import React, { useState } from 'react';

import './App.css';
// import Counter from './components/Counter';
import './custom.scss';
// import Button from 'react-bootstrap/Button';

import OffcanvasNav from './components/OffcanvasNav';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage'
import StringMethods from './pages/js/StringMethods';


function App() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
    // Тут можете добавить дополнительную логику, например, затемнение.
  };

  return (
    <div className="App">

      <OffcanvasNav onDropdownToggle={handleDropdownToggle} />

      <div className={`container-custom ${isDropdownOpen ? 'modal-open' : ''}`} >


        {/* <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/js-string-methods" element={<StringMethods />} />
            <Route path="*" element={<NotFoundPage />} /> 
          </Routes>
        </Router> */}

        <Router basename="/roasting-app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/js-string-methods" element={<StringMethods />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>

        {isDropdownOpen && <div className="modal-backdrop fade show"></div>}


        {/* <Button variant="primary">Primary</Button> */}



      </div>

    </div>
  );
}

export default App;
