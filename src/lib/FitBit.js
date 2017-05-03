import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import electron from 'electron';
import FitbitApiClient from 'fitbit-node';
import moment from 'moment';

const BrowserWindow = electron.remote.BrowserWindow;

Promise.promisifyAll(fs);

export default class FitBit {
  constructor() {
    this.client = new FitbitApiClient(
      process.env.FITBIT_CLIENT_ID,
      process.env.FITBIT_CLIENT_SECRET
    );
  }
  async getData() {
    const tokenData = await this.getApiToken();
    const data = await this.client.get(
      `/activities/steps/date/today/7d.json`,
      tokenData.access_token,
      tokenData.user_id
    );
    if (!data[0] || data[0].errors && data[0].errors[0]) {
      throw new Error(data[0].errors[0].message)
    }

    return data[0]['activities-steps'];
  }
  async getApiToken() {
    const dataPath = path.join(electron.remote.app.getPath('userData'), 'fitbit.json');
    let data;
    try {
      data = JSON.parse(await fs.readFileAsync(dataPath, {encoding: 'utf8'}));
    } catch (err) {
      // the file doesn't exist
    }
    if (!data) {
      data = await this.getNewToken()
      await fs.writeFileAsync(dataPath, JSON.stringify(data));
    } else if (data.expires_at < moment().valueOf()) {
      data = await this.getNewToken(data.access_token, data.refresh_token);
      await fs.writeFileAsync(dataPath, JSON.stringify(data));
    }
    return data;
  }
  async getNewToken(accessToken, refreshToken) {
    let tokenData;
    if(!refreshToken) {
      let authCode = await this.getAuthCode();
      tokenData = await this.client.getAccessToken(authCode, 'http://localhost:8080');
    } else {
      tokenData = await this.client.refreshAccessToken(accessToken, refreshToken);
    }
    tokenData.expires_at = moment().add(tokenData.expires_in).valueOf();
    return tokenData;

  }
  async getAuthCode() {
    const authWindow = new BrowserWindow();
    const url = this.client.getAuthorizeUrl('activity nutrition', 'http://localhost:8080');
    const codeRegex = /localhost:8080\/\?code=(.*)#/;

    return new Promise( (resolve, reject) => {
      const checkUrlAndClose = (next) => {
        const parsedString = codeRegex.exec(next);
        if ( parsedString !== null ) {
          resolve(parsedString[1]);
          authWindow.close();
        }
      }
      authWindow.webContents.on('will-navigate', (event, next) => checkUrlAndClose(next) );
      authWindow.webContents.on('did-get-redirect-request', (event, old, next) => checkUrlAndClose(next) );

      authWindow.loadURL(url);
    });
  }
}
