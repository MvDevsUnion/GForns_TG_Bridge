function onFormSubmit(e) {
const sheet = e.range.getSheet();
const row = e.range.getRow();

const rawDate = sheet.getRange(row, 1).getValue();
const evidence = sheet.getRange(row, 2).getValue();
const industry = sheet.getRange(row, 3).getValue();


const formattedDate = Utilities.formatDate(
new Date(rawDate),
Session.getScriptTimeZone(),
'dd-MM-yyyy'
);

//you can customize the msg here
const message =
`
**Industry:** ${industry}

**Issues:**
- Job listings do not disclose salary

**Evidence:** 
- [Job Listing](${evidence})

**Date Added:** ${formattedDate}`;

sendTelegramMessage(message);
}


const TELEGRAM_TOKEN = '';
const CHAT_ID = '';

function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  const payload = {
    chat_id: CHAT_ID,
    text: text,
  //message_thread_id: , //uncomment and add thread id if needed
    disable_notification: true
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

