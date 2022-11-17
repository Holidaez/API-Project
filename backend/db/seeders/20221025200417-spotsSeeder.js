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
     return queryInterface.bulkInsert('Spots',[
      {
        ownerId:1,
        address: '1234 Wayne Str',
        city:'Chicago',
        state:'Illinois',
        country:'United States',
        lat:'33.453',
        lng:'32.568',
        name:'The BatCave',
        description:'A luxurious multiBillion Estate',
        price:'464.78'
      },
      {
        ownerId:2,
        address:'2222 Titan Ave',
        city:'New York City',
        state:'New York',
        country:'Unite States',
        lat:'90',
        lng:'90.2',
        name:'Titan`s Tower',
        description:'Headquarters for the teen titans',
        price:'222.22'
      },
      {
        ownerId:3,
        address:'8889 Jordan St',
        city:'Atlanta',
        state:'Georgia',
        country:'United States',
        lat:'68.23',
        lng:'23.31',
        name:'Jordan`s club',
        description:'All of the Jordans ever',
        price:'672.90'
      },
      {
        ownerId:3,
        address:'8889 Jordan St',
        city:'Atlanta',
        state:'Georgia',
        country:'United States',
        lat:'68.23',
        lng:'23.31',
        name:'Jordan`s club',
        description:'All of the Jordans ever',
        price:'672.90'
      },
      {
        ownerId:3,
        address:'8889 Jordan St',
        city:'Atlanta',
        state:'Georgia',
        country:'United States',
        lat:'68.23',
        lng:'23.31',
        name:'Jordan`s club',
        description:'All of the Jordans ever',
        price:'672.90'
      },
      {
        ownerId:3,
        address:'8889 Jordan St',
        city:'Atlanta',
        state:'Georgia',
        country:'United States',
        lat:'68.23',
        lng:'23.31',
        name:'Jordan`s club',
        description:'All of the Jordans ever',
        price:'672.90'
      },
      {
        ownerId:3,
        address:'8889 Jordan St',
        city:'Atlanta',
        state:'Georgia',
        country:'United States',
        lat:'68.23',
        lng:'23.31',
        name:'Jordan`s club',
        description:'All of the Jordans ever',
        price:'672.90'
      },
      {
        ownerId:3,
        address:'8889 Jordan St',
        city:'Atlanta',
        state:'Georgia',
        country:'United States',
        lat:'68.23',
        lng:'23.31',
        name:'Jordan`s club',
        description:'All of the Jordans ever',
        price:'672.90'
      },
      {
        ownerId:3,
        address:'8889 Jordan St',
        city:'Atlanta',
        state:'Georgia',
        country:'United States',
        lat:'68.23',
        lng:'23.31',
        name:'Jordan`s club',
        description:'All of the Jordans ever',
        price:'672.90'
      },
      {
        ownerId:3,
        address:'8889 Jordan St',
        city:'Atlanta',
        state:'Georgia',
        country:'United States',
        lat:'68.23',
        lng:'23.31',
        name:'Jordan`s club',
        description:'All of the Jordans ever',
        price:'672.90'
      },
      {
        ownerId:3,
        address:'8889 Jordan St',
        city:'Atlanta',
        state:'Georgia',
        country:'United States',
        lat:'68.23',
        lng:'23.31',
        name:'Jordan`s club',
        description:'All of the Jordans ever',
        price:'672.90'
      },
      {
        ownerId:3,
        address:'8869 Jordan St',
        city:'Atlanta',
        state:'Georgia',
        country:'United States',
        lat:'68.23',
        lng:'23.31',
        name:'Jordan`s club',
        description:'All of the Jordans ever',
        price:'672.90'
      }
     ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Spots',{
      name:{[Op.in]:['The BatCave','Titan`s Tower','Jordan`s club']}
    },{})
  }
};
