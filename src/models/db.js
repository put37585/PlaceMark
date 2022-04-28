import { userMemStore } from "./mem/user-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";

export const db = {
  userStore: null,
  playlistStore: null,
  trackStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        break;
      default :
        this.userStore = userMemStore;
    }
  }
};
