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
      "stone_history",
      [
        {
          id: 1,
          u_uuid: uuidv4(),
          history_id: 4,
          lot_id: 1,
          stone_id: 1,
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
          history_id: 4,
          lot_id: 1,
          stone_id: 2,
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
          history_id: 5,
          lot_id: 1,
          stone_id: 1,
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
          history_id: 6,
          lot_id: 1,
          stone_id: 3,
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
          history_id: 7,
          lot_id: 1,
          stone_id: 4,
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
          history_id: 7,
          lot_id: 1,
          stone_id: 5,
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
          history_id: 8,
          lot_id: 1,
          stone_id: 4,
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
          history_id: 9,
          lot_id: 1,
          stone_id: 5,
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
          history_id: 10,
          lot_id: 1,
          stone_id: 3,
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
