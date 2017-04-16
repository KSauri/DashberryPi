import React, { Component } from 'react';
import GoogleTransit from '../../../lib/GoogleTransit';


class Transit extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="transit">
        <h4>Travel Duration: { this.props.distance } </h4>
      </div>
    );
  }
}

export default Transit;
