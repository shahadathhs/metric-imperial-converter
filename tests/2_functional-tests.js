const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);

  suite("Integration tests with chai-http", function () {
    // #1
    test("Convert a valid input such as 10L", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "10L" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, "initNum");
          assert.property(res.body, "initUnit");
          assert.property(res.body, "returnNum");
          assert.property(res.body, "returnUnit");
          assert.property(res.body, "string");
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, "L");
          assert.equal(res.body.returnNum, 2.6417217685798895);
          assert.equal(res.body.returnUnit, "gal");
          assert.equal(
            res.body.string,
            "10 liters converts to 2.6417217685798895 gallons"
          );
          done();
        });
    });

    // #2
    test("Convert an invalid input such as 32g", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "32g" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "invalid unit");
          done();
        });
    });

    // #3
    test("Convert an invalid number such as 3/7.2/4kg", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "3/7.2/4kg" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "invalid number");
          done();
        });
    });

    // #4
    test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "3/7.2/4kilomegagram" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "invalid number and unit");
          done();
        });
    });

    // #5
    test("Convert with no number such as kg", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "kg" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, "initNum");
          assert.property(res.body, "initUnit");
          assert.property(res.body, "returnNum");
          assert.property(res.body, "returnUnit");
          assert.property(res.body, "string");
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, "kg");
          assert.equal(res.body.returnNum, 2.2046244201837775);
          assert.equal(res.body.returnUnit, "lbs");
          assert.equal(
            res.body.string,
            "1 kilograms converts to 2.2046244201837775 pounds"
          );
          done();
        });
    });
  });
});
