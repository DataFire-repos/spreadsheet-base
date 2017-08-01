"use strict";
let datafire = require('datafire');

var google_sheets = require('@datafire/google_sheets').actions;
module.exports = new datafire.Action({
  description: "Creates a new item in the spreadsheet",
  inputs: [{
    title: "name",
    type: "string",
    maxLength: 100,
    minLength: 1
  }, {
    title: "age",
    type: "integer",
    minimum: 0,
    maximum: 200
  }],
  handler: (input, context) => {
    return datafire.flow(context)
      .then(_ => google_sheets.spreadsheets.values.update({}, context))
  },
});
