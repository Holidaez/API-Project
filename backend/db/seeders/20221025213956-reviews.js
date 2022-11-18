'use strict';

/** @type {import('sequelize-cli').Migration} */
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
     return queryInterface.bulkInsert('Reviews',[
      {
        spotId:1,
        userId:2,
        review:"OMG ITS SO HIGH TECH YASSSSSS",
        stars:5
      },
      {
        spotId:1,
        userId:2,
        review:"Batman is so cool",
        stars:4
      },
      {
        spotId:1,
        userId:2,
        review:"I Got to meet robin :D",
        stars:3
      },
      {
        spotId:2,
        userId:3,
        review:"Raven is my favorite",
        stars:4
      },
      {
        spotId:2,
        userId:3,
        review:"Starfire is such a great host",
        stars:4
      },
      {
        spotId:2,
        userId:3,
        review:"Its just a ... big ... T i guess",
        stars:2
      },
      {
        spotId:3,
        userId:2,
        review:"Jordan is really the GOAT",
        stars:5
      },
      {
        spotId:3,
        userId:2,
        review:"Jordans are the coolest shoes",
        stars:5
      },
      {
        spotId:3,
        userId:1,
        review:"Jordan has a great story",
        stars:5
      }
     ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */const Op = Sequelize.Op
    return queryInterface.bulkDelete('Reviews',{
      review:{[Op.in]:["OMG ITS SO HIGH TECH YASSSSSS","Its just a ... big ... T i guess","Jordan is really the GOAT",]}
    },{})
  }
};
