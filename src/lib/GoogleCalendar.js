import google from 'googleapis';
import Promise from 'bluebird';
// import key from '../../creds/google-calendar.json';

// export default class GoogleCalendar {
//   constructor() {
//   }
//   async getAuthorizedClient() {
//     const jwtClient = new google.auth.JWT(
//       key.client_email,
//       null,
//       key.private_key,
//       'https://www.googleapis.com/auth/calendar',
//       null
//     );
//
//     await new Promise((resolve, reject) => {
//       jwtClient.authorize((err, result) => {
//         if(err) {
//           reject(err);
//         }
//         resolve(result);
//       });
//     });
//     return jwtClient;
//   }
//   async getList(client) {
//     return Promise.promisify();
//   }
//   async getData() {
//     try {
//       let client = await this.getAuthorizedClient();
//       // console.log(client);
//       let list = await google.calendar('v3').calendarList.list({
//         auth: client
//       });
//       // console.log(list);
//     } catch (err) {
//       // console.error(err);
//     }
//     // console.log(google.calendar('v3').calendarList.list());
//   }
// }
