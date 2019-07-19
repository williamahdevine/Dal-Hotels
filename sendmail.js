//by Shuo
var nodemailer = require('nodemailer');
const express = require('express')

const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 3000

app.get('/send', (req, res) =>{ 
		const trans = nodemailer.createTransport({
  host: 'smtp.gmail.com', // hostname
  port: 587, // secure:true for port 465, secure:false for port 587
  secure: false, // port for secure SMTP
  auth: {
  	user: 'qwerqazqqq@gmail.com',
    pass: 'Shen@1993'
  }
});



let mail_op ={
  from: 'qwerqazqqq@gmail.com',
  to: 'sh805190@dal.ca',
  subject: 'Booking Receipt',
  html: '<h1>Welcome</h1><p>Have a Happy Life with everyone and with yourself.</p>',
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

	}
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
