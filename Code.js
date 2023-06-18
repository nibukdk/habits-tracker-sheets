function hourlyTrigger() {

  // dailyTasksChangeHandler();
  dailyEvaluationChangeHandler();
  /*  if (e.source.getActiveSheet().getName() === "Daily Tasks") {
     //SpreadsheetApp.flush();
   }
 
   if (e.source.getActiveSheet().getName() === "Daily Evaluations") {
    // SpreadsheetApp.flush();
 
   } */
}

function dailyEvaluationChangeHandler() {
  const sheetName = "Daily Evaluations"
  const dailySheet = getSpreadsheet(sheetName);

  const lastRowFromPrevScan = LastCallDetails.get();
  const lastRow = getLastNonEmptyRowInColumn("Tasks", sheetName)


  SpreadsheetApp.flush();

  // only get necessary values to reduce time exceed limit
  let data = dailySheet.getRange(`B${lastRowFromPrevScan}:K${lastRow}`).getDisplayValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "" && data[i][1] !== "") {
      data[i][0] = getReadableTodayDate();
    }

    if (data[i][0] !== "" && data[i][1] !== "") {
      if (data[i][3] === "TRUE") {
        data[i][5] = "1";
        dailySheet.getRange(`B${i + 2}:G${i + 2}`)
          .setBackground("#bdbdbd")
          .setFontLine("line-through");
      } else {
        data[i][5] = "-1";
        dailySheet.getRange(`B${i + 2}:G${i + 2}`)
          .setBackground("red")
          .setFontLine("")

      }
    }

    // handle toggle
    if (`${data[i][0]}` === getReadableTodayDate() && data[i][1] !== "" && data[i][3] === "FALSE") {
      data[i][5] = "";
      dailySheet.getRange(`B${i + 2}:G${i + 2}`)
        .setBackground("")
        .setFontLine("")

    }
    // handle extra section
    if (data[i][0] !== "") {
      // if date is today
      if (`${data[i][0]}` === getReadableTodayDate()) {
        dailySheet.getRange(`I${i + 2}:K${i + 2}`)
          .setBackground("")


      } else {
        // if date is not today
        dailySheet.getRange(`I${i + 2}:K${i + 2}`)
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

/* function dailyTasksChangeHandler() {
  let sheetName = "Daily Tasks"
  let tasksSheet = getSpreadsheet(sheetName);

  SpreadsheetApp.flush();

  // add one to last 
  let lastRow = tasksSheet.getDataRange().getValues().length + 1;
  let data = tasksSheet.getRange(`B2:C${lastRow}`).getValues();
  console.log(data)
  console.log(getReadableTodayDate())

  for (let i = 0; i < data.length; i++) {
    // if there is tasks
    if (data[i][1] !== "") {
      // if date is not empty
      if (`${data[i][0]}` !== "") {
        if (`${data[i][0]}` !== getReadableTodayDate()) {

          tasksSheet.getRange(`B${i + 2}:C${i + 2}`)
            .setBackground("#bdbdbd")
            .setFontLine("line-through");

        } else {
          tasksSheet.getRange(`B${i + 2}:C${i + 2}`)
            .setBackground("")
            .setFontLine("");
        }
        continue;
      }
      // if heres tasks but not date
      else {
        data[i][0] = getReadableTodayDate();
        tasksSheet.getRange(`B${i + 2}:C${i + 2}`)
          .setBackground("")
          .setFontLine("")
        continue;

      }

    }
    // if theres no tasks 
    else {
      data[i][0] = "";
      tasksSheet.getRange(`B${i + 2}:C${i + 2}`)
        .setBackground("")
        .setFontLine("")
    }

  }
  tasksSheet.getRange(`B2:C${lastRow}`).setValues(data);

} */
const SPRD_ID = "1OBRNeVBwTUhdub9xPIr8LnDQpow6cse2gqhzx2LrBSI";


class LastCallDetails {
  static get() {
    return Number(PropertiesService.getScriptProperties().getProperty("LastRowIndex"));
  }

  static set(val = 850) {
    PropertiesService.getScriptProperties().setProperty("LastRowIndex", String(val));
  }

}















