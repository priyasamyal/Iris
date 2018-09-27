var nodemailer = require ('nodemailer');
const config = {current_step: '', user_details: '', user_id: '112'};

module.exports = config;

module.exports.sendEmail = function (query_form, sub) {
  console.log ('send email', query_form, sub);

  //   var content =
  //     '<span> Hi ' +
  //     query_form.user_name +
  //     ' has applied for the job . His/Her details are given below :</span> <br>' +
  //     "1. Applicant's e-mail Id :" +
  //     query_form.user_email +
  //     "\n2. Applicant's contact number : " +
  //     query_form.user_phone +
  //     '\n3. Qualification : ' +
  //     query_form.user_qualification +
  //     '\n4.Job Experience (in years) : ' +
  //     query_form.user_experience +
  //     '\n5. Job Profile:' +
  //     query_form.user_vacancy;

  var nodemailer = require ('nodemailer');
  // var transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //         user: 'priya@prologictechnologies.in',
  //         pass: 'prologictech1'
  //     }
  // });

  var transporter = nodemailer.createTransport ({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'prosmtp@prologictechnologies.in',
      pass: '!@#prologictech!@#',
    },
  });

  const mailOptions = {
    from: 'prosmtp@prologictechnologies.in', // sender address
    to: 'rajiv@prologictechnologies.in,', // list of receivers
    subject: sub, // Subject line,
    html: query_form,
  };

  transporter.sendMail (mailOptions, function (err, info) {
    if (err) console.log (err);
    else console.log (info);
  });
  return 'Hello function name, ';
};
