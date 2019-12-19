const uuidv4 = require("uuidv4");
const DbService = require("../services/db.service");

module.exports = class Rough {
  static async addRough(req, res) {
    const { roughs = [] } = req.body;

    // const { id } = req.user;
    const id = 1;
    try {
      for (let i = 0; i < roughs.length; i += 1) {
        const currentData = roughs[i];
        const obj = {
          uuid: uuidv4(),
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
        await DbService.insertRecordToDb(obj, "rough");
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async updateRough(req, res) {
    const {
      lotName: lot_name,
      roughName: rough_name,
      price,
      weight,
      unit,
      roughId: roughUuid
    } = req.body;

    if (!roughUuid) {
      throw { code: 409, msg: "no data found" };
    }
    const getIdReplacement = {
      uuid: roughUuid
    };
    const roughDetail = await DbService.getIdFromUuid(
      getIdReplacement,
      "rough"
    );

    let replacementObj = {
      updated_at: new Date().toISOString(),
      lot_name,
      rough_name,
      weight,
      unit,
      price,
      rough_id: roughDetail[0].id  //add check if rough not exist
    }
    await DbService.updateRough(replacementObj);
    return Promise.resolve(null);
  }

  static async getRough(req, res) {
    try {
      const roughs = await DbService.getRoughCurrentStatus();
      return Promise.resolve(roughs);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getRoughList(req, res) {
    const roughs = await DbService.getRoughList();
    return Promise.resolve(roughs);
  }

  static async getRoughHistory(req, res) {
    try {
      const { rough_id: roughUuid = null } = req.query;
      if (!roughUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const getIdReplacement = {
        uuid: roughUuid
      };
      const roughDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "rough"
      );
      const roughId = roughDetail[0].id;
      const replacementObj = {
        rough_id: roughId
      };
      console.log(replacementObj);
      const roughHistory = await DbService.getRoughHistory(replacementObj);
      console.log("roughHistory", roughHistory);
      for (let i = 0; i < roughHistory.length; i += 1) {
        const currentData = roughHistory[i];
        const obj = {
          history_id: currentData.id,
          rough_id: roughId
        };
        if (
          currentData.status === "planning" &&
          currentData.start_date &&
          currentData.end_date
        ) {
          const planData = await DbService.getPlanDetailOfRoughBasedOnHistoryId(
            obj
          );
          currentData.detailData = planData;
        }
        if (
          currentData.status === "ls" &&
          currentData.start_date &&
          currentData.end_date
        ) {
          const lsData = await DbService.getLsDetailOfRoughBasedOnHistoryId(
            obj
          );
          currentData.detailData = lsData;
        }

        if (
          currentData.status === "block" &&
          currentData.start_date &&
          currentData.end_date
        ) {
          const blockData = await DbService.getBlockDetailOfRoughBasedOnHistoryId(
            obj
          );
          currentData.detailData = blockData;
        }
      }
      return Promise.resolve(roughHistory);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getPlanDetailOfRough(req, res) {
    try {
      const { rough_id: roughUuid } = req.query;
      if (!roughUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const getIdReplacement = {
        uuid: roughUuid
      };
      const roughDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "rough"
      );
      const roughId = roughDetail[0].id;
      const replacementObj = {
        rough_id: roughId
      };
      const latestData = await DbService.getPlanDetailOfRough(replacementObj);
      return Promise.resolve(latestData);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getLsDetailOfRough(req, res) {
    try {
      const { rough_id: roughUuid } = req.query;
      if (!roughUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const getIdReplacement = {
        uuid: roughUuid
      };
      const roughDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "rough"
      );
      const roughId = roughDetail[0].id;
      const replacementObj = {
        rough_id: roughId
      };
      const latestData = await DbService.getLsDetailOfRough(replacementObj);
      return Promise.resolve(latestData);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getBlockDetailOfRough(req, res) {
    try {
      const { rough_id: roughUuid } = req.query;
      if (!roughUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const getIdReplacement = {
        uuid: roughUuid
      };
      const roughDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "rough"
      );
      const roughId = roughDetail[0].id;
      const replacementObj = {
        rough_id: roughId
      };
      const latestData = await DbService.getLsDetailOfRough(replacementObj);
      return Promise.resolve(latestData);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async addRoughHistory(req, res) {
    const { status, detailData, roughId: roughUuid, personId: personUuid } = req.body;
    const statusMap = {
      galaxy: "galaxy",
      planning: "planning",
      ls: "ls",
      block: "block",
      galaxy_end: "galaxy",
      planning_end: "planning",
      ls_end: "ls",
      block_end: "block",
      polish: "polish",
      polish_end: "polish",
      hpht: "hpht",
      hpht_end: "hpht",
    };

    // fetchPreviousStatus
    try {
      // const { id } = req.query;
      const id = 1;

      if (!roughUuid) {
        throw { code: 409, msg: "no data found" };
      }
      if (!personUuid) {
        throw { code: 409, msg: "Please select person" };
      }
      const getIdReplacement = {
        uuid: roughUuid
      };
      const roughDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "rough"
      );
      const roughId = roughDetail[0].id;
      const getPersonIdReplacement = {
        uuid: personUuid
      };
      const personDetail = await DbService.getIdFromUuid(
        getPersonIdReplacement,
        "person"
      );

      const personId = personDetail[0].id;

      const replacementObj = {
        rough_id: roughId
      };
      let lastRoughData = await DbService.getRoughCurrentStatusByRoughId(
        replacementObj
      );
      lastRoughData = lastRoughData[0];

      console.error("lastRoughData", lastRoughData);

      if (!lastRoughData.id) {
        const statusToAdd = statusMap[status];
        const obj = {
          rough_id: roughId,
          uuid: uuidv4(),
          status: statusToAdd,
          person_id: personId,
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: id,
          updated_by: id
        };
        await DbService.insertRecordToDb(obj, "rough_history");
      } else if (
        (status === "galaxy_end" && lastRoughData.status === "galaxy") ||
        (status === "ls_end" && lastRoughData.status === "ls") ||
        (status === "planning_end" && lastRoughData.status === "planning") ||
        (status === "block_end" && lastRoughData.status === "block") ||
        (status === "polish_end" && lastRoughData.status === "polish") ||
        (status === "hpht_end" && lastRoughData.status === "hpht")
      ) {
        const updateReplacement = {
          end_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          history_id: lastRoughData.id
        };
        await DbService.updateRoughHistory(updateReplacement);
      } else if (
        (status === "galaxy_end" && lastRoughData.status !== "galaxy") ||
        (status === "ls_end" && lastRoughData.status !== "ls") ||
        (status === "planning_end" && lastRoughData.status !== "planning") ||
        (status === "block_end" && lastRoughData.status !== "block") ||
        (status === "polish_end" && lastRoughData.status !== "polish") ||
        (status === "hpht_end" && lastRoughData.status !== "hpht")
      ) {
        const statusToAdd = statusMap[status];
        const obj = {
          rough_id: roughId,
          uuid: uuidv4(),
          status: statusToAdd,
          person_id: personId,
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: id,
          updated_by: id
        };
        await DbService.insertRecordToDb(obj, "rough_history");
      } else if (status !== lastRoughData.status) {
        // add data to plan or ls or block table
        const updateReplacement = {
          end_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          history_id: lastRoughData.id
        };

        await DbService.updateRoughHistory(updateReplacement);

        const statusToAdd = statusMap[status];
        const obj = {
          rough_id: roughId,
          uuid: uuidv4(),
          status: statusToAdd,
          person_id: personId,
          start_date: new Date().toISOString(),
          end_date: null,
          is_active: true,
          is_deleted: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: id,
          updated_by: id
        };
        await DbService.insertRecordToDb(obj, "rough_history");
      }

      if (detailData) {
        if (lastRoughData.status === "planning") {
          for (let i = 0; i < detailData.length; i += 1) {
            const currentData = detailData[i];
            const obj = {
              uuid: uuidv4(),
              history_id: lastRoughData.id,
              rough_id: roughId,
              plan_name: currentData.planName,
              person_id: personId,
              weight: currentData.weight,
              unit: currentData.unit,
              is_deleted: false,
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              created_by: id,
              updated_by: id
            };
            await DbService.insertRecordToDb(obj, "plan_result");
          }
        } else if (lastRoughData.status === "ls") {
          for (let i = 0; i < detailData.length; i += 1) {
            const currentData = detailData[i];
            const r = {
              uuid: currentData.planId
            };
            const planDetail = await DbService.getIdFromUuid(r, "plan_result");
            const planId = planDetail[0].id;
            const obj = {
              uuid: uuidv4(),
              history_id: lastRoughData.id,
              rough_id: roughId,
              plan_id: planId,
              person_id: personId,
              is_deleted: false,
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              created_by: id,
              updated_by: id
            };
            await DbService.insertRecordToDb(obj, "ls_result");
          }
        } else if (lastRoughData.status === "block") {
          for (let i = 0; i < detailData.length; i += 1) {
            const currentData = detailData[i];
            const r = {
              uuid: currentData.planId
            };
            const planDetail = await DbService.getIdFromUuid(r, "plan_result");
            const planId = planDetail[0].id;
            const obj = {
              uuid: uuidv4(),
              history_id: lastRoughData.id,
              rough_id: roughId,
              plan_id: planId,
              person_id: personId,
              is_deleted: false,
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              created_by: id,
              updated_by: id
            };
            await DbService.insertRecordToDb(obj, "block_result");
          }
        }
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
