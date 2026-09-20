/**
 * Google Apps Script backing the portfolio contact form.
 * Emails each submission straight to TO_EMAIL. Nothing is stored.
 *
 * SETUP
 * 1. script.google.com > New project (or open the existing one) and paste this
 *    file in, replacing whatever is there.
 * 2. Run doPost once from the editor and approve the Gmail permission.
 * 3. Deploy > New deployment > type: Web app
 *      Execute as:      Me
 *      Who has access:  Anyone          <-- required, or the form gets a 403
 * 4. Copy the /exec URL into the scriptURL constant in index.html.
 *    (Redeploying an existing deployment as a "New version" keeps the old URL.)
 */

var TO_EMAIL = "gouthamavala@gmail.com";

function doPost(e) {
  try {
    var data = (e && e.parameter) || {};
    var name = String(data.Name || "").trim();
    var email = String(data.email || "").trim();
    var message = String(data.Message || "").trim();

    if (!name || !email) {
      return json({ result: "error", message: "Name and email are required" });
    }

    MailApp.sendEmail({
      to: TO_EMAIL,
      subject: "Portfolio contact: " + name,
      // replying goes back to the visitor, not to yourself
      replyTo: email,
      body:
        "New message from your portfolio contact form.\n\n" +
        "Name:    " + name + "\n" +
        "Email:   " + email + "\n" +
        "Sent:    " + new Date() + "\n\n" +
        "Message:\n" + message + "\n",
    });

    return json({ result: "success" });
  } catch (err) {
    return json({ result: "error", message: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
