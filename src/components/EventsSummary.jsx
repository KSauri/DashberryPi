import React from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';

export default function EventsSummary({ isLoading, data }) {
  let content;
  if(isLoading) {
    content = (
      <Panel className='events-panel'><i className="fa fa-refresh fa-spin fa-fw"></i></Panel>
    );
  } else if (data.length === 0) {
    content = (<Panel className='events-panel'><i className="fa fa-calendar-check-o"></i> No upcoming events.</Panel>)
  } else {
    content = (
      <div>
        <h6>Today's Schedule</h6>
        {data.slice(0,3).map(event => {
          return (
            <Panel className='events-panel' key={event.id}>
              <p>{event.summary}</p>
              <p>{moment(event.start.dateTime).format('MMMM Do, h:mm A')}</p>
            </Panel>);
        })}
      </div>);
  }
  return content;
}
