import { PoiSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

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
};
