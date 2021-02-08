const db = require('../models');
const Partnership = db.partnerships;


exports.create = (req, res) => {
  console.log("Creating new Partnership", req.body);
  const partnership = new Partnership({
    date_starts: req.body.dateOfMarriage,
    date_ends: req.body.dateOfDivorce,
    place: req.body.placeOfMarriage,
    individuals: [{
      id: req.body.husband
    }]
  })

}