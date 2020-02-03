const uuidv4 = require("uuidv4");
const json2xls = require("json2xls");
const fs = require("fs");
const DbService = require("../services/db.service");

module.exports = class Rough {
  static async addRough(req, res) {
    const {
      roughName,
      weight,
      unit,
      price,
      dollar,
      purchaseDate,
      roughs = []
    } = req.body;

    const { id } = req.userDetail;
    try {
      const replacementObj = {
        uuid: uuidv4(),
        rough_name: roughName,
        weight,
        unit,
        price,
        dollar,
        purchase_date: purchaseDate,
        is_active: true,
        is_deleted: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: id,
        updated_by: id
      };
      const insertRoughResult = await DbService.insertRecordToDb(
        replacementObj,
        "roughs"
      );
      const roughId = insertRoughResult[0][0].id;

      for (let i = 0; i < roughs.length; i += 1) {
        const currentData = roughs[i];
        const obj = {
          uuid: uuidv4(),
          rough_id: roughId,
          lot_name: currentData.lotName,
          weight: currentData.weight,
          unit: currentData.unit,
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: id,
          updated_by: id
        };
        await DbService.insertRecordToDb(obj, "lot_data");
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async addLotData(req, res) {
    const { lotName, weight, unit, roughId: roughUuid } = req.body;
    const { id } = req.userDetail;

    try {
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
      const obj = {
        uuid: uuidv4(),
        rough_id: roughId,
        lot_name: lotName,
        weight,
        unit,
        is_active: true,
        is_deleted: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: id,
        updated_by: id
      };

      await DbService.insertRecordToDb(obj, "lot_data");
      return Promise.resolve(null);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async updateRough(req, res) {
    const {
      roughName,
      price,
      dollar,
      weight,
      unit,
      roughId: roughUuid,
      purchaseDate
    } = req.body;
    const { id } = req.userDetail;

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

    const replacementObj = {
      updated_at: new Date().toISOString(),
      updated_by: id,
      rough_name: roughName,
      weight,
      unit,
      price,
      dollar,
      purchase_date: purchaseDate,
      rough_id: roughDetail[0].id // add check if rough not exist
    };
    await DbService.updateRough(replacementObj);
    return Promise.resolve(null);
  }

  static async updateLotData(req, res) {
    const { lotName, weight, unit, lotId: lotUuid } = req.body;
    const { id } = req.userDetail;

    if (!lotUuid) {
      throw { code: 409, msg: "no data found" };
    }
    const getIdReplacement = {
      uuid: lotUuid
    };
    const lotDetail = await DbService.getIdFromUuid(
      getIdReplacement,
      "lot_data"
    );

    const replacementObj = {
      updated_at: new Date().toISOString(),
      updated_by: id,
      lot_name: lotName,
      weight,
      unit,
      lot_id: lotDetail[0].id // add check if rough not exist
    };
    await DbService.updateLotData(replacementObj);
    return Promise.resolve(null);
  }

  static async getRough(req, res) {
    try {
      const { user_type } = req.userDetail;
      let { page = "1", limit = "10", search } = req.query;
      page = parseInt(page);
      if (page === "NaN") {
        page = 1;
      }
      limit = parseInt(limit);
      if (limit === "NaN") {
        limit = 1;
      }
      const offset = (page - 1) * limit;
      const replacementObj = {
        offset,
        limit,
        search:
          search === "" || search === undefined || search === null
            ? null
            : `%${search}%`,
        is_search: !(search === "" || search === undefined || search === null),
        user_type
      };
      const roughs = await DbService.getLotCurrentStatus(replacementObj);
      const countObj = await DbService.getTotalLotCount(replacementObj);
      console.log("countObj", countObj);
      const responseObj = {
        roughs,
        count: countObj[0].count
      };
      return Promise.resolve(responseObj);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getRoughList(req, res) {
    const { user_type } = req.userDetail;

    let { page = "1", limit = "10", search } = req.query;
    page = parseInt(page);
    if (page === "NaN") {
      page = 1;
    }
    limit = parseInt(limit);
    if (limit === "NaN") {
      limit = 1;
    }
    const offset = (page - 1) * limit;
    const replacementObj = {
      offset,
      limit,
      search:
        search === "" || search === undefined || search === null
          ? null
          : `%${search}%`,
      is_search: !(search === "" || search === undefined || search === null),
      user_type
    };
    const roughs = await DbService.getRoughList(replacementObj);
    const countObj = await DbService.getRoughCount(replacementObj);
    const responseObj = {
      roughs,
      count: countObj[0].count
    };
    return Promise.resolve(responseObj);
  }

  static async getLotList(req, res) {
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
    const roughs = await DbService.getLotList(roughId);
    return Promise.resolve(roughs);
  }

  static async getLotStoneList(req, res) {
    const { lot_id: lotUuid = null } = req.query;
    if (!lotUuid) {
      throw { code: 409, msg: "no data found" };
    }
    const getIdReplacement = {
      uuid: lotUuid
    };
    const lotDetail = await DbService.getIdFromUuid(
      getIdReplacement,
      "lot_data"
    );
    const lotId = lotDetail[0].id;
    const replacementObj = {
      lot_id: lotId
    };
    const lotProcessStatuses = await DbService.getLatestLotStatus(
      replacementObj
    );
    let detailData = [];
    // lotProcessStatuses = lotProcessStatuses[0];
    console.log(
      "lotProcessStatuses",
      lotProcessStatuses,
      lotProcessStatuses.length
    );
    for (let i = 0; i < lotProcessStatuses.length; i += 1) {
      const currentData = lotProcessStatuses[i];
      if (currentData.status === "planning" && currentData.end_date !== null) {
        detailData = await DbService.getPlanDetailOfRough(replacementObj);
        // detailData = detailData;
        break;
      }
      if (currentData.status === "ls" && currentData.end_date !== null) {
        detailData = await DbService.getLsDetailOfRough(replacementObj);
        // detailData = detailData;
        break;
      }
      if (currentData.status === "block" && currentData.end_date !== null) {
        detailData = await DbService.getBlockDetailOfRough(replacementObj);
        // detailData = detailData[0];
        break;
      }
    }
    return Promise.resolve(detailData);
  }

  static async getLotHistory(req, res) {
    try {
      const { lot_id: lotUuid = null } = req.query;
      if (!lotUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const getIdReplacement = {
        uuid: lotUuid
      };
      const lotDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "lot_data"
      );
      let lotData = await DbService.getLotDataFromUuid(getIdReplacement);
      lotData = lotData[0];
      const lotId = lotDetail[0].id;
      const replacementObj = {
        lot_id: lotId
      };
      console.log(replacementObj);
      const lotHistory = await DbService.getLotHistory(replacementObj);
      const totalLotLabour = await DbService.getTotalLabourForLot(
        replacementObj
      );
      console.log("totalLotLabour", totalLotLabour);
      const totalLotWeight = totalLotLabour[0].total_weight;
      const totalLotLabourValue = totalLotLabour[0].total_labour;
      for (let i = 0; i < lotHistory.length; i += 1) {
        const currentData = lotHistory[i];
        const obj = {
          history_id: currentData.id,
          lot_id: lotId
        };

        const stoneToProcessData = await DbService.getStoneToProcessData(obj);
        currentData.stoneToProcessData = stoneToProcessData;
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

        if (
          currentData.status === "hpht" &&
          currentData.start_date &&
          currentData.end_date
        ) {
          const blockData = await DbService.getHphtDetailOfRoughBasedOnHistoryId(
            obj
          );
          currentData.detailData = blockData;
        }
      }
      console.log(
        "totalLotLabour",
        totalLotLabourValue,
        "totalWeight",
        totalLotWeight
      );
      const responseObj = {
        totalLabour: totalLotLabourValue,
        totalWeight: totalLotWeight,
        roughs: lotHistory,
        lot_name: lotData.lot_name,
        rough_name: lotData.rough_name,
        lot_id: lotUuid
      };
      return Promise.resolve(responseObj);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getStoneLastStatus(req, res) {
    try {
      const { user_type } = req.userDetail;
      let { page = "1", limit = "10", search } = req.query;
      page = parseInt(page);
      if (page === "NaN") {
        page = 1;
      }
      limit = parseInt(limit);
      if (limit === "NaN") {
        limit = 1;
      }
      const offset = (page - 1) * limit;
      const replacementObj = {
        offset,
        limit,
        search:
          search === "" || search === undefined || search === null
            ? null
            : `%${search}%`,
        is_search: !(search === "" || search === undefined || search === null),
        user_type
      };
      const roughs = await DbService.getStoneCurrentStatus(replacementObj);
      const countObj = await DbService.getTotalStoneCount(replacementObj);
      console.log("countObj", countObj);
      const responseObj = {
        roughs,
        count: countObj[0].count
      };
      return Promise.resolve(responseObj);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getStoneHistory(req, res) {
    try {
      const { stone_id: stoneUuid = null } = req.query;
      if (!stoneUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const getIdReplacement = {
        uuid: stoneUuid
      };
      const stoneDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "stones"
      );
      const stoneId = stoneDetail[0].id;
      const replacementObj = {
        stone_id: stoneId
      };
      console.log(replacementObj);
      const stoneHistory = await DbService.getStoneHistory(replacementObj);
      // const totalLotLabour = await DbService.getTotalLabourForLot(
      //   replacementObj
      // );
      // console.log("totalLotLabour", totalLotLabour);
      // const totalLotWeight = totalLotLabour[0].total_weight;
      // const totalLotLabourValue = totalLotLabour[0].total_labour;
      // for (let i = 0; i < lotHistory.length; i += 1) {
      //   const currentData = lotHistory[i];
      //   const obj = {
      //     history_id: currentData.id,
      //     lot_id: lotId
      //   };

      //   const stoneToProcessData = await DbService.getStoneToProcessData(obj);
      //   currentData.stoneToProcessData = stoneToProcessData;
      //   if (
      //     currentData.status === "planning" &&
      //     currentData.start_date &&
      //     currentData.end_date
      //   ) {
      //     const planData = await DbService.getPlanDetailOfRoughBasedOnHistoryId(
      //       obj
      //     );
      //     currentData.detailData = planData;
      //   }
      //   if (
      //     currentData.status === "ls" &&
      //     currentData.start_date &&
      //     currentData.end_date
      //   ) {
      //     const lsData = await DbService.getLsDetailOfRoughBasedOnHistoryId(
      //       obj
      //     );
      //     currentData.detailData = lsData;
      //   }

      //   if (
      //     currentData.status === "block" &&
      //     currentData.start_date &&
      //     currentData.end_date
      //   ) {
      //     const blockData = await DbService.getBlockDetailOfRoughBasedOnHistoryId(
      //       obj
      //     );
      //     currentData.detailData = blockData;
      //   }
      // }
      // console.log(
      //   "totalLotLabour",
      //   totalLotLabourValue,
      //   "totalWeight",
      //   totalLotWeight
      // );
      const responseObj = {
        // totalLabour: totalLotLabourValue,
        // totalWeight: totalLotWeight,
        roughs: stoneHistory
      };
      return Promise.resolve(responseObj);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getPlanDetailOfRough(req, res) {
    try {
      const { lot_id: lotUuid } = req.query;
      if (!lotUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const getIdReplacement = {
        uuid: lotUuid
      };
      const lotDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "lot_data"
      );
      const lotId = lotDetail[0].id;
      const replacementObj = {
        lot_id: lotId
      };
      const latestData = await DbService.getPlanDetailOfRough(replacementObj);
      return Promise.resolve(latestData);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getLsDetailOfRough(req, res) {
    try {
      const { lot_id: lotUuid } = req.query;
      if (!lotUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const getIdReplacement = {
        uuid: lotUuid
      };
      const lotDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "lot_data"
      );
      const lotId = lotDetail[0].id;
      const replacementObj = {
        lot_id: lotId
      };
      const latestData = await DbService.getLsDetailOfRough(replacementObj);
      return Promise.resolve(latestData);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getBlockDetailOfRough(req, res) {
    try {
      const { lot_id: lotUuid } = req.query;
      if (!lotUuid) {
        throw { code: 409, msg: "no data found" };
      }
      const getIdReplacement = {
        uuid: lotUuid
      };
      const lotDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "lot_data"
      );
      const lotId = lotDetail[0].id;
      const replacementObj = {
        lot_id: lotId
      };
      const latestData = await DbService.getLsDetailOfRough(replacementObj);
      return Promise.resolve(latestData);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async addRoughHistory(req, res) {
    const { id } = req.userDetail;
    const {
      stoneToProcess,
      lotId: lotUuid,
      personId: personUuid,
      status
    } = req.body;

    try {
      if (!lotUuid) {
        throw { code: 409, msg: "no data found" };
      }
      if (!personUuid) {
        throw { code: 409, msg: "Please select person" };
      }

      const getIdReplacement = {
        uuid: lotUuid
      };
      const lotDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "lot_data"
      );
      const lotId = lotDetail[0].id;
      const getPersonIdReplacement = {
        uuid: personUuid
      };
      const personDetail = await DbService.getIdFromUuid(
        getPersonIdReplacement,
        "person"
      );

      const personId = personDetail[0].id;

      const obj = {
        lot_id: lotId,
        uuid: uuidv4(),
        status,
        person_id: personId,
        start_date: new Date().toISOString(),
        is_active: true,
        is_deleted: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: id,
        updated_by: id
      };
      let historyId = await DbService.insertRecordToDb(obj, "lot_history");
      console.log("historyId", historyId);
      historyId = historyId[0][0].id;
      // :uuid,:history_id,:lot_id,
      // :stone_name,:weight,:unit,:created_by,:updated_by,:created_at,:updated_at
      if (stoneToProcess && stoneToProcess.length > 0) {
        for (let i = 0; i < stoneToProcess.length; i++) {
          const currentData = stoneToProcess[i];
          const stoneProcessObj = {
            uuid: uuidv4(),
            history_id: historyId,
            lot_id: lotId,
            stone_name: currentData.stoneName,
            weight: currentData.weight,
            unit: currentData.unit,
            cut: currentData.cut,
            shape: currentData.shape,
            color: currentData.color,
            purity: currentData.purity,
            created_by: id,
            updated_by: id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          await DbService.insertRecordToDb(stoneProcessObj, "stone_to_process");
          const stoneObj = {
            stone_name: currentData.stoneName,
            lot_id: lotId
          };
          const stoneData = await DbService.getStoneId(stoneObj);
          const stoneId = stoneData[0].id;
          const replacementObj = {
            uuid: uuidv4(),
            history_id: historyId,
            lot_id: lotId,
            stone_id: stoneId,
            created_by: id,
            updated_by: id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          await DbService.insertRecordToDb(replacementObj, "stone_history");
        }
        return Promise.resolve();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async updateRoughHistory(req, res) {
    const { id } = req.userDetail;
    const {
      detailData,
      lotId: lotUuid,
      status,
      historyId: historyUuid,
      personId: personUuid,
      labourRate = null,
      // totalLabour = null,
      // totalWeight = null,
      dollar = null
    } = req.body;
    let totalLabour = 0;
    let totalWeight = 0;
    try {
      if (!historyUuid) {
        throw { code: 409, msg: "no data found" };
      }
      if (!lotUuid) {
        throw { code: 409, msg: "no data found" };
      }
      if (!personUuid) {
        throw { code: 409, msg: "Please select person" };
      }

      const getHistoryIdReplacement = {
        uuid: historyUuid
      };
      const lotHistory = await DbService.getIdFromUuid(
        getHistoryIdReplacement,
        "lot_history"
      );
      console.log("lotHistory", lotHistory);
      const historyId = lotHistory[0].id;

      const getIdReplacement = {
        uuid: lotUuid
      };
      const lotDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "lot_data"
      );
      const lotId = lotDetail[0].id;
      const roughId = lotDetail[0].rough_id;
      const getPersonIdReplacement = {
        uuid: personUuid
      };
      const personDetail = await DbService.getIdFromUuid(
        getPersonIdReplacement,
        "person"
      );

      const personId = personDetail[0].id;

      const replacementObj = {
        history_id: historyId
      };
      const stoneToProcessData = await DbService.getStoneToProcessData(
        replacementObj
      );
      if (stoneToProcessData && stoneToProcessData.length > 0) {
        for (let i = 0; i < stoneToProcessData.length; i++) {
          const currentData = stoneToProcessData[i];
          if (currentData.unit === "carat") {
            const weight = parseFloat(currentData.weight) * 100;
            totalWeight += weight;
          } else {
            totalWeight += parseFloat(currentData.weight);
          }
        }
        totalLabour = (labourRate * totalWeight) / 100;
      } else {
        const replacementObj = {
          lot_id: lotId
        };
        let lotData = await DbService.getLotData(replacementObj);
        lotData = lotData[0];
        totalWeight = parseFloat(lotData.weight);
        if (lotData.unit === "carat") {
          totalWeight *= 100;
        }
        totalLabour = (labourRate * totalWeight) / 100;
      }
      const obj = {
        labour_rate: labourRate,
        total_labour: totalLabour,
        total_weight: totalWeight,
        dollar,
        submitted_to_person_id: personId,
        end_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        updated_by: id,
        history_id: historyId
      };
      await DbService.updateLotHistory(obj);
      // :uuid,:history_id,:lot_id,
      // :stone_name,:weight,:unit,:created_by,:updated_by,:created_at,:updated_at
      if (detailData && detailData.length > 0) {
        for (let i = 0; i < detailData.length; i += 1) {
          const currentData = detailData[i];
          console.log("currentData", currentData);
          const resultObj = {
            uuid: uuidv4(),
            history_id: historyId,
            lot_id: lotId,
            stone_name: currentData.stoneName,
            person_id: personId,
            weight: currentData.weight,
            unit: currentData.unit,
            cut: currentData.cut,
            shape: currentData.shape,
            color: currentData.color,
            purity: currentData.purity,
            is_deleted: false,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by: id,
            updated_by: id
          };

          if (status === "planning") {
            await DbService.insertRecordToDb(resultObj, "plan_result");
            // await DbService.updateStone(stoneReplacementObj);
          } else if (status === "ls") {
            let fromStoneId = null;
            if (currentData.from) {
              const fromStoneName = currentData.from;
              const replacementObj = {
                stone_name: fromStoneName,
                lot_id: lotId,
                have_child: true,
                status,
                updated_at: new Date().toISOString(),
                updated_by: id
              };

              await DbService.updateStone(replacementObj);
              const fromStoneData = await DbService.getStoneId(replacementObj);
              fromStoneId = fromStoneData[0].id;
            }
            await DbService.insertRecordToDb(resultObj, "ls_result");
            const lsObj = {
              uuid: uuidv4(),
              rough_id: roughId,
              lot_id: lotId,
              stone_name: currentData.stoneName,
              weight: currentData.weight,
              unit: currentData.unit,
              cut: currentData.cut,
              shape: currentData.shape,
              color: currentData.color,
              purity: currentData.purity,
              status: "ls",
              have_child: false,
              parent_id: fromStoneId,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              created_by: id,
              updated_by: id
            };
            const stoneDetail = DbService.getStoneId(lsObj);
            const stoneId =
              stoneDetail && stoneDetail[0] && stoneDetail[0].id
                ? stoneDetail[0].id
                : null;
            if (!stoneId) {
              await DbService.insertRecordToDb(lsObj, "stones");
            } else {
              if (!currentData.from) {
                delete lsObj.parent_id;
              }
              await DbService.updateStone(lsObj);
            }
          } else if (status === "block") {
            await DbService.insertRecordToDb(resultObj, "block_result");
            const repObj = {
              stone_name: currentData.stoneName,
              weight: currentData.weight,
              unit: currentData.unit,
              cut: currentData.cut,
              shape: currentData.shape,
              color: currentData.color,
              purity: currentData.purity,
              status: "block",
              lot_id: lotId,
              updated_at: new Date().toISOString(),
              updated_by: id
            };
            await DbService.updateStone(repObj);
          } else if (status === "hpht") {
            await DbService.insertRecordToDb(resultObj, "hpht_result");
            const repObj = {
              stone_name: currentData.stoneName,
              weight: currentData.weight,
              unit: currentData.unit,
              cut: currentData.cut,
              shape: currentData.shape,
              color: currentData.color,
              purity: currentData.purity,
              status: "hpht",
              lot_id: lotId,
              updated_at: new Date().toISOString(),
              updated_by: id
            };
            await DbService.updateStone(repObj);
          }
        }
        return Promise.resolve();
      }
    } catch (e) {
      Promise.reject(e);
    }
  }

  static async addRoughHistoryOld(req, res) {
    const {
      status,
      detailData,
      lotId: lotUuid,
      personId: personUuid,
      labourRate = null,
      totalLabour = null,
      totalWeight = null,
      labourHistoryId: labourHistoryUuid = null,
      dollar = null
    } = req.body;
    const { id } = req.userDetail;

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
      gia: "gia",
      gia_end: "gia",
      iga: "iga",
      iga_end: "iga",
      sale: "sale"
    };

    // fetchPreviousStatus
    try {
      // const { id } = req.query;
      let labourHistoryId = null;
      if (!lotUuid) {
        throw { code: 409, msg: "no data found" };
      }
      if (!personUuid) {
        throw { code: 409, msg: "Please select person" };
      }
      const getIdReplacement = {
        uuid: lotUuid
      };
      const lotDetail = await DbService.getIdFromUuid(
        getIdReplacement,
        "lot_data"
      );
      const lotId = lotDetail[0].id;
      const getPersonIdReplacement = {
        uuid: personUuid
      };
      const personDetail = await DbService.getIdFromUuid(
        getPersonIdReplacement,
        "person"
      );

      const personId = personDetail[0].id;

      if (labourHistoryUuid) {
        const getHistoryIdReplacement = {
          uuid: labourHistoryUuid
        };
        const lotHistory = await DbService.getIdFromUuid(
          getHistoryIdReplacement,
          "lot_history"
        );
        console.log("lotHistory", lotHistory);
        labourHistoryId = lotHistory[0].id;
      }

      const replacementObj = {
        lot_id: lotId
      };
      let lastRoughData = await DbService.getRoughCurrentStatusByRoughId(
        replacementObj
      );
      lastRoughData = lastRoughData[0];

      console.error("lastRoughData", lastRoughData);

      if (!lastRoughData.id) {
        const statusToAdd = statusMap[status];
        const obj = {
          lot_id: lotId,
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
        await DbService.insertRecordToDb(obj, "lot_history");
      } else if (
        (status === "galaxy_end" && lastRoughData.status === "galaxy") ||
        (status === "ls_end" && lastRoughData.status === "ls") ||
        (status === "planning_end" && lastRoughData.status === "planning") ||
        (status === "block_end" && lastRoughData.status === "block") ||
        (status === "polish_end" && lastRoughData.status === "polish") ||
        (status === "hpht_end" && lastRoughData.status === "hpht") ||
        (status === "gia_end" && lastRoughData.status === "gia") ||
        (status === "iga_end" && lastRoughData.status === "iga")
      ) {
        const updateReplacement = {
          labour_rate: labourRate,
          total_labour: totalLabour,
          total_weight: totalWeight,
          dollar,
          labour_history_id: labourHistoryId,
          submitted_to_person_id: personId,
          end_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          updated_by: id,
          history_id: lastRoughData.id
        };
        await DbService.updateLotHistory(updateReplacement);
      } else if (
        (status === "galaxy_end" && lastRoughData.status !== "galaxy") ||
        (status === "ls_end" && lastRoughData.status !== "ls") ||
        (status === "planning_end" && lastRoughData.status !== "planning") ||
        (status === "block_end" && lastRoughData.status !== "block") ||
        (status === "polish_end" && lastRoughData.status !== "polish") ||
        (status === "hpht_end" && lastRoughData.status !== "hpht") ||
        (status === "gia_end" && lastRoughData.status !== "gia") ||
        (status === "iga_end" && lastRoughData.status !== "iga")
      ) {
        const statusToAdd = statusMap[status];
        const obj = {
          lot_id: lotId,
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
        await DbService.insertRecordToDb(obj, "lot_history");
      } else if (status !== lastRoughData.status) {
        // add data to plan or ls or block table
        const updateReplacement = {
          labour_rate: labourRate,
          total_labour: totalLabour,
          total_weight: totalWeight,
          dollar,
          labour_history_id: labourHistoryId,
          submitted_to_person_id: personId,
          end_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          updated_by: id,
          history_id: lastRoughData.id
        };

        await DbService.updateLotHistory(updateReplacement);

        const statusToAdd = statusMap[status];
        const obj = {
          lot_id: lotId,
          uuid: uuidv4(),
          status: statusToAdd,
          person_id: personId,
          start_date: new Date().toISOString(),
          end_date: statusToAdd === "sale" ? new Date().toISOString() : null,
          is_active: true,
          is_deleted: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: id,
          updated_by: id
        };
        await DbService.insertRecordToDb(obj, "lot_history");
      }

      if (detailData) {
        if (lastRoughData.status === "planning") {
          for (let i = 0; i < detailData.length; i += 1) {
            const currentData = detailData[i];
            const obj = {
              uuid: uuidv4(),
              history_id: lastRoughData.id,
              lot_id: lotId,
              stone_name: currentData.stoneName,
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
            // const r = {
            //   uuid: currentData.planId
            // };
            // const planDetail = await DbService.getIdFromUuid(r, "plan_result");
            // const planId = planDetail[0].id;
            const obj = {
              uuid: uuidv4(),
              history_id: lastRoughData.id,
              lot_id: lotId,
              person_id: personId,
              stone_name: currentData.stoneName,
              weight: currentData.weight,
              unit: currentData.unit,
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
            // const r = {
            //   uuid: currentData.planId
            // };
            // const planDetail = await DbService.getIdFromUuid(r, "plan_result");
            // const planId = planDetail[0].id;
            const obj = {
              uuid: uuidv4(),
              history_id: lastRoughData.id,
              lot_id: lotId,
              // plan_id: planId,
              person_id: personId,
              stone_name: currentData.stoneName,
              weight: currentData.weight,
              unit: currentData.unit,
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

  static async updateLotHistory(req, res) {
    const { id } = req.userDetail;
    const { labour, historyId: historyUuid } = req.body;
    // get labour history_id from history_id
    const getIdReplacement = {
      uuid: historyUuid
    };
    const historyIdDetail = await DbService.getIdFromUuid(
      getIdReplacement,
      "lot_history"
    );
    const historyId = historyIdDetail[0].id;
    const replacementObj = {
      history_id: historyId
    };

    const labourInFloat = parseFloat(labour);
    let totalLabour = 0;
    let totalWeightValue = 0;
    let historyDetail = await DbService.getLotHistoryData(replacementObj);
    historyDetail = historyDetail[0];
    // check if it is null or not
    // if not null

    if (historyDetail && historyDetail.labour_history_id) {
      const replacementStatusObj = {
        history_id: historyDetail.labour_history_id
      };

      // then get status for labour_history_id
      let historyStatusDetail = await DbService.getLotHistoryData(
        replacementStatusObj
      );

      historyStatusDetail = historyStatusDetail[0];
      // from status find it in specific plan/ls/block table
      const replacementStoneObj = {
        history_id: historyDetail.labour_history_id
      };
      let stoneDetail = null;
      if (historyStatusDetail.status === "planning") {
        stoneDetail = await DbService.getPlanDetailOfRoughForHistoryId(
          replacementStoneObj
        );
      } else if (historyStatusDetail.status === "ls") {
        stoneDetail = await DbService.getLsDetailOfRoughForHistoryId(
          replacementStoneObj
        );
      } else if (historyStatusDetail.status === "block") {
        stoneDetail = await DbService.getBlockDetailOfRoughForHistoryId(
          replacementStoneObj
        );
      } else if (historyStatusDetail.status === "hpht") {
        stoneDetail = await DbService.getHphtDetailOfRoughForHistoryId(
          replacementStoneObj
        );
      }

      if (stoneDetail.length > 0) {
        let totalWeight = 0;
        for (let i = 0; i < stoneDetail.length; i += 1) {
          const currentData = stoneDetail[i];
          let weight = currentData.weight ? parseFloat(currentData.weight) : 0;
          const { unit } = currentData;
          if (unit === "carat") {
            weight *= 100;
          }
          totalWeight += weight;
        }
        totalLabour = (totalWeight * labourInFloat) / 100;
        totalWeightValue = totalWeight;
      }
    } else {
      const replacementObj = {
        lot_id: historyDetail.lot_id
      };
      let lotData = await DbService.getLotData(replacementObj);
      lotData = lotData[0];
      let weight = lotData.weight ? parseFloat(lotData.weight) : 0;
      const { unit } = lotData;
      if (unit === "carat") {
        weight *= 100;
      }
      totalWeightValue = weight;
      totalLabour = (weight * labourInFloat) / 100;
      // if null
    }
    const updateReplacement = {
      labour_rate: labourInFloat,
      total_labour: totalLabour,
      total_weight: totalWeightValue,
      history_id: historyId,
      updated_at: new Date().toISOString(),
      updated_by: id
    };
    await DbService.updateLotHistory(updateReplacement);
    return Promise.resolve();
    // q = `select status from labour_history where id=labour_history_id`;
    // const status = null;

    // count labourconst
    // find lot_data from lot_id in lot_data table
    // q = `select * from lot_data where id=lot_id`;
    // calculate labour
  }

  static async getStoneList(req, res) {
    const { u: lotUuid = null } = req.query;
    if (!lotUuid) {
      throw { code: 409, msg: "no data found" };
    }

    const getIdReplacement = {
      uuid: lotUuid
    };
    const lotDetail = await DbService.getIdFromUuid(
      getIdReplacement,
      "lot_data"
    );
    const lotId = lotDetail[0].id;
    const replacementObj = {
      lot_id: lotId
    };
    const stoneList = await DbService.getStoneList(replacementObj);
    return Promise.resolve(stoneList);
  }

  static async updateStoneToProcess(req, res) {
    const { id } = req.userDetail;
    const {
      stoneToProcessId: stoneToProcessUuid,
      historyId: historyUuid,
      lotId: lotUuid,
      status,
      stoneName,
      weight,
      unit,
      cut,
      shape,
      color,
      purity
    } = req.body;

    if (!lotUuid) {
      throw { code: 409, msg: "no data found" };
    }

    if (!stoneToProcessUuid) {
      throw { code: 409, msg: "no data found" };
    }

    const getIdReplacement = {
      uuid: lotUuid
    };
    const lotDetail = await DbService.getIdFromUuid(
      getIdReplacement,
      "lot_data"
    );
    const lotId = lotDetail[0].id;

    const updateStoneToProcessReplacement = {
      uuid: stoneToProcessUuid,
      updated_at: new Date().toISOString(),
      updated_by: id,
      lot_id: lotId
    };

    if (stoneName) {
      updateStoneToProcessReplacement.stone_name = stoneName;
    }
    if (weight) {
      updateStoneToProcessReplacement.weight = weight;
    }
    if (unit) {
      updateStoneToProcessReplacement.unit = unit;
    }
    if (cut) {
      updateStoneToProcessReplacement.cut = cut;
    }
    if (shape) {
      updateStoneToProcessReplacement.shape = shape;
    }
    if (color) {
      updateStoneToProcessReplacement.color = color;
    }
    if (purity) {
      updateStoneToProcessReplacement.purity = purity;
    }
    await DbService.updateStoneToProcess(updateStoneToProcessReplacement);

    // if (status === "ls" || status === "block") {
    //   const replacementObj = {
    //     lot_id: lotId
    //   };
    //   if (!historyUuid) {
    //     throw { code: 409, msg: "no data found" };
    //   }

    //   const getHistoryIdReplacement = {
    //     uuid: historyUuid
    //   };
    //   const lotHistory = await DbService.getIdFromUuid(
    //     getHistoryIdReplacement,
    //     "lot_history"
    //   );
    //   console.log("lotHistory", lotHistory);
    //   const historyId = lotHistory[0].id;

    //   const lastHistoryDetail = await DbService.getLastHistoryIdToUpdateStone(
    //     replacementObj
    //   );
    //   const lastHistoryId = lastHistoryDetail[0].id;

    //   if (historyId === lastHistoryId) {
    //     await DbService.updateStone(updateStoneToProcessReplacement);
    //   }
    // }
    return Promise.resolve();
  }

  static async updateProcessEndResult(req, res) {
    const { id } = req.userDetail;
    const {
      resultId: resultUuid,
      historyId: historyUuid,
      lotId: lotUuid,
      status,
      stoneName,
      weight,
      unit,
      cut,
      shape,
      color,
      purity
    } = req.body;

    if (!lotUuid) {
      throw { code: 409, msg: "no data found" };
    }

    if (!resultUuid) {
      throw { code: 409, msg: "no data found" };
    }

    const getIdReplacement = {
      uuid: lotUuid
    };
    const lotDetail = await DbService.getIdFromUuid(
      getIdReplacement,
      "lot_data"
    );
    const lotId = lotDetail[0].id;

    const updateResultReplacement = {
      uuid: resultUuid,
      updated_at: new Date().toISOString(),
      updated_by: id,
      lot_id: lotId
    };

    if (stoneName) {
      updateResultReplacement.stone_name = stoneName;
    }
    if (weight) {
      updateResultReplacement.weight = weight;
    }
    if (unit) {
      updateResultReplacement.unit = unit;
    }
    if (cut) {
      updateResultReplacement.cut = cut;
    }
    if (shape) {
      updateResultReplacement.shape = shape;
    }
    if (color) {
      updateResultReplacement.color = color;
    }
    if (purity) {
      updateResultReplacement.purity = purity;
    }
    if (status === "ls") {
      await DbService.updateLsResult(updateResultReplacement);
    } else if (status === "planning") {
      await DbService.updatePlanResult(updateResultReplacement);
    } else if (status === "block") {
      await DbService.updateBlockResult(updateResultReplacement);
    } else if (status === "hpht") {
      await DbService.updateHphtResult(updateResultReplacement);
    }

    if (status === "ls" || status === "block" || status === "hpht") {
      const replacementObj = {
        lot_id: lotId
      };
      if (!historyUuid) {
        throw { code: 409, msg: "no data found" };
      }
      console.log("----------------------------------------------1");
      const getHistoryIdReplacement = {
        uuid: historyUuid
      };
      const lotHistory = await DbService.getIdFromUuid(
        getHistoryIdReplacement,
        "lot_history"
      );
      console.log("----------------------------------------------2");

      console.log("lotHistory", lotHistory);
      const historyId = lotHistory[0].id;

      const lastHistoryDetail = await DbService.getLastHistoryIdToUpdateStone(
        replacementObj
      );
      const lastHistoryId = lastHistoryDetail[0].id;

      if (historyId === lastHistoryId) {
        await DbService.updateStone(updateStoneToProcessReplacement);
      }
    }
    return Promise.resolve();
  }

  static async downloadPolishExcel(req, res) {
    const { lotId: lotUuid } = req.body;
    const uploadPath = `${__dirname}/../public/`;
    const fileName = `${uuidv4().toString()}.xlsx`;
    const getIdReplacement = {
      uuid: lotUuid
    };
    const lotDetail = await DbService.getIdFromUuid(
      getIdReplacement,
      "lot_data"
    );
    const lotId = lotDetail[0].id;

    const replacementStoneObj = {
      lot_id: lotId
    };
    const polishData = await DbService.getPolishDiamondDetail(
      replacementStoneObj
    );
    const xls = json2xls(polishData);
    fs.writeFileSync(`${uploadPath}${fileName}`, xls, "binary");
    const obj = {
      file: `localhost:3001/${fileName}`
    };
    return obj;
  }
};
