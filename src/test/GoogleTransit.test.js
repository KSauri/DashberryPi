import GoogleTransit from '../lib/GoogleTransit';


test('Should load transit data', async () => {
  let gt = new GoogleTransit("3 Old Army Road, Bernardsville","160 Varick Street, New York");
  return gt.getData();
})
test("Should return the right distance from B'ville to Varick", async () => {
  let gt = new GoogleTransit("3 Old Army Road, Bernardsville","160 Varick Street, New York");
  let distance = await gt.getParsedDistance();
  expect(distance).toBe("39.9 mi");
})
