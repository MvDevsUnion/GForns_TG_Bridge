function onFormSubmit(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  const lastCol = sheet.getLastColumn();

  const headers = sheet.getRange(1, 2, 1, lastCol - 1).getValues()[0];
  const values = sheet.getRange(row, 2, 1, lastCol - 1).getValues()[0];

  let message = 'New form submission:\n\n';
  headers.forEach((h, i) => {
    message += `${h}: ${values[i]}\n`;
  });

  sendTelegramMessage(message);
}



const TELEGRAM_TOKEN = ':';
const CHAT_ID = '';

function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  const payload = {
    chat_id: CHAT_ID,
    text: text,
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

