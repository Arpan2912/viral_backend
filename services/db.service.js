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
  insertBlockResult,
  insertLsResult,
  insertPerson,
  insertPlanResult,
  insertRough,
  insertRoughHistory,
  qGetRoughCurrentStatus,
  updatePerson,
  getPersons
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
    } else {
      return Promise.reject({ msg: "" });
    }
    if (q === null) {
      return Promise.reject({ msg: "" });
    }
    return DbService.executeSqlQuery(q, replacemenObj, "insert");
  }

  static updatePerson(replacemenObj) {
    return DbService.executeSqlQuery(updatePerson, replacemenObj, "update");
  }

  static getPersons(replacemenObj = {}) {
    return DbService.executeSqlQuery(getPersons, replacemenObj, "select");
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
    } else {
      return Promise.reject({ msg: "" });
    }
    if (q === null) {
      return Promise.reject({ msg: "" });
    }
    return DbService.executeSqlQuery(q, replacemenObj, "select");
  }

  static getRoughCurrentStatus(replacemenObj) {
    return DbService.executeSqlQuery(
      qGetRoughCurrentStatus,
      replacemenObj,
      "select"
    );
  }

  static getRoughHistory(replacemenObj) {
    return DbService.executeSqlQuery(getRoughHistory, replacemenObj, "select");
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
