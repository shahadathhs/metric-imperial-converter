const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");
const { test, suite } = require("mocha");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("getNum Function", function () {
    // #1
    test("convertHandler should correctly read a whole number input", function () {
      assert.equal(convertHandler.getNum("32L"), 32);
    });
    // #2
    test("convertHandler should correctly read a decimal number input", function () {
      assert.equal(convertHandler.getNum("3.2L"), 3.2);
    });
    // #3
    test("convertHandler should correctly read a fractional input", function () {
      assert.equal(convertHandler.getNum("1/2L"), 0.5);
    });
    // #4
    test("convertHandler should correctly read a fractional input with a decimal", function () {
      assert.equal(convertHandler.getNum("3.0/1.5L"), 2);
    });
    // #5
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
      assert.equal(convertHandler.getNum("3/2/3"), "invalid number");
    });
    // #6
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
      assert.equal(convertHandler.getNum("L"), 1);
    });
  });

  suite("getUnit Function", function () { 
    // #1
    test("convertHandler should correctly read each valid input unit", function () {
      assert.equal(convertHandler.getUnit("L"), "L");
      assert.equal(convertHandler.getUnit("gal"), "gal");
      assert.equal(convertHandler.getUnit("mi"), "mi");
      assert.equal(convertHandler.getUnit("km"), "km");
      assert.equal(convertHandler.getUnit("lbs"), "lbs");
    });
    // #2
    test("convertHandler should correctly return an error for an invalid input unit", function () {
      assert.equal(convertHandler.getUnit("x"), "invalid unit");
    })
  });
});
