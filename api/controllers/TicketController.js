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

      const currentDate = new Date().toLocaleDateString();

      //Create new ticket in database and fetch and store it in to variable

      let place = await Place.findOne({ id: req.params.id });
      const no =
        (await Ticket.count({
          place: req.params.id,
          // date: currentDate,//
        })) + 1;
      const newTicket = await Ticket.create({
        place: req.params.id,
        ticketNo: place.prefix + no,
        processed: false,
        owner: req.userData.id,
        date: currentDate,
      }).fetch();

      //Change unprocessed ticket count in place
      const unpT = await Ticket.count({
        place: req.params.id,
        // date: currentDate,
        processed: false,
      });

      //Populate the tickets collection of User & Place
      var popPlace = await Place.findOne({ id: req.params.id }).populate(
        "tickets"
      );
      var popUser = await User.findOne({ id: req.userData.id }).populate(
        "tickets"
      );
      console.log(popPlace);
      console.log(popUser);

      await Place.update({ id: req.params.id }).set({ unPTickets: unpT });

      return res.status(200).json(newTicket);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Find all the tickets as per conditions for Admin

  findA: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skipIndex = (page - 1) * limit;
    try {
      // Get all params
      let params = req.allParams();

      // Get all tickets of given place
      if (params.id) {
        const tickets = await Ticket.find({
          where: { place: params.id },
          limit: limit,
          skip: skipIndex,
        });
        return res.status(200).json(tickets);
      } else {
        // Get all tickets as per its processed status
        const tickets = await Ticket.find({
          where: { processed: params.processed },
          limit: limit,
          skip: skipIndex,
        });
        return res.status(200).json(tickets);
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Find all the tickets as per conditions for User

  findU: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skipIndex = (page - 1) * limit;
    try {
      // Get all params
      let params = req.allParams();
      // Get all tickets of current user as per its processed status
      const tickets = await Ticket.find({
        where: { owner: req.userData.id, processed: params.processed },
        limit: limit,
        skip: skipIndex,
      });
      return res.status(200).json(tickets);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Process the ticket

  update: async (req, res) => {
    try {
      //Check if ticket is processed or not
      const ticket = await Ticket.findOne({ id: req.params.id });
      if (ticket.processed === true) {
        return res.status(400).json("Ticket is already processed!");
      }

      // Update the ticket
      const updTicket = await Ticket.updateOne({ id: req.params.id })
        .set({
          processed: true,
        })
        .fetch();

      //Change unprocessed ticket count in place

      const unpT = await Ticket.count({
        place: updTicket.place,
        processed: false,
      });
      const updPlace = await Place.update({ id: updTicket.place })
        .set({
          unPTickets: unpT,
        })
        .fetch();
      console.log(updPlace);
      return res.status(200).json(updTicket);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
