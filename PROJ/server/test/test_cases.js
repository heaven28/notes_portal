const chai = require('chai');
const chaiHttp = require('chai-http');
const auth = require('../controllers/Auth');

//Assertion Styles
// const assert = chai.assert;
const { expect } = chai;
chai.use(chaiHttp);

describe("Server!", () => {
    it("/GET Token initializations", () => {
      chai
        .request(auth)
        .get("/init")
        .end((err, res) => {
          expect(res).to.have.status(201);
            done();
        });
    });
    it("/POST /api/auth/register as an existing user", () => {
        let result = chai
          .request(auth)
          .post("/register")
          .send({
            name: "spe",
            email: "spe@iiit.org",
            password: "1234"
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
          })
      });
      it("/POST /api/auth/register as a new user", () => {
        chai
          .request(auth)
          .post("/register")
          .send({
            name: "test_user",
            email: "test_user@iiit.org",
            password: "1234"
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
          })
      });
});