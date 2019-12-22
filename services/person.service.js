const uuidv4 = require("uuidv4");
const DbService = require("../services/db.service");

module.exports = class PersonService {
  static async addPerson(req, res) {
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      company = null,
      designation
    } = req.body;

    const obj = {
      uuid: uuidv4(),
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      address,
      designation,
      company,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: true,
      is_deleted: false
    };

    try {
      await DbService.insertRecordToDb(obj, "person");
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async updatePerson(req, res) {
    try {
      const {
        firstName = null,
        lastName = null,
        phone = null,
        email = null,
        address = null,
        designation = null,
        company = null,
        personId: personUuid = null
      } = req.body;

      if (!personUuid) {
        throw { code: 409, msg: "please select person" };
      }

      const personObj = { uuid: personUuid };
      const personDetail = await DbService.getIdFromUuid(personObj, "person");
      const personId = personDetail[0].id;

      const updateObj = {
        updated_at: new Date().toISOString(),
        person_id: personId
      };

      if (firstName) {
        updateObj.first_name = firstName;
      }
      if (lastName) {
        updateObj.last_name = lastName;
      }
      if (address) {
        updateObj.address = address;
      }
      if (phone) {
        updateObj.phone = phone;
      }
      if (email) {
        updateObj.email = email;
      }
      if (designation) {
        updateObj.designation = designation;
      }
      if (company) {
        updateObj.company = company;
      }
      await DbService.updatePerson(updateObj);
      return Promise.resolve();
    } catch (e) {
      console.error("e", e);
      return Promise.reject(e);
    }
  }

  static async getPersons(req, res) {
    try {
      const persons = await DbService.getPersons();
      return Promise.resolve(persons);
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
