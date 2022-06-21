import { PoiSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const poiController = {
  index: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.poiid);
      const viewData = {
        title: "Poi",
        poi: poi,
      };
      return h.view("poi-view", viewData);
    },
  },
  edit: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.poiid);
      const viewData = {
        title: "Edit Poi",
        poi: poi,
      };
      return h.view("edit-poi-view", viewData);
    },
  },
  update: {
    validate: {
      payload: PoiSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const poi = await db.poiStore.getPoiById(request.params.poiid);
        return h.view("edit-poi-view", { title: "Edit poi error", poi: poi, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const categoryId = request.params.id;
      const newPoi = {
        _id: request.params.poiid,
        name: request.payload.name,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.poiStore.updatePoi(newPoi);
      return h.redirect(`/category/${categoryId}/poi/${newPoi._id}`);
    },
  },
  uploadImage: {
    handler: async function (request, h) {
      const categoryId = request.params.id;
      const poiId = request.params.poiid;
      try {
        const poi = await db.poiStore.getPoiById(poiId);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(file);
          if (!poi.img) {
            poi.img = [];
          }
          poi.img.push(url);
          await db.poiStore.updatePoi(poiId, poi);
        }
        return h.redirect(`/category/${categoryId}/poi/${poiId}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/category/${categoryId}/poi/${poiId}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  // updateImage: {
  //   handler: async function(request, h) {
  //     const categoryId = request.params.id;
  //     const poi = await db.poiStore.getPoiById(request.params.poiid);
  //     try {
  //       const file = request.payload.imagefile;
  //       await imageStore.deleteImage(poi.img);
  //       if (Object.keys(file).length > 0) {
  //         const url = await imageStore.uploadImage(request.payload.imagefile);
  //         poi.img = url;
  //         db.poiStore.updatePoi(poi);
  //       }
  //       return h.redirect(`/category/${categoryId}/poi/${poi._id}`);
  //     } catch (err) {
  //       console.log(err);
  //       return h.redirect(`/category/${categoryId}/poi/${poi._id}`);
  //     }
  //   },
  //   payload: {
  //     multipart: true,
  //     output: "data",
  //     maxBytes: 209715200,
  //     parse: true
  //   }
  // },
};
