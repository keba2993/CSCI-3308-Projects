// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
  // Sample test case given to test / endpoint.
  it("Returns the default welcome message", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        // console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        assert.strictEqual(res.body.message, "Welcome!");
        done();
      });
  });

  it("1. Checks for type of the response and size of array != 0", (done) => {
    chai
      .request(server)
      .get("/reviews")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.reviews).to.be.a('array');
        expect(res.body.reviews).to.not.have.lengthOf(0);
        done();
      });
  });

  it("2. check that filter accurately displays meals", (done) => {
    chai
      .request(server)
      .post("/reviews/filter")
      .send({meal_filter: 'Pancakes'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.reviews[0].meal_name).to.equal('Pancakes');
        done();
      });
  });

});
