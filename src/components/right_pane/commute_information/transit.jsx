import React, { Component } from 'react';
import GoogleTransit from '../../../lib/GoogleTransit';
import { Panel } from 'react-bootstrap';

class Transit extends Component {
  constructor(props) {
    super(props);
  }

  spinner() {
    return <Panel><i className="fa fa-refresh fa-spin fa-fw"></i></Panel>
  }

  render() {
    if (!(this.props.data.arrivalNow)) {
      return this.spinner();
    } else {
      return (
        <Panel>
          <div className="transit">
            <h4>Leave Now: { this.props.data.durationNow } </h4>
            <h4>Arrival Now: { this.props.data.arrivalNow } </h4>
            <h4>Leave Normal: { this.props.data.durationNormal } </h4>
            <h4>Arrival Normal: { this.props.data.arrivalNormal } </h4>
          </div>
        </Panel>
      );
    }
  }
}

export default Transit;
