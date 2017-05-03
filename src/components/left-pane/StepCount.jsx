import React from 'react';
import { Panel } from 'react-bootstrap';
import BarChart from 'react-bar-chart';
import moment from 'moment';

export default function StepCount({ isLoading, stepData, error, errorMessage }) {
  let content;
  if (error) {
    content = (
      <Panel bsStyle="danger" className="text-danger">
        <i className="fa fa-exclamation fa-fw"></i> {errorMessage || "Something went wrong"}
      </Panel>
    )
  } else if(isLoading) {
    content = (
      <i className="fa fa-refresh fa-spin fa-fw"></i>
    );
  } else {
    const data = stepData.map( day => {
      return {
        text: moment(day.dateTime).format('ddd'),
        value: day.value
      }
    });
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    content = (
      <div>
        <BarChart
          margin={margin}
          width={200}
          height={150}
          data={data}
        />
      </div>
    );
  }

  return (
    <Panel>
      {content}
    </Panel>
  );
};
