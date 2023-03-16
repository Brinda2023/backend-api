var supertest = require("supertest");
var tokenAdmin;
var tokenUser;

describe("UserController", () => {
  //login
  it("admin login", (done) => {
    supertest(sails.hooks.http.app)
      .post("/admin/login")
      .send({
        email: "dabhibrinda95@gmail.com",
        password: "brinda",
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body);
        tokenAdmin = res.body.token;

        done();
      });
  });

  // register
  it("register a user", (done) => {
    supertest(sails.hooks.http.app)
      .post("/user/register")
      .send({
        username: "user1",
        email: "user1@gmail.com",
        password: "user1pw",
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body);

        done();
      });
  });

  // login
  it("login a user", (done) => {
    supertest(sails.hooks.http.app)
      .post("/user/login")
      .send({
        email: "user1@gmail.com",
        password: "user1pw",
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body);
        tokenUser = res.body.token;

        done();
      });
  });

  // logout
  it("logout a user", (done) => {
    supertest(sails.hooks.http.app)
      .get("/user/logout")
      .set("Authorization", `Bearer ${tokenUser}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        console.log(res.body);

        done();
      });
  });

  // find
  it("should get all the users from the database", (done) => {
    supertest(sails.hooks.http.app)
      .get("/user")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        console.log(res.body);

        done();
      });
  });
});
