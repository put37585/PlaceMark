import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategories, testPois, bridges, nicePlaces, stoneBridge, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Poi Model tests", () => {

  let bridgesList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.poiStore.deleteAllPois();
    bridgesList = await db.categoryStore.addCategory(bridges);
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPois[i] = await db.poiStore.addPoi(bridgesList._id, testPois[i]);
    }
  });

  test("create single poi", async () => {
    const nicePlacesList = await db.categoryStore.addCategory(nicePlaces);
    const poi = await db.poiStore.addPoi(nicePlacesList._id, stoneBridge)
    assert.isNotNull(poi._id);
    assertSubset (stoneBridge, poi);
  });

  test("create multiple poiApi", async () => {
    const pois = await db.categoryStore.getCategoryById(bridgesList._id);
    assert.equal(testPois.length, testPois.length)
  });

  test("delete all poiApi", async () => {
    const pois = await db.poiStore.getAllPois();
    assert.equal(testPois.length, pois.length);
    await db.poiStore.deleteAllPois();
    const newPois = await db.poiStore.getAllPois();
    assert.equal(0, newPois.length);
  });

  test("get a poi - success", async () => {
    const nicePlacesList = await db.categoryStore.addCategory(nicePlaces);
    const poi = await db.poiStore.addPoi(nicePlacesList._id, stoneBridge)
    const newPoi = await db.poiStore.getPoiById(poi._id);
    assertSubset (stoneBridge, newPoi);
  });

  test("delete One Poi - success", async () => {
    const id = testPois[0]._id;
    await db.poiStore.deletePoiById(id);
    const pois = await db.poiStore.getAllPois();
    assert.equal(pois.length, testCategories.length - 1);
    const deletedPoi = await db.poiStore.getPoiById(id);
    assert.isNull(deletedPoi);
  });

  test("get a category - bad params", async () => {
    assert.isNull(await db.poiStore.getPoiById(""));
    assert.isNull(await db.poiStore.getPoiById());
  });

  test("delete One User - fail", async () => {
    await db.poiStore.deletePoiById("bad-id");
    const pois = await db.poiStore.getAllPois();
    assert.equal(pois.length, testCategories.length);
  });
});
