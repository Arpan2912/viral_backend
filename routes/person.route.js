const express = require("express");
const { person: personRoute } = require("../constants/constant.route");
const PersonController = require("../controllers/person.controller");

const router = express.Router();

router.route(personRoute.addPerson).post(PersonController.addPerson);
router.route(personRoute.updatePerson).post(PersonController.updatePerson);
router.route(personRoute.getPersons).get(PersonController.getPersons);

module.exports = router;
