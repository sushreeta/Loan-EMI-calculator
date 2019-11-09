import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import InterestCalculator from './components/loanInterest/InterestCalculator'
// import logo from './logo.svg';
import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h2>Loan Interest Calculator</h2>
          <div className="App-slider">
            <InterestCalculator/>  
          </div>
          
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
