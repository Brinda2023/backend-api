var supertest = require("supertest");
var tokenAdmin;
var tokenUser;

describe("PlaceController", () => {
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
  it("create a place", (done) => {
    supertest(sails.hooks.http.app)
      .post("/place")
      .send({
        name: "Kotak",
      })
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
  //find
  it("only registered user can find all the places from database", (done) => {
    supertest(sails.hooks.http.app)
      .get("/place")
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
  //findOne
  it("only admin can find place by its id", (done) => {
    supertest(sails.hooks.http.app)
      .get("/place/6412bd8ddd15fe55ffffb1c5")
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
  //update
  it("only admin can update a place", (done) => {
    supertest(sails.hooks.http.app)
      .patch("/place/6412bd8ddd15fe55ffffb1c5")
      .field("name", "Kitak")
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
  //delete
  it("only admin can delete a place", (done) => {
    supertest(sails.hooks.http.app)
      .delete("/place/6412bd8ddd15fe55ffffb1c5")
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
