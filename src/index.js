import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//FOR TESTING, REMOVE
if(window.location.href === 'http://localhost:3000/') {
    window.location = 'http://localhost:3000/?order=1';
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);