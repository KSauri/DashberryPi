import rp from 'request-promise';
import parser from 'xml2js';
import Promise from 'bluebird';

Promise.promisifyAll(parser);

export default class RssReader {
  constructor(feedUrl) {
    this.feedUrl = feedUrl;
  }
  async getLatest() {
    const options = {
      uri: this.feedUrl,
      method: 'get',
      accepts:{
        xml:"application/rss+xml"
      },
      dataType:"xml",
    }

    const rawFeed = await rp(options);
    const parsedFeed = await parser.parseStringAsync(rawFeed);

    return  parsedFeed.rss.channel[0].item[0]
  }
}
