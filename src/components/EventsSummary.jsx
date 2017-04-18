import React from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';

export default function EventsSummary({ isLoading, data }) {
  console.log(isLoading, data);
  let content;
  if(isLoading) {
    content = (
      <Panel><i className="fa fa-refresh fa-spin fa-fw"></i></Panel>
    );
  } else if (data.length === 0) {
    content = (<Panel><i className="fa fa-calendar-check-o"></i> No upcoming events.</Panel>)
  } else {
    content = (<div>
      {data.map(event => {
        return (
          <Panel key={event.id}>
            {`${event.summary} - ${moment(event.start.dateTime).format('MMMM Do, h:mm:ss a')}`}
          </Panel>);
      })}
    </div>);
  }
  return content;
}
