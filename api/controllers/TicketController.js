/**
 * TicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


let no = 1;

module.exports = {

  //Create a ticket
  create: async (req, res) => {
    try {
      // Get all params
      let params = req.allParams();
      console.log(params);
      console.log(req.userData);

      //Create new ticket in database and fetch and store it in to variable

      const place = await Place.findOne({name:params.place});

      const newTicket = await Ticket.create({
        username: params.username,
        place: params.place,
        of: place.id,
        ticketNo: params.place[0] + params.place[1] + no,
        processed: false,
        owner: req.userData.userId,
      }).fetch();

      //Give a reference to userId of ticket

      const user = await User.findOne({ id: req.userData.userId });
      if (!user) {
        return res.send({ message: "Unauthorized" });
      }
      user.ticket.push(newTicket.id);
      await User.update({ id: user.id }).set(user);

      //Change unprocessed ticket count in place

      place.unPTickets = place.unPTickets+1;
      await Place.update({name:place.name}).set(place);

      //Increment number to give unique number to its ticket
      no++;
      console.log(no);
      return res.ok(newTicket);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Find all the tickets as per conditions

  find: async (req, res) => {
    try {
      // Get all params
      let params = req.allParams();

      // Get all tickets of given place
      if (params.place) {
        const tickets = await Ticket.find({ place: params.place });
        return res.ok(tickets);
      } else {
        // Get all tickets as per its processed status
        const tickets = await Ticket.find({ processed: params.processed });
        return res.ok(tickets);
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Process the ticket

  update: async (req, res) => {
    try {
      // find the ticket into database by its params id
      let ticket = await Ticket.find({ id: req.params.id });
      // Process the ticket
      ticket[0].processed = true;
      console.log(ticket);

      // Update the ticket
      const updTicket = await Ticket.update(
        {
          id: req.params.id,
        },
        ticket[0]
      );

      //Change unprocessed ticket count in place

      const place = await Place.findOne({name:ticket[0].place});
      place.unPTickets = place.unPTickets-1;
      await Place.update({name:place.name}).set(place);
      return res.ok(updTicket);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
