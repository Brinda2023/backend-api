/**
 * Ticket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true,
    },
    place: {
      type: 'string',
      required: true,
    },
    ticketNo: {
      type: 'string',
      required: true,
    },
    processed: {
      type: 'boolean',
      required: true,
    }
  },

};

