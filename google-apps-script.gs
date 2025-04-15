function doPost(e) {
  try {
    // Log the received data for debugging
    Logger.log('Received request: ' + JSON.stringify(e));
    
    // Handle the case where e.postData might be undefined
    let data;
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      // Alternative: try to get data from e.parameter
      data = e.parameter;
    } else {
      // If no data is found, return error
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'No data received'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.type === 'dialogue') {
      var dialogueSheet = sheet.getSheetByName('Dialogues');
      if (!dialogueSheet) {
        dialogueSheet = sheet.insertSheet('Dialogues');
        // Add headers
        dialogueSheet.getRange('A1:C1').setValues([['Timestamp', 'Question', 'Response']]);
      }
      dialogueSheet.appendRow([
        new Date(data.timestamp),
        data.question,
        data.response
      ]);
    } else if (data.type === 'step') {
      var stepsSheet = sheet.getSheetByName('Steps');
      if (!stepsSheet) {
        stepsSheet = sheet.insertSheet('Steps');
        // Add headers
        stepsSheet.getRange('A1:C1').setValues([['Timestamp', 'Step Number', 'Code']]);
      }
      stepsSheet.appendRow([
        new Date(data.timestamp),
        data.stepNumber,
        data.code
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error and return error response
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'success',
    'message': 'Service is running'
  })).setMimeType(ContentService.MimeType.JSON);
}
