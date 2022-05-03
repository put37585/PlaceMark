import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/pois.json"));
db.data = { pois: [] };

export const poiJsonStore = {
  async getAllPois() {
    await db.read();
    return db.data.pois;
  },

  async addPoi(categoryId, poi) {
    await db.read();
    poi._id = v4();
    poi.categoryid = categoryId;
    db.data.pois.push(poi);
    await db.write();
    return poi;
  },
  async getPoisByCategoryId(id) {
    await db.read();
    return db.data.pois.filter((p) => p.categoryid === id);
  },
  
  async getUserPois(userid) {
    await db.read();
    return db.data.pois.filter((p) => p.userid === userid);
  },

  async getPoiById(id) {
    await db.read();
    let poi = db.data.pois.find((p) => p._id === id);
    if (poi === undefined) {
      poi = null;
    }
    return poi
  },

  async deletePoiById(id) {
    await db.read();
    const index = db.data.pois.findIndex((p) => p._id === id);
    if (index !== -1) db.data.pois.splice(index, 1);
    await db.write();
  },

  async deleteAllPois() {
    db.data.pois = [];
    await db.write();
  },

  async updatePoi(poi, updatedPoi) {
    poi.name = updatedPoi.name;
    poi.description = updatedPoi.description;
    poi.latitude = updatedPoi.latitude;
    poi.longitude = updatedPoi.longitude;
    await db.write();
  },
};
