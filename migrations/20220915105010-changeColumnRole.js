'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'user',
      allowNull: false
    });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.STRING,
    });
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
