import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Form from "./Form";
import LinkList from "./LinkList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> JetFuel</h1>
        <Form />
        <LinkList />
      </div>
    );
  }
}

export default App;
