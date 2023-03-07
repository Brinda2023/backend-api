/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,

  PlaceController: {
    "create": "check-auth-admin",
    "findOne": "check-auth-admin",
    "find": "check-auth-user",
    "update": "check-auth-admin",
    "delete": "check-auth-admin"
  },
  TicketController: {
    "create": "check-auth-user",
    "findA": "check-auth-admin",
    "findU": "check-auth-user",
    "update": "check-auth-admin"
  },
  AdminController: {
    "logout": "check-auth-admin",
  },
  UserController: {
    "logout": "check-auth-user",
    "find": "check-auth-admin"
  }
};
