import Promise from 'bluebird';
import rp from 'request-promise';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import qs from 'query-string';
import electron from 'electron';
import google from 'googleapis';
import moment from 'moment';

const electronGoogleOauth = electron.remote.require('electron-google-oauth');
const calendarAPI = google.calendar('v3');

Promise.promisifyAll(calendarAPI.calendarList);
Promise.promisifyAll(calendarAPI.events);
Promise.promisifyAll(fs);


export default class GoogleCalendar {
  async getData() {
    const token = await this.getToken();
    const auth = this.getAuthClient(token);

    const calendarListReponse = await calendarAPI.calendarList.listAsync({
      auth
    });
    const calendars = calendarListReponse.items.filter( calendar => calendar.accessRole === 'owner' );

    const events = await Promise.map(calendars, async (calendar) => {
      let currentCalEvents = await calendarAPI.events.listAsync({
        calendarId: calendar.id,
        timeMin: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
        timeMax: moment().add(1, 'days').seconds(0).minutes(0).hours(0).format("YYYY-MM-DDTHH:mm:ssZ"),
        auth
      });
      return currentCalEvents.items;
    });

    return _.flatten(events);
  }
  async getToken() {
    const dataPath = path.join(electron.remote.app.getPath('userData'), 'google-events.json');
    let tokenData;
    try {
      tokenData = JSON.parse(await fs.readFileAsync(dataPath));
    } catch (err) {
      tokenData = false;
    }
    if (!tokenData || new Date(tokenData.expires) < new Date()) {
      tokenData = await this.getNewToken();
      await fs.writeFileAsync(dataPath, JSON.stringify(tokenData));
    }
    return tokenData;
  }

  async getNewToken() {
    const googleOauth = electronGoogleOauth();
    var scopes = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'];
    // retrieve access token and refresh token
    const result = await googleOauth.getAccessToken(
      scopes,
      process.env.GOOGLE_EVENTS_CLIENT_ID,
      process.env.GOOGLE_EVENTS_CLIENT_SECRET
    );

    return result;
  }

  getAuthClient(token) {
    var oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_EVENTS_CLIENT_ID,
      process.env.GOOGLE_EVENTS_CLIENT_SECRET
    );
    // Retrieve tokens via token exchange explained above or set them:
    oauth2Client.setCredentials(token);
    return oauth2Client;
  }
}
