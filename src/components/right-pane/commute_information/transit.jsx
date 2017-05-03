import React, { Component } from 'react';
import GoogleTransit from '../../../lib/GoogleTransit';
import { Panel, ListGroup, ListGroupItem, Col } from 'react-bootstrap';

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
    const { isLoading, hasError, errorMessage, data } = this.state;
    if (isLoading) {
      return this.spinner();
    } else if (hasError) {
      return this.getErrorMessage(errorMessage);
    } else {
      return (
        <Panel>
          <h5>Time to get to <b>160 Varick Street, New York</b></h5>
          <ListGroup fill className="transit">
            <ListGroupItem  >
              <div className="leave-time">
                <p>Leave Now</p>
              </div>
              <div className="leave-data">
                <p>{ data.durationNow }</p>
                <p>{ data.arrivalNow }</p>
              </div>
            </ListGroupItem>
            <ListGroupItem >
              <div className="leave-time">
                <p>Leave at 9 AM</p>
              </div>
              <div className="leave-data">
                <p>{ data.durationNormal }</p>
                <p>{ data.arrivalNormal }</p>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Panel>
      );
    }
  }
}

export default Transit;
