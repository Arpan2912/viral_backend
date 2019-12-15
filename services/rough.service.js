const uuidv4 = require("uuidv4");
const DbService = require("../services/db.service");

module.exports = class Rough {
  static async addRough(req, res) {
    const { roughs = [] } = req.body;

    const { id } = req.user;
    try {
      for (let i = 0; i < roughs.lengh; i += 1) {
        const currentData = roughs[i];
        const obj = {
          u_uuid: uuidv4(),
          lot_name: currentData.lotName,
          rough_name: currentData.roughName,
          price: currentData.price,
          weight: currentData.weight,
          unit: currentData.unit,
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: id,
          updated_by: id
        };
        await DbService.insertRecordToDb(obj, 'rough')
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e)
    }


  }

  static async getRough(req, res) {
    try {
      const roughs = await DbService.getRoughCurrentStatus();
      return Promise.resolve(roughs[0]);
    } catch (e) {
      return Promise.reject(e)
    }
  }

  static async getRoughHistory(req, res) {
    try {
      const { roughId: roughUuid = null } = req.query;
      if (!roughUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const roughDetail = await DbService.getIdFromUuid(roughUuid, "rough");
      const roughId = roughDetail[0][0].id;
      const replacementObj = {
        rough_id: roughId
      }
      let roughHistory = await DbService.getRoughHistory(replacementObj);
      roughHistory = roughHistory[0];
      for (let i = 0; i < roughHistory.lengh; i += 1) {
        const currentData = roughHistory[i];
        const obj = {
          history_id: currentData.id,
          rough_id: currentData.rough_id
        };
        if (
          currentData.status === "planning" &&
          currentData.start_date &&
          currentData.end_date
        ) {
          let planData = await DbService.getPlanDetailOfRoughBasedOnHistoryId(obj);
          planData = planData[0];
          currentData.detailData = planData;
        }
        if (
          currentData.status === "ls" &&
          currentData.start_date &&
          currentData.end_date
        ) {
          let lsData = await DbService.getLsDetailOfRoughBasedOnHistoryId(obj);
          lsData = lsData[0];
          currentData.detailData = lsData;
        }

        if (
          currentData.status === "block" &&
          currentData.start_date &&
          currentData.end_date
        ) {
          let blockData = await DbService.getBlockDetailOfRoughBasedOnHistoryId(obj);
          blockData = blockData[0];
          currentData.detailData = blockData;
        }
      }
      return Promise.resolve(roughHistory);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getRoughLatestData(req, res) {
    try {
      const { roughId: roughUuid } = req.query;
      if (!roughUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const roughDetail = await DbService.getIdFromUuid(roughUuid, "rough");
      const roughId = roughDetail[0][0].id;
      const replacementObj = {
        rough_id: roughId
      };
      const latestData = await DbService.get
    } catch (e) {

    }
  }
}