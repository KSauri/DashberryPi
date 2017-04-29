import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class WeatherMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.loadMap = this.loadMap.bind(this);
  }

  addApiScript() {
    let fileref = document.createElement("script");
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${process.env.TRANSIT_KEY}`);
    console.log(process.env.TRANSIT_KEY);
    fileref.setAttribute("async", false);
    fileref.addEventListener('load', this.loadMap);
    document.getElementsByTagName("body")[0].appendChild(fileref);
  }

  componentDidMount() {
    this.addApiScript();
  }

  loadMap() {
    let _mapOptions = {
      center: {lat: 41.9028,
        lng: 12.4964},
        zoom: 17,
      };
    console.log(document.getElementById('map'));
    this.map = new google.maps.Map(document.getElementById('map'), _mapOptions);
    // this.setState({ loaded: true });
  }

  render() {
    return <div style={{height:"300px"}}  className="map" id="map" ref={ map => this.mapNode = map }>Map</div>;
  }
}

export default WeatherMap;
