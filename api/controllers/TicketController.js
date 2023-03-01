/**
 * TicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let no = 1;

module.exports = {
  create: async (req, res) => {
    try {
      let params = req.allParams();
      console.log(params);
      console.log(req.userData);
      const newTicket = await Ticket.create({
        username: params.username,
        place: params.place,
        ticketNo: params.place[0] + params.place[1] + no,
        processed: false,
      });
      no++;
      console.log(no);
      return res.ok(newTicket);
    } catch (err) {
      return res.serverError(err);
    }
  },
  find: async (req, res) => {
    try {
      let params = req.allParams();
      const tickets = await Ticket.find({ processed: params.processed });
      return res.ok(tickets);
    } catch (err) {
      return res.serverError(err);
    }
  },
  update: async (req, res) => {
    try {
      let ticket = await Ticket.find({ id: req.params.id });
      ticket[0].processed = true;
      console.log(ticket);
      const updTicket = await Ticket.update(
        {
          id: req.params.id,
        },
        ticket[0]
      );
      return res.ok(updTicket);
    } catch (err) {
      return res.serverError(err);
    }
  },
  delete: async (req, res) => {
    try {
      const delTicket = await Ticket.destroy({ id: req.params.id });
      return res.ok(delTicket);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
