const nodemailer = require('nodemailer');

function mailer(data) {
  let mailTransport = nodemailer.createTransport({
    host: "mail.helloriyan.my.id",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: "nodemail@helloriyan.my.id",
      pass: "5kM}-@@P}xk)", //! ini passwordnya di simpan di env
    },
    tls: {
      rejectUnauthorized: true
    }
  })

  let detail = {
    from : 'dont-reply@helloriyan.my.id',
    to : data,
    subject : 'Hello',
    text : 'Testing yes uhuuuyyy!!!!'
  }

  mailTransport.sendMail(detail, (err) => {
    if (err) {
      console.log(`Something went wrong!`, err);
    }
    else {
      console.log('success');
    }
  })
}

module.exports = mailer


