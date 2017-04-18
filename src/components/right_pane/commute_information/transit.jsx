import React, { Component } from 'react';
import GoogleTransit from '../../../lib/GoogleTransit';


class Transit extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="transit">
        <h4>Travel Duration Now: { this.props.durationNow } </h4>
        <h4>Arrival Now: { this.props.arrivalNow } </h4>
        <h4>Travel Duration Normal: { this.props.durationNormal } </h4>
        <h4>Arrival Normal: { this.props.arrivalNormal } </h4>
      </div>
    );
  }
}

export default Transit;
