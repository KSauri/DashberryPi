import rp from 'request-promise';
import moment from 'moment';
import qs from 'qs';

export default class GoogleTransit {
  constructor(origin, destination, departTime) {
    this.origin = origin;
    this.destination = destination;
    this.departTime = departTime;
  }

  async getData() {
    const normal = await this.getDataDepartNormal();
    const now = await this.getDataDepartNow();
    let returnObject = {
      distance: normal.routes[0].legs[0].distance.text,
      durationNow: now.routes[0].legs[0].duration.text,
      arrivalNow: now.routes[0].legs[0].arrival_time.text,
      durationNormal: normal.routes[0].legs[0].duration.text,
      arrivalNormal: normal.routes[0].legs[0].arrival_time.text
    };
    return returnObject;
  }
  async getDataDepartNormal() {
    const departTime = this.getDepartTimeUnixEpoch();
    try {
      let data = await rp({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/directions/json?` +
          `origin=${this.origin}&destination=${this.destination}&` +
          `departure_time=${this.getDepartTimeUnixEpoch()}&mode=transit` +
          `&key=${process.env.TRANSIT_KEY}`,
        json: true
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  }


}
