db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "airplane",
    },
  },
  {
    $project: {
      _id: 0,
      name: 1,
      airplane: "$airplane.airplane",
    },
  },
  {
    $unwind: "$airplane",
  },
  {
    $match: {
      airplane: /380 | 747/,
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
