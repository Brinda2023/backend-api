/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /admin/login': 'AdminController.login',
  'GET /admin/logout': 'AdminController.logout',

  'POST /place': 'PlaceController.create',
  'GET /place': 'PlaceController.find',
  'GET /place/:id': 'PlaceController.findOne',
  'PATCH /place/:id': 'PlaceController.update',
  'DELETE /place/:id': 'PlaceController.delete',

  'POST /user/register': 'UserController.register',
  'POST /user/login': 'UserController.login',
  'GET /user/logout': 'UserController.logout',
  'GET /user': 'UserController.find',

  'POST /ticket/:id': 'TicketController.create',
  'GET /ticket/admin': 'TicketController.findA',
  'GET /ticket/user': 'TicketController.findU',
  'PATCH /ticket/:id': 'TicketController.update',
};
