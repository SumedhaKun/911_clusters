import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './FileUpload';

function App() {
  const [images, setImages] = useState([]);
  return (
    <div className="App">
      <div className='container'>
        <h1 className='text-center'>Drag and Drop Test</h1>
        <FileUpload/>
      </div>
      
      {/* <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit blah blah <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
