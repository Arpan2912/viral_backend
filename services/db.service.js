const Sequelize = require("sequelize");
const uuidv4 = require("uuidv4");
const db = require("../db");

const {
  getBlockDetailOfRough,
  getBlockDetailOfRoughBasedOnHistoryId,
  getLsDetailOfRough,
  getLsDetailOfRoughBasedOnHistoryId,
  getPersonIdFromUuid,
  getPlanDetailOfRough,
  getPlanDetailOfRoughBasedOnHistoryId,
  getPlanResultIdFromUuid,
  getLotHistory,
  getRoughHistoryIdFromUuid,
  getRoughIdFromUuid,
  getLotIdFromUuid,
  insertBlockResult,
  insertLsResult,
  insertPerson,
  insertPlanResult,
  insertRough,
  insertLotData,
  insertLotHistory,
  qGetLotCurrentStatus,
  updatePerson,
  updateRough,
  updateLotData,
  getPersons,
  getRoughDetail,
  qGetRoughCurrentStatusByRoughId,
  updateLotHistory,
  getRoughList,
  getLotList,
  getLatestLotStatus,
  createUser,
  getUserDetail,
  qGetTotalLotCount,
  getRoughCount,
  getPersonCount,
  getLotTotalLabourForLot,
  getLotHistoryData,
  getBlockDetailForHistoryId,
  getLsDetailForHistoryId,
  getPlanDetailForHistoryId,
  getLotData,
  updateBlockResult,
  updateLsResult,
  updatePlanResult,
  insertActivityLog,
  insertStoneHistory,
  insertStoneToProcess,
  getStoneId,
  getStoneToProcessData,
  getStoneList,
  insertStone
} = require("../constants/constant.query");

