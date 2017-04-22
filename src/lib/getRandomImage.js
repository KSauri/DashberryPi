import rp from 'request-promise';
import moment from 'moment';
import electron from 'electron';
import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';

Promise.promisifyAll(fs);


export default async function getRandomImage(forceNew) {

  const dataPath = path.join(electron.remote.app.getPath('userData'), 'unsplash-image.json');
  let unsplashData;
  try {
    unsplashData = JSON.parse(await fs.readFileAsync(dataPath));
  } catch (err) {
    unsplashData = false;
  }

  if (!unsplashData || forceNew || new Date(unsplashData.expiration) < new Date()) {
    unsplashData = await rp({
      uri: 'https://api.unsplash.com/photos/random',
      qs: {
        client_id: process.env.UNSPLASH_APP_ID,
        orientation: 'landscape',
        featured: true
      },
      json: true
    });
    unsplashData.expiration = moment().add(5, 'minutes').valueOf();
    await fs.writeFileAsync(dataPath, JSON.stringify(unsplashData));
  }
  return unsplashData.urls.regular;
}
