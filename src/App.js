import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import GoogleCalendar from './lib/GoogleCalendar.js';
import RssReader from './lib/RssReader.js';
import EventsSummary from './components/EventsSummary.jsx';
import NewsSummary from './components/NewsSummary.jsx';
import getRandomImage from './lib/getRandomImage.js';
import Transit from './components/right_pane/commute_information/transit';
import GoogleTransit from './lib/GoogleTransit';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitData: {
        isLoading: true
      },
      eventData: {
        isLoading: true,
        data: []
      },
      bbc: {
        isLoading: true,
        data: {}
      },
      wnyc: {
        isLoading: true,
        data: {}
      },
      nyt: {
        isLoading: true,
        data: {}
      }
    };
    this.getEventData();
    this.getTopStories();
    this.setBackground();
    this.getTransitData();
  }
  async getTopStories() {
    const sources = {
      'BBC': 'http://feeds.bbci.co.uk/news/rss.xml?edition=us',
      'NYT': 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
      'WNYC': 'http://www.wnyc.org/feeds/all/'
    };
    Object.keys(sources).forEach(async (source) => {
      const reader = new RssReader(sources[source]);
      const data = await reader.getLatest();
      this.setState({
        [source.toLowerCase()] : {
          isLoading: false,
          data
        }
      })
    })
  }

  async getTransitData() {
    let gt = new GoogleTransit("3 Old Army Road, Bernardsville","160 Varick Street, New York",7);
    let data = await gt.getData();
    this.setState({
      transitData: {
      isLoading: false,
      data
      }
    });
  }

  async getEventData() {
    const gc = new GoogleCalendar();
    let data = await gc.getData();
    this.setState({
      eventData: {
        isLoading: false,
        data
      }
    });
  }



  async setBackground() {
    const image = await getRandomImage();
    document.body.style = `background-image: url(${image});background-size:cover;`;
  }
  render() {
    return (
      <div className="App">
        <Col sm={4}>
          <h3>Subheader </h3>
        </Col>
        <Col sm={4}>
        </Col>
        <NewsSummary source='BBC' data={this.state.bbc.data} isLoading={this.state.bbc.isLoading} />
        <NewsSummary source='NYT' data={this.state.nyt.data} isLoading={this.state.nyt.isLoading} />
        <NewsSummary source='WNYC' data={this.state.wnyc.data} isLoading={this.state.wnyc.isLoading} />
        <EventsSummary isLoading={this.state.eventData.isLoading} data={this.state.eventData.data} />
        <Col sm={4}>
          <Transit isLoading={this.state.transitData.isLoading} data={this.state.transitData.data || []}/>
        </Col>
      </div>
    );
  }
}

export default App;
