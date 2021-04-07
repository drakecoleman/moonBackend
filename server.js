const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const nodemailer = require("nodemailer");
var cors = require("cors");
app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.listen(8000, () => {
  console.log("Server Connected");
});
app.get("/", (req, res) => {
  res.send("<h1>Connected</h1>");
});
app.post("/", (req, res) => {
  const message = req.body.input.textarea;
  const email = req.body.input.email;
  console.log(email);
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // hostname
      auth: {
        user: "moonstarcodemail@gmail.com",
        pass: "Moon_2021!",
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: email, // sender address
      to: "support@moonstar.biz", // list of receivers
      subject: email, // Subject line
      text: message, // plain text body
      html: message, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

  main().catch(console.error);
});
