/**
 * PlaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    try {
      let params = req.allParams();
      console.log(params);
      const newPlace = await Place.create({
        name: params.name,
        unPTickets: 0,
        prefix: params.name[0] + params.name[1],
      });
      return res.ok(newPlace);
    } catch (err) {
      return res.serverError(err);
    }
  },

  find: async (req, res) => {
    try {
      const places = await Place.find();
      return res.ok(places);
    } catch (err) {
      return res.serverError(err);
    }
  },

  delete: async (req, res) => {
    try {
      const delPlace = await Place.destroy({ id: req.params.id });
      return res.ok(delPlace);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
