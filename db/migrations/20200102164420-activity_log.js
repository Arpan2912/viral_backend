module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("activity_log", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      u_uuid: {
        allowNull: false,
        type: Sequelize.UUID
      },
      table_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      replacement: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      result: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      operation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("activity_log");

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
