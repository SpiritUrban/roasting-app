import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import './custom.scss';
// import Button from 'react-bootstrap/Button';

import OffcanvasNav from './components/OffcanvasNav';



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

        {isDropdownOpen && <div className="modal-backdrop fade show"></div>}

        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />      <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />      <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />
        <Counter />


        {/* <Button variant="primary">Primary</Button> */}


        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>

    </div>
  );
}

export default App;
