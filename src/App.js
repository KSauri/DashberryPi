import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import APIController from './lib/APIController.js';
import Transit from './components/right_pane/commute_information/transit';
import GoogleTransit from './lib/GoogleTransit';
import EventsSummary from './components/EventsSummary';
import GoogleCalendar from './lib/GoogleCalendar.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitData: {
        isLoading: true
      },
      eventData: {
        isLoading: true
      }
    };
    this.getEventData();
  }

  async getTransitData() {
    let gt = new GoogleTransit("3 Old Army Road, Bernardsville","160 Varick Street, New York",7);
    let data = await gt.getData();
    this.setState({
      transitData: {
      isLoading: false,
      data
      }
    });
  }

  componentDidMount() {
    this.getTransitData();
  }

  async getEventData() {
    const gc = new GoogleCalendar();
    let data = await gc.getData();
    this.setState({
      eventData: {
        isLoading: false,
        data
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Holy Butt Dashboard</h1>
        <Col sm={4}>
          <h3>Subheader </h3>
        </Col>
        <Col sm={4}>
          <EventsSummary isLoading={this.state.eventData.isLoading} data={this.state.eventData.data || []} />
        </Col>
        <Col sm={4}>
          <Transit isLoading={this.state.transitData.isLoading} data={this.state.transitData.data || []}/>
        </Col>
      </div>
    );
  }
}

export default App;
