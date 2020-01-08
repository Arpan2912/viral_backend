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
      "stones",
      [
        {
          id: 1,
          u_uuid: uuidv4(),
          lot_id: 1,
          rough_id: 1,
          stone_name: "A",
          weight: "15",
          unit: "cent",
          process: "ls",
          have_child: true,
          parent_id: null,
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
          rough_id: 1,
          stone_name: "B",
          weight: "15",
          unit: "cent",
          process: "ls",
          have_child: null,
          parent_id: null,
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
          rough_id: 1,
          stone_name: "C",
          weight: "15",
          unit: "cent",
          process: "ls",
          have_child: null,
          parent_id: null,
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
          rough_id: 1,
          stone_name: "A1",
          weight: "15",
          unit: "cent",
          process: "ls",
          have_child: null,
          parent_id: 1,
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
          rough_id: 1,
          stone_name: "A2",
          weight: "15",
          unit: "cent",
          process: "ls",
          have_child: null,
          parent_id: 1,
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
