const db = require('../models');
const Individual = db.individuals;

// Create and Save a new Individual
exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a new Individual

  console.log("Creating new Individual", req.body);

  const individual = new Individual({
    name: {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      nickName: req.body.nickName,
    },
    gender: req.body.gender,
    birth: {
      date: req.body.dateOfBirth, 
      place: req.body.placeOfBirth,
      parents: [{
        id: req.body.father,
        role: 'father'
      }, {
        id: req.body.mother,
        role: 'mother'
      }
      ]
    },
    death: {
      date: req.body.dateOfDeath,
      place: req.body.placeOfDeath
    },
    contact: {
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email
    }
  })

  

   // Save Tutorial in the database
  individual
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Individual."
      });
    }); 
  }
// Retrieve all Individuals from the database.
exports.findAll = (req, res) => {

  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  console.log("First Name", firstName);
  console.log("Last name", lastName);

  // result: { $and: [ { $gt: [ "$qty", 100 ] }, { $lt: [ "$qty", 250 ] } ] }

  //var condition = (firstName || lastName) ? { "name.lastName": { $regex: new RegExp(lastName), $options: "i" } } : {};
  var condition = (firstName || lastName) ? { $and: [{ "name.firstName": { $regex: new RegExp(firstName), $options: "i" } }, { "name.lastName": { $regex: new RegExp(lastName), $options: "i" } }] } : {};

  // console.log("condition", condition);

  Individual.find(condition)
    .then(data => {
      console.log("data returned", data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || " Some error occurred while retriveing members "
      });
    });

};

// Find a single Individual with an id
exports.findOne = (req, res) => {

};

// Update a Individual by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  

  const id = req.params.id;
  Individual.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Individual with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Individual was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Individual with id=" + id
      });
    });

// `doc` is the document _after_ `update` was applied because of
// `returnOriginal: false`


};

// Retrieve a single Individual with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Individual.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Individual with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Individual with id=" + id });
    });
};

// Delete a Individal with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Individual.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Individual with id=${id}. Maybe Individual was not found!`
        });
      } else {
        res.send({
          message: "Individual was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Individual with id=" + id
      });
    });

};

// Delete all Individual from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Individuals
exports.findAllPublished = (req, res) => {

};
