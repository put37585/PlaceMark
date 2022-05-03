import { PoiFromCatSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const categoryId = request.params.id
      const category = await db.categoryStore.getCategoryById(categoryId);
      const pois = await db.poiStore.getPoisByCategoryId(categoryId)
      const viewData = {
        title: "Category",
        category: category,
        pois: pois,
      };
      return h.view("category-view", viewData);
    },
  },

  addPoi: {
    validate: {
      payload: PoiFromCatSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const categoryId = request.params.id
        const category = await db.categoryStore.getCategoryById(categoryId);
        const pois = await db.poiStore.getPoisByCategoryId(categoryId)
        const viewData = {
          title: "Add poi error",
          category: category,
          pois: pois,
          errors: error.details,
        };
        return h.view("category-view", viewData ).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newPoI = {
        userid: loggedInUser._id,
        name: request.payload.name,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.poiStore.addPoi(category._id, newPoI);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deletePoi: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.poiStore.deletePoiById(request.params.poiid);
      return h.redirect(`/category/${category._id}`);
    },
  },
};
