"use strict";
let datafire = require('datafire');

var google_sheets = require('@datafire/google_sheets').actions;
module.exports = new datafire.Action({
  inputs: [{
    title: "title",
    type: "string"
  }],
  handler: (input, context) => {
    return datafire.flow(context)
      .then(_ => google_sheets.spreadsheets.create({}, context))
  },
});
