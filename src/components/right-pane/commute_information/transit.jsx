import React, { Component } from 'react';
import GoogleTransit from '../../../lib/GoogleTransit';
import { Panel } from 'react-bootstrap';

class Transit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    }
    this.getTransitData();
  }
  async getTransitData() {
    let gt = new GoogleTransit("3 Old Army Road, Bernardsville","160 Varick Street, New York",7);
    try {
      let data = await gt.getData();
      this.setState({
        isLoading: false,
        data
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        hasError: true,
        errorMessage: err.message
      })
    }
  }
  spinner() {
    return <Panel><i className="fa fa-refresh fa-spin fa-fw"></i></Panel>
  }
  getErrorMessage(message) {
    return (
      <Panel bsStyle="danger" className="text-danger">
        <i className="fa fa-exclamation fa-fw"></i> {message || "Something went wrong"}
      </Panel>
    );
  }
  render() {
    if (this.state.isLoading) {
      return this.spinner();
    } else if (this.state.hasError) {
      return this.getErrorMessage(this.state.errorMessage);
    } else {
      return (
        <Panel>
          <div className="transit">
            <h4>Leave Now: { this.state.data.durationNow } </h4>
            <h4>Arrival Now: { this.state.data.arrivalNow } </h4>
            <h4>Leave Normal: { this.state.data.durationNormal } </h4>
            <h4>Arrival Normal: { this.state.data.arrivalNormal } </h4>
          </div>
        </Panel>
      );
    }
  }
}

export default Transit;
