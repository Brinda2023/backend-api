/**
 * Place.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      unique: true
    },
    unPTickets: {
      type: 'number',
    },
    prefix: {
      type: 'string',
      unique: true
    }, 
    owner: {
      model: 'admin',
    },
    tickets: {
      type: 'json',
      columnType: 'array',
      defaultsTo: [],
    },
  },

};

