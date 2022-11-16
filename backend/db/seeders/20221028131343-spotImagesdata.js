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
     return queryInterface.bulkInsert('SpotImages',[
      {
        spotId:1,
        url:"https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg",
        preview:true
      },
      {
        spotId:1,
        url:"https://image.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg",
        preview:false
      },
      {
        spotId:2,
        url:"images url",
        preview:true
      },
      {
        spotId:3,
        url:"images url",
        preview:true
      },
      {
        spotId:3,
        url:"images url",
        preview:false
      },
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op
     return queryInterface.bulkDelete('SpotImages',{
       spotId:{[Op.in]:[1,2,3]}
     },{})
  }
};
