"use strict";
let datafire = require('datafire');

var google_sheets = require('@datafire/google_sheets').actions;

const SHEET_ID = "15bv6kNNBkXp4SkuZ5eVh00E7nrEqHAu382aYp2sqUyA";

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
      .then(_ => google_sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "A1:A" + INPUTS.length,
        valueInputOption: "USER_ENTERED",
        body: {
          values: [
            INPUTS.map(i => input[i.title])
          ],
        },
      }, context))
  },
});

const INPUTS = module.exports.inputs;

