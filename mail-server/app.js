const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();
const app = express();
var result = true;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const mail = router.get("/:email",(req,res,next)=>{

    const email = req.params.email;
    console.log(email);
    const trans = nodemailer.createTransport({
    host: 'mail.ravcontest.com', // hostname
    port: 465, // secure:true for port 465, secure:false for port 587
    secure: true, // port for secure SMTP
    auth: {
    user: 'hotels@ravcontest.com',
    pass: 'dalhotels$'
    }
    });

    let mail_op ={
    from: 'hello@dalhotels.com',
    to: email,
    subject: 'Booking Receipt',
    html: '<h3>Dear Customer</h3><p>Please Find Attached Your Receipt.</p>',
    attachments: [
    {  
    filename: 'receipt.pdf',
    path: 'receipt.pdf'
    },
    ]
    };


    trans.sendMail(mail_op, (err, info)=>{
    if(err){
    console.log(err);
    } else {
    console.log('Email sent: ' + info.response);
    res.send('Email sent');
    }
    });
    res.status(200).json({
        message:true
    })
});

app.use("/",mail);
module.exports = app;