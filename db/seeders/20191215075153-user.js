const uuidv4 = require("uuidv4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          u_uuid: uuidv4(),
          first_name: "arpan",
          last_name: "shah",
          email: "shaharpan05@gmail.com",
          phone: "9033340163",
          password: "12345",
          user_type: "admin",
          is_active: true,
          is_deleted: false,
          last_login: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          u_uuid: uuidv4(),
          first_name: "viral",
          last_name: "shah",
          email: "shahviral05@gmail.com",
          phone: "9999999999",
          password: "12345",
          user_type: "user",
          is_active: true,
          is_deleted: false,
          last_login: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
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
