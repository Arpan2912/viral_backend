const express = require("express");
const { rough: roughRoute } = require("../constants/constant.route");
const RoughController = require("../controllers/rough.controller");

const router = express.Router();

router.route(roughRoute.addRough).post(RoughController.addRough);
router.route(roughRoute.addLotData).post(RoughController.addLotData);
router.route(roughRoute.updateRough).post(RoughController.updateRough);
router.route(roughRoute.updateLotData).post(RoughController.updateLotData);
router.route(roughRoute.addRoughHistory).post(RoughController.addRoughHistory);

router
  .route(roughRoute.updateRoughHistory)
  .post(RoughController.updateRoughHistory);

router.route(roughRoute.getRough).get(RoughController.getRough);
router.route(roughRoute.getLotHistory).get(RoughController.getLotHistory);

router
  .route(roughRoute.getPlanDetailOfRough)
  .get(RoughController.getPlanDetailOfRough);

router
  .route(roughRoute.getBlockDetailOfRough)
  .get(RoughController.getBlockDetailOfRough);

router
  .route(roughRoute.getLsDetailOfRough)
  .get(RoughController.getLsDetailOfRough);

router.route(roughRoute.getLotStoneList).get(RoughController.getLotStoneList);
router.route(roughRoute.getRoughList).get(RoughController.getRoughList);
router.route(roughRoute.getLotList).get(RoughController.getLotList);

router
  .route(roughRoute.updateLotHistory)
  .post(RoughController.updateLotHistory);

router.route(roughRoute.getStoneList).get(RoughController.getStoneList);
router
  .route(roughRoute.getStoneLastStatus)
  .get(RoughController.getStoneLastStatus);

router.route(roughRoute.getStoneHistory).get(RoughController.getStoneHistory);

router
  .route(roughRoute.updateStoneToProcess)
  .post(RoughController.updateStoneToProcess);

router
  .route(roughRoute.updateStatusEndResult)
  .post(RoughController.updateProcessEndResult);

router
  .route(roughRoute.downloadPolishExcel)
  .post(RoughController.downloadPolishExcel);

router.route(roughRoute.getAllLotList).get(RoughController.getAllLotList);

module.exports = router;
