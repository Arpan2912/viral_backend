const uuidv4 = require("uuidv4");

const nextDay = new Date();

nextDay.setDate(nextDay.getDate() + 1);
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "lot_history",
      [
        {
          id: 1,
          u_uuid: uuidv4(),
          lot_id: 1,
          status: "galaxy",
          person_id: 1,
          submitted_to_person_id: 2,
          dollar: "70",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 1,
          updated_by: 1
        },
        {
          id: 2,
          u_uuid: uuidv4(),
          lot_id: 1,
          status: "planning",
          person_id: 1,
          submitted_to_person_id: 2,
          dollar: "70",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 1,
          updated_by: 1
        },
        {
          id: 3,
          u_uuid: uuidv4(),
          lot_id: 1,
          status: "ls",
          person_id: 1,
          submitted_to_person_id: 2,
          dollar: "70",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 1,
          updated_by: 1
        },
        {
          id: 4,
          u_uuid: uuidv4(),
          lot_id: 1,
          status: "planning",
          person_id: 1,
          submitted_to_person_id: 2,
          dollar: "70",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 1,
          updated_by: 1
        },
        {
          id: 5,
          u_uuid: uuidv4(),
          lot_id: 1,
          status: "ls",
          person_id: 1,
          submitted_to_person_id: 2,
          dollar: "70",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 1,
          updated_by: 1
        },
        {
          id: 6,
          u_uuid: uuidv4(),
          lot_id: 1,
          status: "planning",
          person_id: 1,
          submitted_to_person_id: 2,
          dollar: "70",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 1,
          updated_by: 1
        },
        {
          id: 7,
          u_uuid: uuidv4(),
          lot_id: 1,
          status: "planning",
          person_id: 1,
          submitted_to_person_id: 2,
          dollar: "70",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 1,
          updated_by: 1
        },
        {
          id: 8,
          u_uuid: uuidv4(),
          lot_id: 1,
          status: "block",
          person_id: 1,
          submitted_to_person_id: 2,
          dollar: "70",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 1,
          updated_by: 1
        },
        {
          id: 9,
          u_uuid: uuidv4(),
          lot_id: 1,
          status: "block",
          person_id: 1,
          submitted_to_person_id: 2,
          dollar: "70",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 1,
          updated_by: 1
        },
        {
          id: 10,
          u_uuid: uuidv4(),
          lot_id: 1,
          status: "block",
          person_id: 1,
          submitted_to_person_id: 2,
          dollar: "70",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 1,
          updated_by: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
