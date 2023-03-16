var supertest = require("supertest");
var tokenAdmin;
var tokenUser;

describe("TicketController", () => {
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

  //create
  it("create a ticket", (done) => {
    supertest(sails.hooks.http.app)
      .post("/ticket/6412c97daff58461d6d0473f")
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
  //findA
  it("find all the tickets as per conditions for Admin", (done) => {
    supertest(sails.hooks.http.app)
      .get("/ticket/admin")
      .field("id","6412c97daff58461d6d0473f")
      .field("page",1)
      .field("limit",2)
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
  //findU
  it("find all the tickets as per conditions for User", (done) => {
    supertest(sails.hooks.http.app)
      .get("/ticket/user")
      .field("processed", false)
      .field("page", 1)
      .field("limit", 2)
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
  //update
  it("process the ticket", (done) => {
    supertest(sails.hooks.http.app)
      .patch("/ticket/6412caea91418d63ecf3e7c1")
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
