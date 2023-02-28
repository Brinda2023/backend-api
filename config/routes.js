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
  'POST /admin/register': 'AdminController.register',
  'POST /admin/login': 'AdminController.login',
  'POST /admin/logout': 'AdminController.logout',
  'GET /admin': 'AdminController.find',

  'POST /place': 'PlaceController.create',
  'GET /place': 'PlaceController.find',
  'PUT /place': 'PlaceController.update',
  'DELETE /place': 'PlaceController.delete',

  'POST /user/register': 'UserController.register',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',
  'GET /user': 'UserController.find',

  'POST /ticket': 'TicketController.create',
  'GET /ticket': 'TicketController.find',
  'PUT /ticket': 'TicketController.update',
  'DELETE /ticket': 'TicketController.delete',
};
