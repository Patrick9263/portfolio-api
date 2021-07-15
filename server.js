require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var nodemailer = require("nodemailer");

const app = express();
const apiPort = 3000;

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json())

function sendEmail(user, pass, to, data) {
  const { name, email, message } = data;
  const subject = 'Email from PortfolioV2'
  const mail = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const mailOptions = {
    from: email,
    to,
    subject,
    text: `${message}\n\-----\n${name}`,
  };

  mail.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.post("/api/contact", (req, res) => {
  res.send("POST request received.");
  sendEmail(
    process.env.EMAIL_API,
    process.env.EMAIL_API_PASS,
    process.env.EMAIL_API_DESTINATION,
    req.body
  );
});

app.use((_req, res, _next) => {
  res.status(404).send("Sorry, cannot find that.");
});

app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: "500 Error" });
  } else {
    next(err);
  }
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
