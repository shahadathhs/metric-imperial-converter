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
    });
  });

  suite("getReturnUnit Function", function () {
    // #1
    test("convertHandler should correctly return the unit for each valid input unit", function () {
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    });
  });

  suite("spellOutUnit Function", function () {
    // #1
    test("convertHandler should correctly spell out and return the corresponding unit for each valid input unit", function () {
      assert.equal(convertHandler.spellOutUnit("L"), "liters");
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    });
  });

  suite("convert Function", function () {
    // #1
    test("convertHandler should correctly convert gal to L", function () {
      assert.equal(convertHandler.convert(5, "gal"), 18.92705);
    });
    // #2
    test("convertHandler should correctly convert L to gal", function () {
      assert.equal(convertHandler.convert(5, "L"), 1.32086);
    });
    // #3
    test("convertHandler should correctly convert mi to km", function () {
      assert.equal(convertHandler.convert(5, "mi"), 8.0467);
    });
    // #4
    test("convertHandler should correctly convert km to mi", function () {
      assert.equal(convertHandler.convert(5, "km"), 3.10686);
    });
    // #5
    test("convertHandler should correctly convert lbs to kg", function () {
      assert.equal(convertHandler.convert(5, "lbs"), 2.26796);
    });
    // #6
    test("convertHandler should correctly convert kg to lbs", function () {
      assert.equal(convertHandler.convert(5, "kg"), 11.02312);
    });
  });

  suite("getString Function", function () {
    test("convertHandler should correctly provide the correct string output", function () {
      assert.equal(convertHandler.getString(5, "gal", "L"), "5 gallons converts to 18.92705 liters");
      assert.equal(convertHandler.getString(5, "L", "gal"), "5 liters converts to 1.32086 gallons");
      assert.equal(convertHandler.getString(5, "mi", "km"), "5 miles converts to 8.0467 kilometers");
      assert.equal(convertHandler.getString(5, "km", "mi"), "5 kilometers converts to 3.10686 miles");
      assert.equal(convertHandler.getString(5, "lbs", "kg"), "5 pounds converts to 2.26796 kilograms");
      assert.equal(convertHandler.getString(5, "kg", "lbs"), "5 kilograms converts to 11.02312 pounds");
    });
  });  
});
