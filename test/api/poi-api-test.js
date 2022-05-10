import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, maggieCredentials, stoneBridge, testPois, bridges } from "../fixtures.js";

suite("Poi API tests", () => {
  let user = null;
  let bridgesCategory = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllPois();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    bridges.userid = user._id;
    bridgesCategory = await placemarkService.createCategory(bridges);
  });

  teardown(async () => {});

  test("create poi", async () => {
    const returnedPoi = await placemarkService.createPoi(bridgesCategory._id, stoneBridge);
    assertSubset(bridges, returnedPoi);
  });

  test("create Multiple pois", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoi(bridgesCategory._id, testPois[i]);
    }
    const returnedPois = await placemarkService.getAllPois();
    assert.equal(returnedPois.length, testPois.length);
    for (let i = 0; i < returnedPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const poi = await placemarkService.getPoi(returnedPois[i]._id);
      assertSubset(poi, returnedPois[i]);
    }
  });

  test("Delete Poi Api", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoi(bridgesCategory._id, testPois[i]);
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

  test("denormalised category", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoi(bridgesCategory._id, testPois[i]);
    }
    const returnedCategory = await placemarkService.getCategory(bridgesCategory._id);
    assert.equal(returnedCategory.pois.length, testPois.length);
    for (let i = 0; i < testPois.length; i += 1) {
      assertSubset(testPois[i], returnedCategory.pois[i]);
    }
  });
});
