import { PoiSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const poiController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const poi = await db.poiStore.getPoiById(request.params.poiid);
      const viewData = {
        title: "Poi",
        category: category,
        poi: poi,
      };
      return h.view("poi-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PoiSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("poi-view", { title: "Edit poi error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.poiid);
      const newPoi = {
        name: request.params.name,
        description: request.params.description,
        latitude: request.params.latitude,
        longitude: request.params.longitude,
      };
      await db.poiStore.updatePoi(poi, newPoi);
      return h.redirect(`/category/${request.params.id}`);
    },
  },
  uploadImage: {
    handler: async function(request, h) {
      try {
        const categoryId = request.params.id;
        const poi = await db.poiStore.getPoiById(request.params.poiid);
        const file = request.payload.imagefile;
        console.log(file)
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          poi.img = url;
          db.poiStore.updatePoi(poi);
        }
        return h.redirect(`/category/${categoryId}/poi/${poi._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/category/${categoryId}/poi/${poi._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  }
};