module.exports = class DbService {
  static executeSqlQuery(query, replacements, operation, tableName) {
    return new Promise((resolve, reject) => {
      let queryType;
      if (operation === "insert") {
        queryType = Sequelize.QueryTypes.INSERT;
      } else if (operation === "update") {
        queryType = Sequelize.QueryTypes.UPDATE;
      } else if (operation === "select") {
        queryType = Sequelize.QueryTypes.SELECT;
      } else if (operation === "delete") {
        queryType = Sequelize.QueryTypes.DELETE;
      } else {
        queryType = Sequelize.QueryTypes.SELECT;
      }
      db.sequelize
        .query(query, { replacements, type: queryType })
        .then(data => {
          if (
            ["insert", "update", "delete"].includes(operation) &&
            tableName !== "activity_log"
          ) {
            const replacemenObj = {
              u_uuid: uuidv4(),
              replacement: JSON.stringify(replacements),
              table_name: tableName,
              result: JSON.stringify(data),
              operation,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              created_by: replacements.updated_by
                ? replacements.updated_by
                : null,
              updated_by: replacements.updated_by
                ? replacements.updated_by
                : null
            };
            try {
              DbService.executeSqlQuery(
                insertActivityLog,
                replacemenObj,
                "insert",
                "activity_log"
              );
            } catch (e) {
              console.error("e", e);
            }
          }
          return resolve(data);
        })
        .catch(err => {
          console.error("err", err);
          return reject(err);
        });
    });
  }

  static insertRecordToDb(replacemenObj, table) {
    let q = null;
    if (table === "person") {
      q = insertPerson;
    } else if (table === "roughs") {
      q = insertRough;
    } else if (table === "lot_history") {
      q = insertLotHistory;
    } else if (table === "plan_result") {
      q = insertPlanResult;
    } else if (table === "ls_result") {
      q = insertLsResult;
    } else if (table === "block_result") {
      q = insertBlockResult;
    } else if (table === "lot_data") {
      q = insertLotData;
    } else if (table === "user") {
      q = createUser;
    } else if (table === "stone_history") {
      q = insertStoneHistory;
    } else if (table === "stone_to_process") {
      q = insertStoneToProcess;
    } else if (table === "stones") {
      q = insertStone;
    } else {
      return Promise.reject({ msg: "" });
    }
    if (q === null) {
      return Promise.reject({ msg: "" });
    }
    return DbService.executeSqlQuery(q, replacemenObj, "insert", table);
  }

  static getUserDetail(replacemenObj) {
    return DbService.executeSqlQuery(getUserDetail, replacemenObj, "select");
  }

  static updateLotHistory(replacemenObj) {
    return DbService.executeSqlQuery(
      updateLotHistory(replacemenObj),
      replacemenObj,
      "update",
      "lot_history"
    );
  }

  static getLotData(replacemenObj) {
    return DbService.executeSqlQuery(getLotData, replacemenObj, "select");
  }

  static updatePerson(replacemenObj) {
    return DbService.executeSqlQuery(
      updatePerson(replacemenObj),
      replacemenObj,
      "update",
      "person"
    );
  }

  static getPersons(replacemenObj = {}) {
    return DbService.executeSqlQuery(getPersons, replacemenObj, "select");
  }

  static getPersonCount(replacemenObj = {}) {
    return DbService.executeSqlQuery(getPersonCount, replacemenObj, "select");
  }

  static getLatestLotStatus(replacemenObj = {}) {
    return DbService.executeSqlQuery(
      getLatestLotStatus,
      replacemenObj,
      "select"
    );
  }

  static getTotalLotCount(replacementObj) {
    return DbService.executeSqlQuery(
      qGetTotalLotCount,
      replacementObj,
      "select"
    );
  }

  static getTotalLabourForLot(replacementObj) {
    return DbService.executeSqlQuery(
      getLotTotalLabourForLot,
      replacementObj,
      "select"
    );
  }

  static getLotHistoryData(replacementObj) {
    return DbService.executeSqlQuery(
      getLotHistoryData,
      replacementObj,
      "select"
    );
  }

  static getRoughList(replacementObj) {
    return DbService.executeSqlQuery(getRoughList, replacementObj, "select");
  }

  static getRoughCount(replacementObj) {
    return DbService.executeSqlQuery(getRoughCount, replacementObj, "select");
  }

  static getLotList(roughId) {
    const replacement = {
      rough_id: roughId
    };
    return DbService.executeSqlQuery(getLotList, replacement, "select");
  }

  static getIdFromUuid(replacemenObj, table) {
    let q = null;
    if (table === "person") {
      q = getPersonIdFromUuid;
    } else if (table === "rough") {
      q = getRoughIdFromUuid;
    } else if (table === "rough_history") {
      q = getRoughHistoryIdFromUuid;
    } else if (table === "plan_result") {
      q = getPlanResultIdFromUuid;
    } else if (table === "lot_data") {
      q = getLotIdFromUuid;
    } else {
      return Promise.reject({ msg: "" });
    }
    if (q === null) {
      return Promise.reject({ msg: "" });
    }
    return DbService.executeSqlQuery(q, replacemenObj, "select");
  }

  static updateRough(replacemenObj) {
    return DbService.executeSqlQuery(
      updateRough(replacemenObj),
      replacemenObj,
      "update",
      "roughs"
    );
  }

  static updateLotData(replacemenObj) {
    return DbService.executeSqlQuery(
      updateLotData(replacemenObj),
      replacemenObj,
      "update",
      "lot_data"
    );
  }

  static getLotCurrentStatus(replacemenObj) {
    console.log("replacemenObj", replacemenObj);
    return DbService.executeSqlQuery(
      qGetLotCurrentStatus,
      replacemenObj,
      "select"
    );
  }

  static getRoughCurrentStatusByRoughId(replacemenObj) {
    return DbService.executeSqlQuery(
      qGetRoughCurrentStatusByRoughId,
      replacemenObj,
      "select"
    );
  }

  static getLotHistory(replacemenObj) {
    return DbService.executeSqlQuery(getLotHistory, replacemenObj, "select");
  }

  static getRoughDetail(replacemenObj) {
    return DbService.executeSqlQuery(getRoughDetail, replacemenObj, "select");
  }

  static updatePlanResult(replacementObj) {
    return DbService.executeSqlQuery(
      updatePlanResult(replacementObj),
      replacementObj,
      "update",
      "plan_result"
    );
  }

  static updateLsResult(replacementObj) {
    return DbService.executeSqlQuery(
      updateLsResult(replacementObj),
      replacementObj,
      "update",
      "ls_result"
    );
  }

  static updateBlockResult(replacementObj) {
    return DbService.executeSqlQuery(
      updateBlockResult(replacementObj),
      replacementObj,
      "update",
      "block_result"
    );
  }

  static getPlanDetailOfRough(replacemenObj) {
    return DbService.executeSqlQuery(
      getPlanDetailOfRough,
      replacemenObj,
      "select"
    );
  }

  static getPlanDetailOfRoughForHistoryId(replacemenObj) {
    return DbService.executeSqlQuery(
      getPlanDetailForHistoryId,
      replacemenObj,
      "select"
    );
  }

  static getLsDetailOfRough(replacemenObj) {
    return DbService.executeSqlQuery(
      getLsDetailOfRough,
      replacemenObj,
      "select"
    );
  }

  static getLsDetailOfRoughForHistoryId(replacemenObj) {
    return DbService.executeSqlQuery(
      getLsDetailForHistoryId,
      replacemenObj,
      "select"
    );
  }

  static getBlockDetailOfRough(replacemenObj) {
    return DbService.executeSqlQuery(
      getBlockDetailOfRough,
      replacemenObj,
      "select"
    );
  }

  static getBlockDetailOfRoughForHistoryId(replacemenObj) {
    return DbService.executeSqlQuery(
      getBlockDetailForHistoryId,
      replacemenObj,
      "select"
    );
  }

  static getPlanDetailOfRoughBasedOnHistoryId(replacemenObj) {
    return DbService.executeSqlQuery(
      getPlanDetailOfRoughBasedOnHistoryId,
      replacemenObj,
      "select"
    );
  }

  static getLsDetailOfRoughBasedOnHistoryId(replacemenObj) {
    return DbService.executeSqlQuery(
      getLsDetailOfRoughBasedOnHistoryId,
      replacemenObj,
      "select"
    );
  }

  static getBlockDetailOfRoughBasedOnHistoryId(replacemenObj) {
    return DbService.executeSqlQuery(
      getBlockDetailOfRoughBasedOnHistoryId,
      replacemenObj,
      "select"
    );
  }

  static getStoneId(replacemenObj) {
    return DbService.executeSqlQuery(getStoneId, replacemenObj, "select");
  }

  static getStoneToProcessData(replacemenObj) {
    return DbService.executeSqlQuery(
      getStoneToProcessData,
      replacemenObj,
      "select"
    );
  }

  static getStoneList(replacemenObj) {
    return DbService.executeSqlQuery(getStoneList, replacemenObj, "select");
  }
};
