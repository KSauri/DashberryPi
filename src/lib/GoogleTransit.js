import rp from 'request-promise';


export default class GoogleTransit {
  constructor(origin, destination) {
    this.origin = origin;
    this.destination = destination;
  }

  haveFun () {
    console.log("so fun");
  }

  async getData() {
    try {
      let data = await rp({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/directions/json?origin=${this.origin}&destination=${this.destination}&mode=transit&key=AIzaSyCyVBmd0JigVvVazx5O6e3OHwopFn0tklY`,
        json: true
      });
      console.log(data.routes[0].legs);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async getParsedDistance() {
    let rawData = await this.getData();
    return rawData.routes[0].legs[0].distance.text;
  }

  async getParsedDuration() {
    let rawData = await this.getData();
    return rawData.routes[0].legs[0].duration.text;
  }
}
