const express = require("express");
const { rough: roughRoute } = require("../constants/constant.route");
const RoughController = require("../controllers/rough.controller");

const router = express.Router();

router.route(roughRoute.addRough).post(RoughController.addRough);
router.route(roughRoute.addRoughHistory).post(RoughController.addRoughHistory);
router.route(roughRoute.getRough).get(RoughController.getRough);
router.route(roughRoute.getRoughHistory).get(RoughController.getRoughHistory);
router
  .route(roughRoute.getPlanDetailOfRough)
  .get(RoughController.getPlanDetailOfRough);

router
  .route(roughRoute.getBlockDetailOfRough)
  .get(RoughController.getBlockDetailOfRough);

router
  .route(roughRoute.getLsDetailOfRough)
  .get(RoughController.getLsDetailOfRough);

router
  .route(roughRoute.getRoughList)
  .get(RoughController.getRoughList);


module.exports = router;
