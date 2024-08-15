const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);

  suite("Integration tests with chai-http", function () {
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
  });
});
