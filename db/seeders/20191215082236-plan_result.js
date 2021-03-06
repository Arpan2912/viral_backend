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
      "plan_result",
      [
        {
          id: 1,
          u_uuid: uuidv4(),
          plan_name: "A",
          rough_id: 1,
          history_id: 2,
          person_id: 2,
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
          plan_name: "B",
          rough_id: 1,
          history_id: 2,
          person_id: 2,
          weight: "30",
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
          plan_name: "C",
          rough_id: 1,
          history_id: 2,
          person_id: 2,
          weight: "20",
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
          plan_name: "A",
          rough_id: 1,
          history_id: 4,
          person_id: 2,
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
          plan_name: "B",
          rough_id: 1,
          history_id: 4,
          person_id: 2,
          weight: "30",
          unit: "cent",
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
          plan_name: "C",
          rough_id: 1,
          history_id: 4,
          person_id: 2,
          weight: "20",
          unit: "cent",
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
          plan_name: "A",
          rough_id: 2,
          history_id: 8,
          person_id: 2,
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
          id: 8,
          u_uuid: uuidv4(),
          plan_name: "B",
          rough_id: 2,
          history_id: 8,
          person_id: 2,
          weight: "30",
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
