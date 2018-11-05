import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Hand from './components/Hand/Hand';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hand numberOfPieces={11} />
      </div>
    );
  }
}

export default App;
