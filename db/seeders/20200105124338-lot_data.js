const uuidv4 = require("uuidv4");

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
      "lot_data",
      [
        {
          id: 1,
          u_uuid: uuidv4(),
          lot_name: "1",
          rough_id: 1,
          weight: "1",
          unit: "carat",
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
          lot_name: "2",
          rough_id: 1,
          weight: "1",
          unit: "carat",
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
          lot_name: "3",
          rough_id: 1,
          weight: "1",
          unit: "carat",
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
