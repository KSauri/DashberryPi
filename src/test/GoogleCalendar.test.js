import GoogleCalendar from '../lib/GoogleCalendar';


test('Should load calendar data', async () => {
  const gc = new GoogleCalendar();
  const events = await gc.getData();
  events.forEach( event => expect(event.summary).toBeDefined() );
})

test('should get an access code ', async () => {
  const gc = new GoogleCalendar();
  const code = await gc.getNewToken();
})
// test('Should load calendar data', async () => {
//   return true;
// })
