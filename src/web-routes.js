import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { poiController } from "./controllers/poi-controller.js";
import {admindashboardController} from "./controllers/admindashboard-controller.js"

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addpoi", config: dashboardController.addPoi },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addpoi", config: categoryController.addPoi },
  { method: "GET", path: "/category/{id}/deletepoi/{poiid}", config: categoryController.deletePoi },

  
  { method: "GET", path: "/category/{id}/poi/{poiid}", config: poiController.index },
  { method: "GET", path: "/category/{id}/poi/{poiid}/edit", config: poiController.edit },
  { method: "POST", path: "/category/{id}/poi/{poiid}/uploadimage", config: poiController.uploadImage },
  { method: "POST", path: "/category/{id}/poi/{poiid}/update", config: poiController.update }, 


  { method: "GET", path: "/admindashboard", config: admindashboardController.index },
  { method: "GET", path: "/admindashboard/deleteuser/{id}", config: admindashboardController.deleteUser},
];
