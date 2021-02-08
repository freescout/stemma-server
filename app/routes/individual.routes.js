module.exports = app => {
  const individuals = require('../controllers/individual.controller');

  var router = require('express').Router();

  app.use('/api/individuals', router);

  router.post("/", individuals.create); // Create a new Individual

  router.get("/", individuals.findAll); // Retrieve all Individuals

  router.get("/published", individuals.findAllPublished);  // Retrieve all published Individuals
 
  router.get("/:id", individuals.findOne);  // Retrieve a single Individual with id

  router.put("/:id", individuals.update);  // Update a Individual with id

  router.delete("/:id", individuals.delete);  // Delete a Individual with id

  router.delete("/", individuals.deleteAll); // Delete a new Individual
}


/*
create a new Individual: object.save()
find a Individual by id: findById(id)
retrieve all Individuals: find()
update a Individual by id: findByIdAndUpdate(id, data)
remove a Individual: findByIdAndRemove(id)
remove all Individuals: deleteMany()
find all Individuals by title: find({ title: { $regex: new RegExp(title), $options: “i” } })

*/