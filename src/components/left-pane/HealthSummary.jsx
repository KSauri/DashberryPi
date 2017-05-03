import React from 'react';
import Fitbit from '../../lib/Fitbit.js';
import StepCount from './StepCount.jsx';

export default class HealthSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      stepCount: 0
    }
    this.getData();
  }
  async getData() {
    const fitbit = new Fitbit();
    try {
      let data = await fitbit.getData();
      this.setState({
        isLoading: false,
        stepData: data
      })
    } catch (err) {
      this.setState({
        isLoading: false,
        error: true,
        errorMessage: err.message
      })
    }
  }
  render() {
    return (
      <div>
        <h4 className="white-header">Steps Per Day</h4>
        <StepCount
          isLoading={this.state.isLoading}
          stepData={this.state.stepData}
          error={this.state.error}
          errorMessage={this.state.errorMessage}
        />
      </div>
    )
  }
}
