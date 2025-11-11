// Code.gs (Google Apps Script)
// Instructions:
// 1) Create a Google Sheet in the Google account bodameryysergio@gmail.com
// 2) Note the Sheet ID (the long ID in the sheet URL).
// 3) Create a new Apps Script project, replace the default code with this file.
// 4) Set SHEET_ID and optionally SHEET_NAME below.
// 5) Deploy -> New deployment -> Select "Web app", Execute as: "Me", Who has access: "Anyone" or "Anyone, even anonymous" (see README).
// 6) Copy the web app URL and paste into rsvp.js APPS_SCRIPT_WEB_APP_URL.

const SHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "Responses"; // name of the worksheet/tab within the sheet

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents ? e.postData.contents : null;
    if (!raw) {
      return ContentService.createTextOutput("No POST data received").setMimeType(ContentService.MimeType.TEXT);
    }

    const data = JSON.parse(raw);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Write header row
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Attending",
        "Guests",
        "Meal",
        "Dietary",
        "Song",
        "Message",
        "Received (AppsScript Timestamp)"
      ]);
    }

    // Build row in the same order as headers
    const row = [
      data.timestamp || "",
      data.name || "",
      data.email || "",
      data.attending || "",
      data.guests || "",
      data.meal || "",
      data.dietary || "",
      data.song || "",
      data.message || "",
      new Date()
    ];

    sheet.appendRow(row);

    const resp = ContentService.createTextOutput("ok");
    resp.setMimeType(ContentService.MimeType.TEXT);
    return resp;
  } catch (err) {
    const errorResp = ContentService.createTextOutput("error: " + err.message);
    errorResp.setMimeType(ContentService.MimeType.TEXT);
    return errorResp;
  }
}
