'use strict';

const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler');
const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const { input } = req.query;

  const num = convertHandler.getNum(input);
  const unit = convertHandler.getUnit(input);

  if (num === "invalid number" || unit === "invalid unit") {
    return res.json({ error: 'Invalid Input' });
  }

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
