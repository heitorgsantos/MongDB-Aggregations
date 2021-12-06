const actors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $project: {
      _id: 0,
      num_favs: { $size: { $cond: {
        if: { $isArray: "$cast" },
        then: { $setIntersection: [actors, "$cast"] },
        else: [],
      } } },
      title: 1,
      "tomatoes.viewer.rating": 1,
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
  {
    $project: {
      title: 1,
    },
  },
]);
