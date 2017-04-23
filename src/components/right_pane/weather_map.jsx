import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class WeatherMap extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let _mapOptions = {
      center: {lat: 41.9028,
        lng: 12.4964},
      zoom: 17,
    };

    this.map = new google.maps.Map(this.mapNode, _mapOptions);
  }
  render() {
    return <div style={{height:"300px"}}  className="map" id="weather-map" ref={ map => this.mapNode = map }>Map</div>;
  }
}

export default WeatherMap;
