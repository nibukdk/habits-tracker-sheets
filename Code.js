function hourlyTrigger() {
  dailyEvaluationChangeHandler();
}

function dailyEvaluationChangeHandler() {
  const sheetName = "Daily Evaluations"
  const dailySheet = getSpreadsheet(sheetName);

  const lastRowFromPrevScan = LastCallDetails.get();
  const lastRow = getLastNonEmptyRowInColumn("Tasks", sheetName)


  SpreadsheetApp.flush();

  // only get necessary values to reduce time exceed limit
  const data = dailySheet.getRange(`B${lastRowFromPrevScan}:K${lastRow}`).getDisplayValues();

  for (let i = 0; i < data.length; i++) {
    // if date and task both are empty
    if (data[i][0] === "" && data[i][1] !== "") {
      data[i][0] = getReadableTodayDate();
    }
    // if date and task both are not empty
    if (data[i][0] !== "" && data[i][1] !== "") {
      // if task finished is checked
      if (data[i][3] === "TRUE") {
        data[i][5] = "1";

        dailySheet.getRange(`B${lastRowFromPrevScan + i}:G${lastRowFromPrevScan + i}`)
          .setBackground("#bdbdbd")
          .setFontLine("line-through");
      } else {
        data[i][5] = "-1";
        dailySheet.getRange(`B${lastRowFromPrevScan + i}:G${lastRowFromPrevScan + i}`)
          .setBackground("red")
          .setFontLine("")

      }
    }

    // handle toggle
    if (`${data[i][0]}` === getReadableTodayDate() && data[i][1] !== "" && data[i][3] === "FALSE") {
      data[i][5] = "";
      dailySheet.getRange(`B${lastRowFromPrevScan + i}:G${lastRowFromPrevScan + i}`)
        .setBackground("")
        .setFontLine("")

    }
    // handle extra section
    if (data[i][0] !== "") {
      // if date is today
      if (`${data[i][0]}` === getReadableTodayDate()) {
        dailySheet.getRange(`I${lastRowFromPrevScan + i}:K${lastRowFromPrevScan + i}`)
          .setBackground("")


      } else {
        // if date is not today
        dailySheet.getRange(`I${lastRowFromPrevScan + i}:K${lastRowFromPrevScan + i}`)
          .setBackground("#bdbdbd")
          .setFontLine("line-through");
      }
    }
  }
  dailySheet.getRange(`B${lastRowFromPrevScan}:K${lastRow}`).setValues(data);
  //console.log(data)

  // reset lastrowindex
  LastCallDetails.set(lastRow);
}

const SPRD_ID = "1OBRNeVBwTUhdub9xPIr8LnDQpow6cse2gqhzx2LrBSI";


class LastCallDetails {
  static get() {
    return Number(PropertiesService.getScriptProperties().getProperty("LastRowIndex"));
  }

  static set(val = 850) {
    PropertiesService.getScriptProperties().setProperty("LastRowIndex", String(val - 100));
  }

}