import React from 'react';
import NewsSummary from './NewsSummary.jsx';
import RssReader from '../../lib/RssReader.js';

export default class NewsSummaries extends React.Component {
  constructor(props) {
    super(props);
    this.sources = [{
      name: 'BBC',
      url: 'http://feeds.bbci.co.uk/news/rss.xml?edition=us'
    }, {
      name: 'NYT',
      url: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    }, {
      name: 'WNYC',
      url: 'http://www.wnyc.org/feeds/all/'
    }];
    this.state = {};
    this.sources.forEach( source => {
      this.state[source.name] = {
        isLoading: true,
        data: {}
      }
      this.loadDataForSource(source)
    });
  }
  async loadDataForSource(source) {
    const reader = new RssReader(source.url);
    try {
      const data = await reader.getLatest();
      this.setState({
        [source.name] : {
          isLoading: false,
          data
        }
      });
    } catch (err) {
      this.setState({
        [source.name] : {
          error: true,
          errorMessage: err.message
        }
      })
    }
    setTimeout( () => this.loadDataForSource(source), 100 * 60 * 5 );
  }
  render() {
    return (
      <div>
        {this.sources.map( source => {
          return <NewsSummary
            key={source.name}
            source={source.name}
            info={this.state[source.name]}
          />
        })}
      </div>
    )
  }
}
