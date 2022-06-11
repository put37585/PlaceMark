import { PoiSpec, CategorySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const admindashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      console.log(users)
      const viewData = {
        title: "PlaceMark Admindashboard",
        user: loggedInUser,
        users: users,
      };
      return h.view("admindashboard-view", viewData);
    },
  },
  deleteUser: {
    handler: async function (request, h) {
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/admindashboard");
    },
  },
};
