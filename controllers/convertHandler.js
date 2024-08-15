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

    // Check if it's a valid unit
    if (!["gal", "L", "mi", "km", "lbs", "kg"].includes(initUnit)) {
      return "invalid unit";
    } else if (initUnit === "gal") {
      result = "L";
    } else if (initUnit === "L") {
      result = "gal";
    } else if (initUnit === "mi") {
      result = "km";
    } else if (initUnit === "km") {
      result = "mi";
    } else if (initUnit === "lbs") {
      result = "kg";
    } else if (initUnit === "kg") {
      result = "lbs";
    }

    // If it's a valid unit, return it
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    // Check if it's a valid unit
    if (!["gal", "L", "mi", "km", "lbs", "kg"].includes(unit)) {
      return "invalid unit";
    } else if (unit === "gal") {
      result = "gallons";
    } else if (unit === "L") {
      result = "liters";
    } else if (unit === "mi") {
      result = "miles";
    } else if (unit === "km") {
      result = "kilometers";
    } else if (unit === "lbs") {
      result = "pounds";
    } else if (unit === "kg") {
      result = "kilograms";
    }

    // If it's a valid unit, return it
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    // Check if it's a valid unit
    if (!["gal", "L", "mi", "km", "lbs", "kg"].includes(initUnit)) {
      return "invalid unit";
    } else if (initUnit === "gal") {
      result = initNum * galToL;
    } else if (initUnit === "L") {
      result = initNum / galToL;
    } else if (initUnit === "mi") {
      result = initNum * miToKm;
    } else if (initUnit === "km") {
      result = initNum / miToKm;
    } else if (initUnit === "lbs") {
      result = initNum * lbsToKg;
    } else if (initUnit === "kg") {
      result = initNum / lbsToKg;
    }

    // If it's a valid unit, return it
    return result;
  };

  this.getString = function (initNum, initUnit, returnUnit) {
    let result;
  
    // Check if both initUnit and returnUnit are valid
    if (!["gal", "L", "mi", "km", "lbs", "kg"].includes(initUnit) || !["gal", "L", "mi", "km", "lbs", "kg"].includes(returnUnit)) {
      return "invalid unit";
    }
  
    // Perform conversion
    const returnNum = this.convert(initNum, initUnit, returnUnit);
  
    // Construct the result string
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
