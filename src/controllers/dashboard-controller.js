import { PoiSpec, CategorySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
      const viewData = {
        title: "PlaceMark Dashboard",
        user: loggedInUser,
        categories: categories,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPoi: {
    validate: {
      payload: PoiSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials; 
        const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
        const viewData = {
          title: "Add PoI error",
          user: loggedInUser,
          categories: categories, 
          errors: error.details 
        };
        return h.view("dashboard-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categoryId = request.payload.categoryid;
      const newPoI = {
        userid: loggedInUser._id,
        name: request.payload.name,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.poiStore.addPoi(categoryId, newPoI);
      return h.redirect(`/category/${categoryId}`);
    },
  },

  addCategory: {
    validate: {
      payload: CategorySpec,
      options: { abortEarly: false },
      
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials; 
        const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
        const viewData = {
          title: "Add Category error",
          user: loggedInUser,
          categories: categories, 
          errors: error.details 
        };
        return h.view("dashboard-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlayList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.categoryStore.addCategory(newPlayList);
      return h.redirect("/dashboard");
    },
  },

  deleteCategory: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.categoryStore.deleteCategoryById(category._id);
      return h.redirect("/dashboard");
    },
  },
};
