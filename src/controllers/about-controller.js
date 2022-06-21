export const aboutController = {
  index: {
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials; 
      const viewData = {
        title: "About Playtime",
        user: loggedInUser
      };
      return h.view("about-view", viewData);
    },
  },
};
