import expressAsyncHandler from "express-async-handler"
import dotenv from "dotenv";
import nodemailer from "nodemailer"
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 8000,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

export const sendEmail = expressAsyncHandler(async (req, res) => {
  const { fullName, contactNumber, email, selectedDate, selectedTime, message } = req.body;
  console.log(email, message);

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "New Appointment Adooo",
    text: message, fullName, contact, selectedDate, selectedTime, contactNumber
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
});

