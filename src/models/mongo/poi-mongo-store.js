import { Poi } from "./poi.js";
import { Category } from "./category.js";

export const poiMongoStore = {
  async getAllPois() {
    const pois = await Poi.find().lean();
    return pois;
  },

  async addPoi(categoryId, poi) {
    poi.categoryid = categoryId;
    const newPoi = new Poi(poi);
    const poiObj = await newPoi.save();
    return this.getPoiById(poiObj._id);
  },

  async getPoisByCategoryId(id) {
    const pois = await Poi.find({ categoryid: id }).lean();
    return pois;
  },

  async getPoiById(id) {
    if (id) {
      const poi = await Poi.findOne({ _id: id }).lean();
      return poi;
    }
    return null;
  },

  async deletePoiById(id) {
    try {
      await Poi.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPois() {
    await Poi.deleteMany({});
  },

  async updatePoi(poiId, updatedPoi) {
    const poi = await Poi.findOne({ _id: poiId });
    poi.name = updatedPoi.name;
    poi.description = updatedPoi.description;
    poi.latitude = updatedPoi.latitude;
    poi.longitude = updatedPoi.longitude;
    if (updatedPoi.img) {
      poi.img = updatedPoi.img;
    }
    const poiObj = await poi.save();
    return this.getPoiById(poiObj._id);
  },
};
