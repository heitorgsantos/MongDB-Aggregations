db.trips.aggregate([
  {
    $addFields: {
      duracao: {
        $subtract: ["$stopTime", "startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: { $divide: ["$duracao", 1000 * 60] },
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },

  {
    $limit: 5,
  },

  {
    $project: {
      _id: false,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
]);
