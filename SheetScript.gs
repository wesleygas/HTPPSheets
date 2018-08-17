var SS = SpreadsheetApp.openById('1yVjCrxj-AzcxHxjldTDCmSLUbJMAQZOa3kjYhOHywZc');
var sheet = SS.getSheetByName('teste');
var str = "";

function getLastCellOfCol(col){
  var colText = col + "1:" + col;  
  var vals = sheet.getRange(colText).getValues();
  return vals.filter(String).length;
  }

function doGet(e){
  
  var pcount = e.parameter.pcount;
  var read = e.parameter.read;
  var add = e.parameter.add;
  
  
  if (read !== undefined){
    var now = Utilities.formatDate(new Date(), "GMT-3", "yyyy-MM-dd'T'hh:mm a'Z'").slice(11,19);
    sheet.getRange('D' + read).setValue(now);
    var count = (sheet.getRange('C' + read).getValue()) + 1;
    sheet.getRange('C' + read).setValue(count);
    return ContentService.createTextOutput(sheet.getRange('A' + read).getValue());
  }
  
  if(add !== undefined){
   var now = Utilities.formatDate(new Date(), "GMT-3", "yyyy-MM-dd'T'hh:mm a'Z'").slice(11,19);
   var row = (this.getLastCellOfCol('A') + 1).toString();
   sheet.getRange('A' + row).setValue(add);
   return ContentService.createTextOutput("Successfully updated value of cell A" + row + " to " + add);  
  }
  
  if (e.parameter.pcount === undefined)
    return ContentService.createTextOutput("No value passed as argument to script Url.");
    
  var lastPhrase = sheet.getLastRow().toString();
  var range = sheet.getRange('H2');
  range.setValue(lastPhrase);
  
  //var retval = range.setValue(val).getValue();
  return ContentService.createTextOutput(range.getValue());
}
