"use strict";
let datafire = require('datafire');
let inputs = require('./create').inputs;

var google_sheets = require('@datafire/google_sheets').actions;
module.exports = new datafire.Action({
  description: "",
  inputs: [{
    title: "input2",
    type: "string"
  }, {
    title: "wnput2",
    type: "string"
  }],
  handler: (input, context) => {
    return datafire.flow(context)
      .then(_ => google_sheets.spreadsheets.values.get({
        spreadsheetId: "15bv6kNNBkXp4SkuZ5eVh00E7nrEqHAu382aYp2sqUyA",
        range: "A1:A" + inputs.length,
      }, context))
  },
});
