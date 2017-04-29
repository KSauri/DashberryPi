import React from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';
import GoogleCalendar from '../../lib/GoogleCalendar.js';

export default class EventsSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    }
    this.getEvents();
  }
  async getEvents() {
    const gc = new GoogleCalendar();
    try {
      let data = await gc.getData();
      this.setState({
        isLoading: false,
        data
      });
    } catch (err) {
      this.setState({
        error: true,
        errorMessage: err.message
      });
    }
  }
  getSpinner() {
    return  <Panel className='events-panel'><i className="fa fa-refresh fa-spin fa-fw"></i></Panel>
  }
  getEmptyEvents() {
    return <Panel className='events-panel'><i className="fa fa-calendar-check-o"></i> No upcoming events.</Panel>
  }
  getErrorMessage(message) {
    return (
      <Panel bsStyle="danger" className="text-danger">
        <i className="fa fa-exclamation fa-fw"></i> {message || "Something went wrong"}
      </Panel>
    );
  }
  render() {
    let content;
    let {
      error,
      errorMessage,
      isLoading,
      data
    } = this.state;
    if (error) {
      content = this.getErrorMessage(errorMessage);
    } else if(isLoading) {
      content = this.getSpinner();
    } else if (data.length === 0) {
      content = this.getEmptyEvents();
    } else {
      content = (
        <div>
          {data.slice(0,3).map(event => {
            return (
              <Panel className='events-panel' key={event.id}>
                <p>{event.summary}</p>
                <p>{moment(event.start.dateTime).format('MMMM Do, h:mm A')}</p>
              </Panel>
            );
          })}
        </div>
      )
    }
    return (
      <div>
        <h6 className="white-header">Today's Schedule</h6>
        {content}
      </div>
    );
  }
}
