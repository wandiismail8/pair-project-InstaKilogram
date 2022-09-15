'use strict';

const fs = require('fs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse(fs.readFileSync('./data/profiles.json', 'utf-8'))
    data.forEach(el => {
      delete el.id
      el.updatedAt = el.createdAt = new Date()
      
    });
    return queryInterface.bulkInsert("Profiles", data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Profiles", null)
  }
};
