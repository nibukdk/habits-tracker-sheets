/**
 * Function should be used for bound script.
 * Function use getDataRange().getValues() method to 
 * find lastRow and LastColumn of that Spreadhseet.
 */
function findLastRowNColBoundScript() {
  const sheet = SpreadsheetApp.getActiveSheet();

  const data = sheet.getDataRange().getValues();
  const lastRow = data.length;
  const lastCol = data[0].length;
  console.log(lastRow);
  console.log(lastCol);

  return [lastRow, lastCol];
}

/**
 * Function should be used for independent script.
 * Function use getDataRange().getValues() method to 
 * find lastRow and LastColumn of that Spreadhseet
 */
function findLastRowNColIndependentScript() {
  const ss = SpreadsheetApp.openById("1OBRNeVBwTUhdub9xPIr8LnDQpow6cse2gqhzx2LrBSI");
  const sheet = ss.getSheetByName("Self Awareness & Evaluations");

  const data = sheet.getDataRange().getValues();
  const lastRow = data.length;
  const lastCol = data[0].length;

  console.log(sheet.getName())
  console.log(lastRow);
  console.log(lastCol);

  return [lastRow, lastCol];
}


/**
 * This script is for finding last non empty rows and columns in a spreadsheet. 
 * This works in most cases but not in some cases such as columns with checkboxes
 * It is created in such a way that it only works with bound script.
 *
 * Created by: Nibesh Khadka.
 * linkedin: https://www.linkedin.com/in/nibesh-khadka/
 * website: https://nibeshkhadka.com
 */