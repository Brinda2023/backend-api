/**
 * Ticket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    place: {
      model: 'place',
    },
    ticketNo: {
      type: 'string',
      unique: true
    },
    processed: {
      type: 'boolean',
    },
    owner: {
      model: 'user',
    },
    date: {
      type: 'string',
    }
  },

};

