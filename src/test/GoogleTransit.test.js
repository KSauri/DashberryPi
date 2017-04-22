import GoogleTransit from '../lib/GoogleTransit';


test('Should load transit data', async () => {
  let gt = new GoogleTransit("3 Old Army Road, Bernardsville","160 Varick Street, New York");
  return gt._getDataDepartNow();
})
test("Should return the right distance from B'ville to Varick", async () => {
  let gt = new GoogleTransit("3 Old Army Road, Bernardsville","160 Varick Street, New York");
  let distance = await gt.getParsedDistance();
  expect(distance).toBe("39.9 mi");
})
test("Log the time to leave now vs normal time", async () => {
  let gt = new GoogleTransit("3 Old Army Road, Bernardsville","160 Varick Street, New York", 9);
  let departNow = await gt.getParsedDurationNow();
  let departNormal = await gt.getParsedDurationNormal();
  console.log(departNow);
  console.log(departNormal);
  return true;
})
