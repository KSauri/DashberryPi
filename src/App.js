import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import logo from './logo.svg';
import './css/App.css';
import APIController from './lib/APIController.js';

class App extends Component {
  constructor(props) {
    super(props);
    APIController.getAllData(this.setState);
    this.Calucate
  }
  getWeatherMap() {

  }
  render() {
    return (
      <div className="App">
        <h1>Holy Butt Dashboard</h1>
        <Col sm={4}>
          <h3>Subheader </h3>
        </Col>
        <Col sm={4}>
          <h3>Subheader </h3>
        </Col>
        <Col sm={4}>
          <h3>Subheader </h3>
        </Col>
      </div>
    );
  }
}

export default App;
