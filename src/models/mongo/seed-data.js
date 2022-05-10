export const seedData = {
  users: {
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
    mozart: {
      title: "Nice Bridges",
      userid: "->users.marge"
    }
  },
  pois: {
    _model : "Poi",
    track_1 : {
      name: "Stone Bridge",
      description: "Stone Bridge (Regensburg)",
      latitude: 49,
      longitude: 12,
      playlistid: "->categories.mozart"
    },
  }
};
