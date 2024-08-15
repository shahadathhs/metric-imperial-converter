'use strict';

const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler');
const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const { input } = req.query;

  const num = convertHandler.getNum(input);
  const unit = convertHandler.getUnit(input);

  // Handle invalid number and unit cases
  if (num === "invalid number" && unit === "invalid unit") {
    return res.json({ error: 'invalid number and unit' });
  }

  // Handle invalid number case
  if (num === "invalid number") {
    return res.json({ error: 'invalid number' });
  }

  // Handle invalid unit case
  if (unit === "invalid unit") {
    return res.json({ error: 'invalid unit' });
  }

  // Handle case where unit is valid but number is not provided
  if (num === "invalid number" && unit !== "invalid unit") {
    // Assume default number is 1 for valid unit
    const returnUnit = convertHandler.getReturnUnit(unit);
    const convertedNum = convertHandler.convert(1, unit);
    const string = convertHandler.getString(1, unit, returnUnit);

    return res.json({
      initNum: 1,
      initUnit: unit,
      returnNum: convertedNum,
      returnUnit: returnUnit,
      string: string
    });
  }

  // Continue with valid cases
  const returnUnit = convertHandler.getReturnUnit(unit);
  const convertedNum = convertHandler.convert(num, unit);
  const string = convertHandler.getString(num, unit, returnUnit);

  res.json({
    initNum: num,
    initUnit: unit,
    returnNum: convertedNum,
    returnUnit: returnUnit,
    string: string
  });
});

module.exports = function(app) {
  app.use('/api', router);
};
