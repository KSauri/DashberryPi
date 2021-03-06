import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import EventsSummary from './components/center-pane/EventsSummary.jsx';
import NewsSummaries from './components/center-pane/NewsSummaries.jsx';
import getRandomImage from './lib/getRandomImage.js';
import Transit from './components/right-pane/commute_information/transit';
import HealthSummary from './components/left-pane/HealthSummary.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.setBackground();
  }
  async setBackground() {
    const image = await getRandomImage();
    document.body.style = `background-image: url(${image});background-size:cover;`;
  }
  render() {
    return (
      <div className="App">
        <Col sm={4}>
          <HealthSummary />
        </Col>
        <Col sm={4}>
          <NewsSummaries />
          <EventsSummary />
        </Col>
        <Col sm={4}>
          <Transit />
        </Col>
      </div>
    );
  }
}

export default App;
