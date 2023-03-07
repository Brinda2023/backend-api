/**
 * TicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //Create a ticket
  create: async (req, res) => {
    try {
      console.log(req.userData);

      //Create new ticket in database and fetch and store it in to variable

      const place = await Place.findOne({ name: req.body.place });
      const tickets = await Ticket.find({ place: req.body.place });
      const no = tickets.length + 1;
      const newTicket = await Ticket.create({
        username: req.body.username,
        place: req.body.place,
        of: place.id,
        ticketNo: place.prefix + no,
        processed: false,
        owner: req.userData.id,
      }).fetch();

      //Give a reference to userId of ticket
      
      req.userData.ticket.push(newTicket.id);
      await User.update({ id: req.userData.id }).set(req.userData);

      //Change unprocessed ticket count in place

      place.unPTickets = place.unPTickets + 1;
      await Place.update({ name: place.name }).set(place);

      return res.status(200).json(newTicket);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Find all the tickets as per conditions for Admin

  findA: async (req, res) => {
    try {
      // Get all params
      let params = req.allParams();

      // Get all tickets of given place
      if (params.place) {
        const tickets = await Ticket.find({
          place: params.place,
        });
        return res.status(200).json(tickets);
      } else {
        // Get all tickets as per its processed status
        const tickets = await Ticket.find({
          processed: params.processed,
        });
        return res.status(200).json(tickets);
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Find all the tickets as per conditions for User

  findU: async (req, res) => {
    try {
      // Get all params
      let params = req.allParams();
      // Get all tickets of current user as per its processed status
      const tickets = await Ticket.find({
        owner: req.userData.id,
        processed: params.processed,
      });
      return res.status(200).json(tickets);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Process the ticket

  update: async (req, res) => {
    try {
      // find the ticket into database by its params id
      let ticket = await Ticket.findOne({ id: req.params.id });
      // Process the ticket
      ticket.processed = true;
      console.log(ticket);

      // Update the ticket
      const updTicket = await Ticket.update(
        {
          id: req.params.id,
        },
        ticket
      );

      //Change unprocessed ticket count in place

      const place = await Place.findOne({ name: ticket.place });
      place.unPTickets = place.unPTickets - 1;
      await Place.update({ name: place.name }).set(place);
      return res.status(200).json(updTicket);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
