import rp from 'request-promise';
import moment from 'moment';


export default class GoogleTransit {
  constructor(origin, destination, departTime) {
    this.origin = origin;
    this.destination = destination;
    this.departTime = departTime;
  }

  getDepartTimeUnixEpoch () {
    let now = moment().valueOf();
    let departTimeToday = moment().startOf('day').add(this.departTime, 'h').valueOf()/1000;
    let departTimeTomorrow = moment().startOf('day').add(this.departTime + 24, 'h').valueOf()/1000;
    if (now > departTimeToday) {
      return departTimeTomorrow;
    } else {
      return departTimeToday;
      }
  }
  async getData() {
    const normal = await this.getDataDepartNormal();
    const now = await this.getDataDepartNow();
    return {
      distance: normal.routes[0].legs[0].distance.text,
      durationNow: now.routes[0].legs[0].duration.text,
      arrivalNow: now.routes[0].legs[0].arrivaltime.text,
      durationNormal: normal.routes[0].legs[0].duration.text,
      arrivalNormal: normal.routes[0].legs[0].arrivaltime.text,
    };
  }
  async getDataDepartNormal() {
    try {
      let data = await rp({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/directions/json?` +
          `origin=${this.origin}&destination=${this.destination}&` +
          `departuretime=${this.getDepartTimeUnixEpoch()}&mode=transit` +
          `&key=AIzaSyCyVBmd0JigVvVazx5O6e3OHwopFn0tklY`,
        json: true
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async getDataDepartNow() {
    try {
      let data = await rp({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/directions/json?` +
          `origin=${this.origin}&destination=${this.destination}&` +
          `mode=transit&key=AIzaSyCyVBmd0JigVvVazx5O6e3OHwopFn0tklY`,
        json: true
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  }

}
