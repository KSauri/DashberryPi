import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import logo from './logo.svg';
import './css/App.css';
import APIController from './lib/APIController.js';
import Transit from './components/right_pane/commute_information/transit';
import GoogleTransit from './lib/GoogleTransit';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transit: "apples"
    };
  }

  getTransit() {
    let gt = new GoogleTransit("3 Old Army Road, Bernardsville","160 Varick Street, New York");
    gt.getParsedDuration().then(distance =>
      this.setState({ transit: distance }));
  }

  componentDidMount() {
    this.getTransit();
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
          <Transit distance={ this.state.transit } />
        </Col>
      </div>
    );
  }
}

export default App;
