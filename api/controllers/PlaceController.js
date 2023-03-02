/**
 * PlaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// Only admin can create a place

module.exports = {
  create: async (req, res) => {
    try {
      // Get all params
      let params = req.allParams();
      console.log(params);
      // Create new place in database
      const newPlace = await Place.create({
        name: params.name,
        unPTickets: 0,
        prefix: params.name[0] + params.name[1],
        owner: req.userData.userId,
      });
      return res.ok(newPlace);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Only admin can find all the places from database

  find: async (req, res) => {
    try {
      const places = await Place.find();
      return res.ok(places);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
