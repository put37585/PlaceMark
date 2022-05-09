import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, stoneBridge, testPois, bridges } from "../fixtures.js";

suite("Poi API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllPois();
    user = await placemarkService.createUser(maggie);
    stoneBridge.userid = user._id;
    beethovenSonatas = await placemarkService.createCategory(stoneBridge);
  });

  teardown(async () => {});

  test("create poi", async () => {
    const returnedPoi = await placemarkService.createPoi(beethovenSonatas._id, bridges);
    assertSubset(bridges, returnedPoi);
  });

  test("create Multiple pois", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoi(beethovenSonatas._id, testPois[i]);
    }
    const returnedPois = await placemarkService.getAllPois();
    assert.equal(returnedPois.length, testPois.length);
    for (let i = 0; i < returnedPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const poi = await placemarkService.getPoi(returnedPois[i]._id);
      assertSubset(poi, returnedPois[i]);
    }
  });

  test("Delete PoiApi", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoi(beethovenSonatas._id, testPois[i]);
    }
    let returnedPois = await placemarkService.getAllPois();
    assert.equal(returnedPois.length, testPois.length);
    for (let i = 0; i < returnedPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const poi = await placemarkService.deletePoi(returnedPois[i]._id);
    }
    returnedPois = await placemarkService.getAllPois();
    assert.equal(returnedPois.length, 0);
  });

  test("denormalised playlist", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoi(beethovenSonatas._id, testPois[i]);
    }
    const returnedCategory = await placemarkService.getCategory(beethovenSonatas._id);
    assert.equal(returnedCategory.pois.length, testPois.length);
    for (let i = 0; i < testPois.length; i += 1) {
      assertSubset(testPois[i], returnedCategory.pois[i]);
    }
  });
});
