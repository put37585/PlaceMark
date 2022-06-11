export const seedData = {
  users: {
    admin: {
      firstName: "ADMIN",
      lastName: "ADMIN",
      email: "ADMIN@ADMIN.com",
      isAdmin: true,
      password: "admin"
    },
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    }
  },
  categories: {
    _model: "Category",
    bridges: {
      title: "Nice Bridges",
      userid: "->users.homer"
    },
    lakes: {
      title: "Nice Lakes",
      userid: "->users.homer"
    }
  },
  pois: {
    _model : "Poi",
    track_1 : {
      name: "Stone Bridge",
      description: "Stone Bridge (Regensburg)",
      latitude: 49,
      longitude: 12,
      categoryid: "->categories.bridges"
    },
  }
};
