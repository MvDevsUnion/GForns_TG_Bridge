function onFormSubmit(e) {
const sheet = e.range.getSheet();
const row = e.range.getRow();

const rawDate = sheet.getRange(row, 1).getValue();
const evidence = sheet.getRange(row, 2).getValue();

const formattedDate = Utilities.formatDate(
new Date(rawDate),
Session.getScriptTimeZone(),
'dd-MM-yyyy'
);

const message =
`## Company Name

Industry:

Issues:

Issue 1

Issue 2

Evidence: ${evidence}

Date Added: ${formattedDate}`;

sendTelegramMessage(message);
}


const TELEGRAM_TOKEN = ':';
const CHAT_ID = '-';

function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  const payload = {
    chat_id: CHAT_ID,
    text: text
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

