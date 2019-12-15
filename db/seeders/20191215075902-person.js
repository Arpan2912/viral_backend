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
      "persons",
      [
        {
          id: 1,
          u_uuid: uuidv4(),
          first_name: "abhay",
          last_name: "shah",
          email: "shahabhay05@gmail.com",
          phone: "7405111385",
          address: "chokshi",
          designation: "employee",
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          u_uuid: uuidv4(),
          first_name: "agam",
          last_name: "shah",
          email: "agam@gmail.com",
          phone: "7474747474",
          address: "chokshi",
          designation: "employee",
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          u_uuid: uuidv4(),
          first_name: "saurabh",
          last_name: "shah",
          email: "saurabh@gmail.com",
          phone: "7474747471",
          address: "chokshi",
          designation: "employee",
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 4,
          u_uuid: uuidv4(),
          first_name: "viral",
          last_name: "shah",
          email: "viral@gmail.com",
          phone: "7474747472",
          address: "chokshi",
          designation: "employee",
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 5,
          u_uuid: uuidv4(),
          first_name: "yash",
          last_name: "shah",
          email: "yash@gmail.com",
          phone: "7474747473",
          address: "chokshi",
          designation: "employee",
          is_active: true,
          is_deleted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
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
