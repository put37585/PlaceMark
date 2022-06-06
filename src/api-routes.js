import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { poiApi } from "./api/poi-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "GET", path: "/api/categories", config: categoryApi.find },
  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },
  { method: "GET", path: "/api/categories/foruser/{id}", config: categoryApi.findUser },

  { method: "GET", path: "/api/pois", config: poiApi.find },
  { method: "GET", path: "/api/pois/{id}", config: poiApi.findOne },
  { method: "PUT", path: "/api/pois/{id}", config: poiApi.update },
  { method: "POST", path: "/api/categories/{id}/pois", config: poiApi.create },
  { method: "DELETE", path: "/api/pois", config: poiApi.deleteAll },
  { method: "DELETE", path: "/api/pois/{id}", config: poiApi.deleteOne },
  { method: "POST", path: "/api/pois/{id}/image", config: poiApi.uploadImage },
  { method: "POST", path: "/api/pois/{id}/image/delete", config: poiApi.deleteImage },
  // { method: "POST", path: "/api/pois/{id}/updateimage", config: poiApi.updateImage },
];
