const PersonService = require("../services/person.service");
const CommonService = require("../services/common.service");

module.exports = class PersonController {
  static async addPerson(req, res) {
    try {
      await PersonService.addPerson(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "Person added successfully",
        null
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async getPersons(req, res) {
    try {
      const persons = await PersonService.getPersons(req, res);
     
      const responseObj = CommonService.prepareSuccessResponse(
        "Get person successfully",
        persons
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }

  static async updatePerson(req, res) {
    try {
      await PersonService.updatePerson(req, res);
      const responseObj = CommonService.prepareSuccessResponse(
        "Update person successfully",
        null
      );
      return res.status(200).send(responseObj);
    } catch (e) {
      CommonService.logErrorAndSendResponse(e, res, null);
    }
  }
}