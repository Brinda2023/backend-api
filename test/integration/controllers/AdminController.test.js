var supertest = require("supertest");
var tokenAdmin;

describe("AdminController", () => {
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
        tokenAdmin = res.body.token;
        console.log(res.body);

        done();
      });
  });

  //logout
  it("admin logout", (done) => {
    supertest(sails.hooks.http.app)
      .get("/admin/logout")
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
