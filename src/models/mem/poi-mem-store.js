import { v4 } from "uuid";

let pois = [];

export const poiMemStore = {
  async getAllPois() {
    return pois;
  },

  async addPoi(poi) {
    poi._id = v4();
    pois.push(poi);
    return poi;
  },
  
  async getUserPois(userid) {
    return pois.filter((poi) => poi.userid === userid);
  },

  async getPoiById(id) {
    let poi = pois.find((p) => p._id === id);
    if (p === undefined) {
      poi = null;
    }
    return poi;
  },

  async deletePoiById(id) {
    const index = pois.findIndex((p) => p._id === id);
    if (index !== -1) pois.splice(index, 1);
  },

  async deleteAllPois() {
    pois = [];
  },

  async updatePoi(poi, updatedPoi) {
    poi.title = updatedPoi.title;
    poi.artist = updatedPoi.artist;
    poi.duration = updatedPoi.duration;
  },
};
