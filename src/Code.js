function onEdit(e) {
  if (e.source.getActiveSheet().getName() === "Daily Tasks") {
    dailyTasksChangeHandler();
  }

  if (e.source.getActiveSheet().getName() === "Daily Evaluations") {
    dailyEvaluationChangeHandler();
  }
}

function dailyEvaluationChangeHandler() {
  let sheetName = "Daily Evaluations";
  let dailySheet = getSpreadsheet(sheetName);

  let lastRow = getLastNonEmptyRowInColumn("Tasks", sheetName);
  let data = dailySheet.getRange(`B2:K${lastRow}`).getDisplayValues();

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "" && data[i][1] !== "") {
      data[i][0] = easyDate();
    }

    if (data[i][0] !== "" && data[i][1] !== "") {
      if (data[i][3] === "TRUE") {
        data[i][5] = "1";
        dailySheet
          .getRange(`B${i + 2}:G${i + 2}`)
          .setBackground("#bdbdbd")
          .setFontLine("line-through");
      } else {
        data[i][5] = "-1";
        dailySheet
          .getRange(`B${i + 2}:G${i + 2}`)
          .setBackground("red")
          .setFontLine("");
        dailySheet.getRange(`I${i + 2}:K${i + 2}`).setBackground("#bdbdbd");
      }
    }

    // handle toggle
    if (
      `${data[i][0]}` === easyDate() &&
      data[i][1] !== "" &&
      data[i][3] === "FALSE"
    ) {
      data[i][5] = "";
      dailySheet
        .getRange(`B${i + 2}:G${i + 2}`)
        .setBackground("")
        .setFontLine("");
      dailySheet.getRange(`I${i + 2}:K${i + 2}`).setBackground("");
    }
  }
  dailySheet.getRange(`B2:K${lastRow}`).setValues(data);
  //console.log(data)
}

function dailyTasksChangeHandler() {
  let sheetName = "Daily Tasks";
  let tasksSheet = getSpreadsheet(sheetName);
  // add one to last
  let lastRow = getLastNonEmptyRowInColumn("Tasks", sheetName);
  let data = tasksSheet.getRange(`B2:C${lastRow}`).getValues();

  //console.log(lastRow);
  for (let i = 0; i < data.length; i++) {
    // if date both values are fill but its not today
    if (data[i][1] !== "") {
      if (`${data[i][0]}` === "") {
        data[i][0] = easyDate();
        tasksSheet
          .getRange(`B${i + 2}:C${i + 2}`)
          .setBackground("")
          .setFontLine("");
        continue;
      }
      /*  console.log(data[i][0])
       console.log(easyDate()) */
      if (`${data[i][0]}` !== easyDate()) {
        tasksSheet
          .getRange(`B${i + 2}:C${i + 2}`)
          .setBackground("#bdbdbd")
          .setFontLine("line-through");
        continue;
      }

      if (`${data[i][0]}` === easyDate()) {
        tasksSheet
          .getRange(`B${i + 2}:C${i + 2}`)
          .setBackground("")
          .setFontLine("");
        continue;
      }
    } else {
      data[i][0] = "";
      tasksSheet
        .getRange(`B${i + 2}:C${i + 2}`)
        .setBackground("")
        .setFontLine("");
    }
  }
  tasksSheet.getRange(`B2:C${lastRow}`).setValues(data);
}
const SPRD_ID = "1OBRNeVBwTUhdub9xPIr8LnDQpow6cse2gqhzx2LrBSI";
