function ConvertHandler() {
  this.getNum = function (input) {
    let result;

    // Match the numerical part, which could be a fraction or decimal
    let match = input.match(/^[\d.\/]+/);

    if (match) {
      result = match[0];

      if (result.includes("/")) {
        // Check for multiple fractions
        let fractionParts = result.split("/");
        if (fractionParts.length > 2) {
          return "invalid number";
        }

        // If it's a valid fraction, evaluate it
        let [numerator, denominator] = fractionParts;
        // Check if denominator is present and non-zero
        if (!denominator || parseFloat(denominator) === 0) {
          return "invalid number";
        }
        result = parseFloat(numerator) / parseFloat(denominator);
      } else {
        result = parseFloat(result);
      }
    } else {
      // Default to 1 if no number is provided
      result = 1;
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;

    // Match the unit part
    let match = input.match(/[a-zA-Z]+/);
    if (match) {
      result = match[0];

      if (!["gal", "L", "mi", "km", "lbs", "kg"].includes(result)) {
        return "invalid unit";
      }

      // If it's a valid unit, return it
      return result;
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
