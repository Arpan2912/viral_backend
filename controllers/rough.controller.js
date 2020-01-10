const RoughService = require("../services/rough.service");
const CommonService = require("../services/common.service");

module.exports = class RoughController {
  static async addRough(req, res) {
    try {
      await RoughService.addRough(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "Rough added successfully",
        null
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async addLotData(req, res) {
    try {
      await RoughService.addLotData(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "Lot data added successfully",
        null
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async updateRough(req, res) {
    try {
      await RoughService.updateRough(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "Rough updated successfully",
        null
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async updateLotData(req, res) {
    try {
      await RoughService.updateLotData(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "Lot updated successfully",
        null
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async getRough(req, res) {
    try {
      const roughData = await RoughService.getRough(req, res);

      const responseObj = CommonService.prepareSuccessResponse(
        "Get rough successfully",
        roughData
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async getRoughList(req, res) {
    try {
      const roughs = await RoughService.getRoughList(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "Get rough successfully",
        roughs
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async getLotList(req, res) {
    try {
      const roughs = await RoughService.getLotList(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "Get lot successfully",
        roughs
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async getLotHistory(req, res) {
    try {
      const roughData = await RoughService.getLotHistory(req, res);
      // const obj = {
      //   roughs: roughData
      // };
      const responseObj = CommonService.prepareSuccessResponse(
        "Get lot history successfully",
        roughData
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async getLotStoneList(req, res) {
    try {
      const roughData = await RoughService.getLotStoneList(req, res);
      const obj = {
        roughs: roughData
      };
      const responseObj = CommonService.prepareSuccessResponse(
        "Get lot stone list successfully",
        obj
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async getPlanDetailOfRough(req, res) {
    try {
      const roughData = await RoughService.getPlanDetailOfRough(req, res);
      const obj = {
        roughs: roughData
      };
      const responseObj = CommonService.prepareSuccessResponse(
        "Get plan detail of rough",
        obj
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async getBlockDetailOfRough(req, res) {
    try {
      const roughData = await RoughService.getBlockDetailOfRough(req, res);
      const obj = {
        roughs: roughData
      };
      const responseObj = CommonService.prepareSuccessResponse(
        "Get block detail of rough",
        obj
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async getLsDetailOfRough(req, res) {
    try {
      const roughData = await RoughService.getLsDetailOfRough(req, res);
      const obj = {
        roughs: roughData
      };
      const responseObj = CommonService.prepareSuccessResponse(
        "Get ls detail of rough",
        obj
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async addRoughHistory(req, res) {
    try {
      await RoughService.addRoughHistory(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "add rough history successfully",
        null
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async updateRoughHistory(req, res) {
    try {
      await RoughService.updateRoughHistory(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "add rough history successfully",
        null
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async updateLotHistory(req, res) {
    try {
      await RoughService.updateLotHistory(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "Rough history updated successfully",
        null
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async getStoneList(req, res) {
    try {
      const stoneList = await RoughService.getStoneList(req, res);

      const responseObj = CommonService.prepareSuccessResponse(
        "Get stone list",
        stoneList
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }
};
