import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
import { IdSpec, PoiSpec, PoiSpecPlus, PoiArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const poiApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const pois = await db.poiStore.getAllPois();
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PoiArraySpec, failAction: validationError },
    description: "Get all poiApi",
    notes: "Returns all poiApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi) {
          return Boom.notFound("No poi with this id");
        }
        return poi;
      } catch (err) {
        return Boom.serverUnavailable("No poi with this id");
      }
    },
    tags: ["api"],
    description: "Find a Poi",
    notes: "Returns a poi",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PoiSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.addPoi(request.params.id, request.payload);
        if (poi) {
          return h.response(poi).code(201);
        }
        return Boom.badImplementation("error creating poi");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a poi",
    notes: "Returns the newly created poi",
    validate: { payload: PoiSpec },
    response: { schema: PoiSpecPlus, failAction: validationError },
  },
  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.updatePoi(request.params.id, request.payload);
        if (poi) {
          return h.response(poi).code(201);
        }
        return Boom.badImplementation("error updating poi");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a poi (excluding image)",
    notes: "Returns the updated created poi",
    validate: { payload: PoiSpec },
    response: { schema: PoiSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const deletedCategory = await db.poiStore.deleteAllPois();
        return h.response(deletedCategory).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all poiApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi) {
          return Boom.notFound("No Poi with this id");
        }
        await db.poiStore.deletePoiById(poi._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Poi with this id");
      }
    },
    tags: ["api"],
    description: "Delete a poi",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (request.payload.file.length > 0) {
          const url = await imageStore.uploadImage(request.payload.file);
          if (!poi.img) {
            poi.img = [];
          }
          poi.img.push(url);
          await db.poiStore.updatePoi(request.params.id, poi);
        }
        return h.response(poi).code(201);
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Error while uploading the image");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
    tags: ["api"],
    description: "Upload a image to a poi",
  },

  deleteImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const imgUrl = request.payload.imageUrl;
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi.img) {
          return h.response().code(204);
        }
        await imageStore.deleteImage(imgUrl);
        const found = poi.img.findIndex((img) => img === imgUrl);
        if (found !== -1) {
          poi.img.splice(found, 1);
        }
        await db.poiStore.updatePoi(request.params.id, poi);
        return h.response(poi).code(201);
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Error while uploading the image");
      }
    },
    tags: ["api"],
    description: "Delete a image from a poi",
  },
  // updateImage: {
  //   auth: {
  //     strategy: "jwt",
  //   },
  //   handler: async function (request, h) {
  //     try {
  //       const poi = await db.poiStore.getPoiById(request.params.id);
  //       if (request.payload.file.length > 0) {
  //         const url = await imageStore.uploadImage(request.payload.file);
  //         if (poi.img) {
  //           imageStore.deleteImage(poi.img);
  //         }
  //         poi.img = url;
  //         await db.poiStore.updatePoi(request.params.id, poi);
  //       }
  //       return h.response(poi).code(201);
  //     } catch (err) {
  //       console.log(err);
  //       return Boom.serverUnavailable("Error while uploading the image");
  //     }
  //   },
  //   payload: {
  //     multipart: true,
  //     output: "data",
  //     maxBytes: 209715200,
  //     parse: true,
  //   },
  //   tags: ["api"],
  //   description: "Update the image of a poi",
  // },
};
