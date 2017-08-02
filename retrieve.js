"use strict";
let datafire = require('datafire');
let google_sheets = require('@datafire/google_sheets').actions;
let inputs = require('./create').inputs;

function getColumnLetter(idx) {
  return String.fromCharCode(idx + 64);
}

const PAGE_SIZE = 5;

module.exports = new datafire.Action({
  description: "",
  handler: (input, context) => {
    let startRow = 1;
    let endRow = startRow + PAGE_SIZE - 1;
    let startCol = 1;
    let endCol = inputs.length;
    return datafire.flow(context)
      .then(_ => google_sheets.spreadsheets.values.get({
        spreadsheetId: "15bv6kNNBkXp4SkuZ5eVh00E7nrEqHAu382aYp2sqUyA",
        range: getColumnLetter(startCol) + startRow + ':' + getColumnLetter(endCol) + endRow,
      }, context))
      .then(data => {
        return data.values.map((row, rowNum) => {
          let obj = {id: rowNum + 1};
          inputs.forEach((input, idx) => {
            obj[input.title] = row[idx]
          });
          return obj;
        })
      })
  },
});
