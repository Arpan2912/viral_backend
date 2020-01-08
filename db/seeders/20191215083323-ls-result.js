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
      "ls_result",
      [
        {
          id: 1,
          u_uuid: uuidv4(),
          stone_name: "A",
          lot_id: 1,
          history_id: 3,
          weight: "50",
          unit: "cent",
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
          stone_name: "B",
          lot_id: 1,
          history_id: 3,
          weight: "50",
          unit: "cent",
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
          stone_name: "C",
          lot_id: 1,
          history_id: 3,
          weight: "50",
          unit: "cent",
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
          stone_name: "A1",
          lot_id: 1,
          history_id: 5,
          weight: "50",
          unit: "cent",
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
          stone_name: "A2",
          lot_id: 1,
          history_id: 5,
          weight: "50",
          unit: "cent",
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
