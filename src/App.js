import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Challenge from './component/challenge';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">(Live) Stock App
        </header>
        <Challenge />
      </div>
    );
  }
}

export default App;
