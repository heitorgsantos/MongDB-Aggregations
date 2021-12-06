db.trips.aggregate([
  {
    $project: {
      bikeid: 1,
      duracaoMedia:
        {
          $dateDiff:
            {
              startDate: "$startTime",
              endDate: "$stopTime",
              unit: "minute",
            },
        },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$duracaoMedia" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  {
    $limit: 5,
  },
]);
