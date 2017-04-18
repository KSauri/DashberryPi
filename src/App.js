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
      durationNow: "",
      durationNormal: "",
      arrivalNow: "",
      arrivalNormal: "",
      eventData: {
        isLoading: true
      }
    };
    this.getEventData();
  }

  async getTransit() {
    let gt = new GoogleTransit("3 Old Army Road, Bernardsville","160 Varick Street, New York",7);
    let data = await gt.getData();
    this.setState({ durationNow: data.durationNow,
      durationNormal: data.durationNormal,
      arrivalNow: data.arrivalNow,
      arrivalNormal: data.arrivalNormal });
  }

  componentDidMount() {
    this.getTransit();
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
          <Transit durationNow={ this.state.durationNow }
            durationNormal={ this.state.durationNormal }
            arrivalNormal={ this.state.arrivalNormal }
            arrivalNow={ this.state.arrivalNow }/>
        </Col>
      </div>
    );
  }
}

export default App;
