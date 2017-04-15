import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import GoogleCalendar from './lib/GoogleCalendar.js';
import EventsSummary from './components/EventsSummary.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {
        isLoading: true
      }
    }
    this.getEventData();
  }
  async getEventData() {
    const gc = new GoogleCalendar();
    let data = await gc.getData();
    console.log(data);
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
          <h3>Subheader </h3>
        </Col>
      </div>
    );
  }
}

export default App;
