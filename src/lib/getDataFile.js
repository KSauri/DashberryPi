import path from 'path';
import fs from 'fs';
import electron from 'electron';

export default function getDataFile(fileName) {
  const dataPath = path.join(electron.remote.app.getPath('userData'), fileName);
  let tokenData;
  try {
    tokenData = JSON.parse(await fs.readFileAsync(dataPath));
  } catch (err) {
    tokenData = null;
  }
  return tokenData;
}
