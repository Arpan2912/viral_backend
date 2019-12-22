const Sequelize = require("sequelize");
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
  getRoughHistory,
  getRoughHistoryIdFromUuid,
  getRoughIdFromUuid,
  getLotIdFromUuid,
  insertBlockResult,
  insertLsResult,
  insertPerson,
  insertPlanResult,
  insertRough,
  insertLotData,
  insertRoughHistory,
  qGetRoughCurrentStatus,
  updatePerson,
  updateRough,
  updateLotData,
  getPersons,
  getRoughDetail,
  qGetRoughCurrentStatusByRoughId,
  updateRoughHistory,
  getRoughList,
  getLotList
} = require("../constants/constant.query");

module.exports = class DbService {
  static executeSqlQuery(query, replacements, operation) {
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
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  static insertRecordToDb(replacemenObj, table) {
    let q = null;
    if (table === "person") {
      q = insertPerson;
    } else if (table === "rough") {
      q = insertRough;
    } else if (table === "rough_history") {
      q = insertRoughHistory;
    } else if (table === "plan_result") {
      q = insertPlanResult;
    } else if (table === "ls_result") {
      q = insertLsResult;
    } else if (table === "block_result") {
      q = insertBlockResult;
    } else if (table === "lot_data") {
      q = insertLotData;
    } else {
      return Promise.reject({ msg: "" });
    }
    if (q === null) {
      return Promise.reject({ msg: "" });
    }
    return DbService.executeSqlQuery(q, replacemenObj, "insert");
  }

  static updateRoughHistory(replacemenObj) {
    return DbService.executeSqlQuery(
      updateRoughHistory,
      replacemenObj,
      "update"
    );
  }

  static updatePerson(replacemenObj) {
    return DbService.executeSqlQuery(
      updatePerson(replacemenObj),
      replacemenObj,
      "update"
    );
  }

  static getPersons(replacemenObj = {}) {
    return DbService.executeSqlQuery(getPersons, replacemenObj, "select");
  }

  static getRoughList() {
    return DbService.executeSqlQuery(getRoughList, null, "select");
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
      "update"
    );
  }

  static updateLotData(replacemenObj) {
    return DbService.executeSqlQuery(
      updateLotData(replacemenObj),
      replacemenObj,
      "update"
    );
  }

  static getRoughCurrentStatus(replacemenObj) {
    return DbService.executeSqlQuery(
      qGetRoughCurrentStatus,
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

  static getRoughHistory(replacemenObj) {
    return DbService.executeSqlQuery(getRoughHistory, replacemenObj, "select");
  }

  static getRoughDetail(replacemenObj) {
    return DbService.executeSqlQuery(getRoughDetail, replacemenObj, "select");
  }

  static getPlanDetailOfRough(replacemenObj) {
    return DbService.executeSqlQuery(
      getPlanDetailOfRough,
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

  static getBlockDetailOfRough(replacemenObj) {
    return DbService.executeSqlQuery(
      getBlockDetailOfRough,
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
};
