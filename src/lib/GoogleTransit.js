import rp from 'request-promise';
import moment from 'moment';


export default class GoogleTransit {
  constructor(origin, destination, departTime) {
    this.origin = origin;
    this.destination = destination;
    this.departTime = departTime;
  }

  _getDepartTimeUnixEpoch () {
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
    const normal = await this._getDataDepartNormal();
    const now = await this._getDataDepartNow();
    return {
      distance: normal.routes[0].legs[0].distance.text,
      durationNow: now.routes[0].legs[0].duration.text,
      arrivalNow: now.routes[0].legs[0].arrival_time.text,
      durationNormal: normal.routes[0].legs[0].duration.text,
      arrivalNormal: normal.routes[0].legs[0].arrival_time.text,
    };
  }
  async _getDataDepartNormal() {
    try {
      let data = await rp({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/directions/json?` +
          `origin=${this.origin}&destination=${this.destination}&` +
          `departure_time=${this._getDepartTimeUnixEpoch()}&mode=transit` +
          `&key=AIzaSyCyVBmd0JigVvVazx5O6e3OHwopFn0tklY`,
        json: true
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async _getDataDepartNow() {
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


  // async getParsedDistance() {
  //   let rawData = await this._getDataDepartNow();
  //   return rawData.routes[0].legs[0].distance.text;
  // }
  // async getParsedDurationNormal() {
  //   let rawData = await this._getDataDepartNormal();
  //   return rawData.routes[0].legs[0].duration.text;
  // }
  // async getParsedDurationNow() {
  //   let rawData = await this._getDataDepartNow();
  //   return rawData.routes[0].legs[0].duration.text;
  // }
  // async getParsedArrivalNow() {
  //   let rawData = await this._getDataDepartNow();
  //   return rawData.routes[0].legs[0].arrival_time.text;
  // }
  // async getParsedArrivalNormal() {
  //   let rawData = await this._getDataDepartNormal();
  //   return rawData.routes[0].legs[0].arrival_time.text;
  // }
}
