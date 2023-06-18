/*
* Function takes name of a column in a active spreadsheet.
* It then returns number of rows in that column and index of the given column name in
* the spreadsheet
* @param {String} colName Column Name
* @param {String} SheetName Sheet Name
* @returns numner || null
*/
function getLastNonEmptyRowInColumn(colName = "Tasks", sheetName = "Daily Tasks") {
  try {
    let sheet = getSpreadsheet(sheetName);

    let colIndex = findColIndex(colName, sheetName);
    //console.log(colIndex);

    if (!colIndex) throw { error: "No Column Name Found" };

    let maxRows = sheet.getMaxRows();

    // ger all the values with emtpy rows
    let columnValues = sheet
      .getRange(2, colIndex, maxRows, 1)
      .getValues()
      .flat();

    let columnValuesReverse = [...columnValues].reverse();
    //console.log(columnValuesReverse);

    // find first non empty array in the url list and subtract it with 1000
    // then add 1 becuase range started from 2.
    let firstNonEmptyCell = columnValuesReverse.findIndex((el) => el !== "");

    // the last row in url column if all rows are empty then return 2
    let lastRowInCol =
      firstNonEmptyCell !== -1 ? maxRows - firstNonEmptyCell + 1 : 2;

   // console.log(lastRowInCol);
    return lastRowInCol;
  } catch (e) {

    if (e.error === "No Column Name Found") {
      //console.log("No column found");
      return null;
    }

  }
}

/**
 * This Function takes name of spreadsheet. It returns last row and column in the whole spreadsheet.
 * @param {String} sheetName
 * @returns [lastRowNumber,lastColumnNumber]
 */
function getLastRowInSpreadsheet(sheetName="Daily Evaluations") {
  let columns = getColumnNames(sheetName);
  // console.log(columns)
  let largestRowPerCols = [];
  columns.forEach((cl) => largestRowPerCols.push(getLastNonEmptyRowInColumn(cl, sheetName)));
  Logger.log(largestRowPerCols)
  // console.log(lastRowsNColIndex)
  let lastRow = Math.max(...largestRowPerCols);
  console.log(lastRow);
  return lastRow;
}


/**
 * Takes the name of Sheet and returns spreadsheet and worksheet
 * @param {String} sheetName
 * @returns [spreadsheet, worksheet]
 */
function getSpreadsheet(sheetName="Daily Evaluations") {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // get the target db and search worksheet
  var sheet = ss.getSheetByName(sheetName);

  return sheet;
}

/**
 * Returns Column Names of the active spreadsheet as list
 * @returns {List}
 */
function getColumnNames(sheetName = "Daily Evaluations") {
  let sheet = getSpreadsheet(sheetName);

  // find the corrent index of url column
  let columns = sheet.getRange(`A1:Z1`).getValues().flat();
  //  let nonEmptyCol = columns.filter(el => el != "")
  //nonEmptyCol = nonEmptyCol.map((col) => col.trim());
  columns = columns.map((col) => col.trim());
  //  console.log(columns)
  return columns;
}
/**
 * Takes two strings, Column Name to find index of and Sheet Name to Look For.
 *  Returns column index if found else null
 * @param {String} colName Column Name
 * @param {String} sheetName Sheet Name
 * @returns Number/null
 */
function findColIndex(colName = "Tasks", sheetName = "Daily Tasks") {
  try {
    let columns = getColumnNames(sheetName);
    // console.log(columns)
    let ind = columns.findIndex(
      (val) => val.toLowerCase().trim() === colName.toLowerCase().trim()
    );

    // check if -1 is returned else increase index by 1 to match arrays position with index system of spreadsheet
    let colIndex = ind === -1 ? null : ind + 1;
    // if not throe error and return null
    if (colIndex === null) throw { error: "No Column Name Found" };
    //  console.log(colIndex)

    return colIndex;
  } catch (e) {
    console.log(e)
    return null;
  }
}

function getReadableTodayDate() {

  let dt = new Date(),
    year = dt.getFullYear(),
    month = (dt.getMonth() + 1).toString().padStart(2, "0"),
    day = dt.getDate().toString().padStart(2, "0"),
    date = day + '/' + month + '/' + year;

  //console.log(date);
  return date;
}

