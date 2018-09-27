'use strict';

const lexResponses = require('../lexResponses');
const request = require('request');

const config = require('../lib/send_email.js');
const common = require('../lib/send_email');
module.exports = function (intentRequest) {
  console.log(
    'intentRequest applyNowHandle  called ..' +
    '' +
    JSON.stringify(intentRequest)
  );
  const source = intentRequest.invocationSource;
  var query_form = intentRequest.currentIntent.slots;
  console.log(query_form.user_name, 'form value', query_form);
  if (intentRequest.inputTranscript.indexOf('<mailto:') !== -1) {
    var mail = intentRequest.inputTranscript.split('|');
    mail = mail[1].split('>');
    query_form.user_email = mail[0];
    console.log(mail, 'split perform', query_form);
  }
  if (source === 'DialogCodeHook') {
    if (
      query_form.user_name == null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_qualification == null &&
      query_form.user_experience == null &&
      query_form.user_vacancy == null
    ) {
      let message =
        'Sure, I can help you process your application right now. Please type in your first name.';
      return lexResponses.elicitSlotWithoutCard(
        intentRequest.sessionAttributes,
        'ApplyNow',
        {
          user_email: null,
          user_experience: null,
          user_name: null,
          user_phone: null,
          user_qualification: null,
          user_vacancy: null,
          is_complete: null,
        },
        'user_name',
        message
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_qualification == null &&
      query_form.user_experience == null &&
      query_form.user_vacancy == null
    ) {
      return lexResponses.elicitSlotWithoutCard(
        intentRequest.sessionAttributes,
        'ApplyNow',
        {
          user_email: null,
          user_experience: null,
          user_name: query_form.user_name,
          user_phone: null,
          user_qualification: null,
          user_vacancy: null,
          is_complete: null,
        },
        'user_email',
        'Can I have your email address please?'
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone == null &&
      query_form.user_qualification == null &&
      query_form.user_experience == null &&
      query_form.user_vacancy == null
    ) {
      return lexResponses.elicitSlotWithoutCard(
        intentRequest.sessionAttributes,
        'ApplyNow',
        {
          user_email: query_form.user_email,
          user_experience: null,
          user_name: query_form.user_name,
          user_phone: null,
          user_qualification: null,
          user_vacancy: null,
          is_complete: null,
        },
        'user_phone',
        'Also your phone number please?'
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_qualification == null &&
      query_form.user_experience == null &&
      query_form.user_vacancy == null
    ) {
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] ==
          'Facebook'
        ) {
          console.log(intentRequest.inputTranscript, 'blahblah');

          console.log(query_form.user_qualification);
          return lexResponses.elicitSlotWithoutCard(
            intentRequest.sessionAttributes,
            'ApplyNow',
            {
              user_email: query_form.user_email,
              user_experience: null,
              user_name: query_form.user_name,
              user_phone: query_form.user_phone,
              user_qualification: null,
              user_vacancy: null,
              is_complete: null,
            },
            'user_qualification',
            '*I would like to know  your highest educational qualification?* \n Type 1 for B.Tech \n Type 2 for MCA \n Type 3 for BCA \n Type 4 for MBA \n Type 5 for Others'
          );
        } else {
          let genericAttachments = [
            {
              attachmentLinkUrl: null,
              buttons: [
                {
                  text: 'B.Tech',
                  value: 'B.Tech',
                },

                {
                  text: 'MCA',
                  value: 'MCA',
                },
                {
                  text: 'BCA',
                  value: 'BCA',
                },

                {
                  text: 'MBA',
                  value: 'MBA',
                },
                {
                  text: 'Others',
                  value: 'Others',
                },
              ],
              imageUrl: null,
              subTitle: 'Select your qualification',
              title: 'Educational Qualification',
            },
          ];
          return lexResponses.elicitSlot(
            intentRequest.sessionAttributes,
            'ApplyNow',
            {
              user_email: query_form.user_email,
              user_experience: null,
              user_name: query_form.user_name,
              user_phone: query_form.user_phone,
              user_qualification: null,
              user_vacancy: null,
              is_complete: null,
            },
            'user_qualification',
            'I would like to know  your highest educational qualification?',
            genericAttachments
          );
        }
      } else {
        let genericAttachments = [
          {
            attachmentLinkUrl: null,
            buttons: [
              {
                text: 'B.Tech',
                value: 'B.Tech',
              },

              {
                text: 'MCA',
                value: 'MCA',
              },
              {
                text: 'BCA',
                value: 'BCA',
              },

              {
                text: 'MBA',
                value: 'MBA',
              },
              {
                text: 'Others',
                value: 'Others',
              },
            ],
            imageUrl: null,
            subTitle: 'Select your qualification',
            title: 'Educational Qualification',
          },
        ];
        return lexResponses.elicitSlot(
          intentRequest.sessionAttributes,
          'ApplyNow',
          {
            user_email: query_form.user_email,
            user_experience: null,
            user_name: query_form.user_name,
            user_phone: query_form.user_phone,
            user_qualification: null,
            user_vacancy: null,
            is_complete: null,
          },
          'user_qualification',
          'I would like to know  your highest educational qualification?',
          genericAttachments
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_qualification != null &&
      query_form.user_experience == null &&
      query_form.user_vacancy == null
    ) {
      if (intentRequest.inputTranscript == 1) {
        query_form.user_qualification = 'B.Tech';
      } else if (intentRequest.inputTranscript == 2) {
        query_form.user_qualification = 'MCA';
      } else if (intentRequest.inputTranscript == 3) {
        query_form.user_qualification = 'BCA';
      } else if (intentRequest.inputTranscript == 4) {
        query_form.user_qualification = 'MBA';
      } else if (intentRequest.inputTranscript == 5) {
        query_form.user_qualification = 'Others';
      }
      let genericAttachments = [
        {
          attachmentLinkUrl: null,
          buttons: [
            {
              text: 'Fresher',
              value: 'Fresher',
            },
            {
              text: 'Upto 1 year',
              value: '1',
            },
            {
              text: 'Upto 2+ years',
              value: '2',
            },
            // {
            //   text: 'Upto 3+ years',
            //   value: '3+',
            // },
          ],
          imageUrl: null,
          subTitle: '...',
          title: 'Please choose',
        },
      ];
      return lexResponses.elicitSlot(
        intentRequest.sessionAttributes,
        'ApplyNow',
        {
          user_email: query_form.user_email,
          user_experience: null,
          user_name: query_form.user_name,
          user_phone: query_form.user_phone,
          user_qualification: query_form.user_qualification,
          user_vacancy: null,
          is_complete: null,
        },
        'user_experience',
        'May I know your work experience? ',
        genericAttachments
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_qualification != null &&
      query_form.user_experience != null &&
      query_form.user_vacancy == null
    ) {
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] ==
          'Facebook'
        ) {
          return lexResponses.elicitSlotWithoutCard(
            intentRequest.sessionAttributes,
            'ApplyNow',
            {
              user_email: query_form.user_email,
              user_experience: query_form.user_experience,
              user_name: query_form.user_name,
              user_phone: query_form.user_phone,
              user_qualification: query_form.user_qualification,
              user_vacancy: null,
              is_complete: null,
            },
            'user_vacancy',
            '*Which vacancy you wish to apply for?* \n Type 1 for Web Developer \n Type 2 for Hybrid Apps Developer \n Type 3 for Web Designer \n Type 4 for QA Tester \n Type 5 for HR'
          );
        } else {
          let genericAttachments = [
            {
              attachmentLinkUrl: null,
              buttons: [
                {
                  text: 'Web Developer',
                  value: 'Web Developer',
                },
                {
                  text: 'Hybrid Apps Developer',
                  value: 'Hybrid App Developer',
                },
                {
                  text: 'Web Designer',
                  value: 'Web Designer',
                },
                {
                  text: 'QA Tester',
                  value: 'QA Engineer',
                },
                {
                  text: 'HR',
                  value: 'HR',
                },
              ],
              imageUrl: null,
              subTitle: '...',
              title: 'Please choose 1',
            },
          ];
          return lexResponses.elicitSlot(
            intentRequest.sessionAttributes,
            'ApplyNow',
            {
              user_email: query_form.user_email,
              user_experience: query_form.user_experience,
              user_name: query_form.user_name,
              user_phone: query_form.user_phone,
              user_qualification: query_form.user_qualification,
              user_vacancy: null,
              is_complete: null,
            },
            'user_vacancy',
            'Which vacancy you wish to apply for?',
            genericAttachments
          );
        }
      } else {
        let genericAttachments = [
          {
            attachmentLinkUrl: null,
            buttons: [
              {
                text: 'Web Developer',
                value: 'Web Developer',
              },
              {
                text: 'Hybrid Apps Developer',
                value: 'Hybrid App Developer',
              },
              {
                text: 'Web Designer',
                value: 'Web Designer',
              },
              {
                text: 'QA Tester',
                value: 'QA Engineer',
              },
              {
                text: 'HR',
                value: 'HR',
              },
            ],
            imageUrl: null,
            subTitle: '...',
            title: 'Please choose 1',
          },
        ];
        return lexResponses.elicitSlot(
          intentRequest.sessionAttributes,
          'ApplyNow',
          {
            user_email: query_form.user_email,
            user_experience: query_form.user_experience,
            user_name: query_form.user_name,
            user_phone: query_form.user_phone,
            user_qualification: query_form.user_qualification,
            user_vacancy: null,
            is_complete: null,
          },
          'user_vacancy',
          'Which vacancy you wish to apply for?',
          genericAttachments
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_qualification != null &&
      query_form.user_experience != null &&
      query_form.user_vacancy != null &&
      query_form.is_complete == null
    ) {
      if (intentRequest.inputTranscript == 1) {
        query_form.user_vacancy = 'Web Developer';
      } else if (intentRequest.inputTranscript == 2) {
        query_form.user_vacancy = 'Hybrid Apps Developer';
      } else if (intentRequest.inputTranscript == 3) {
        query_form.user_vacancy = 'Web Designer';
      } else if (intentRequest.inputTranscript == 4) {
        query_form.user_vacancy = 'QA Tester';
      } else if (intentRequest.inputTranscript == 5) {
        query_form.user_vacancy = 'HR';
      }
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      sendSlackMsg(query_form, platform, myResult => {
        console.log('Slack message sent : ' + myResult);
      });

      let genericAttachments = [
        {
          attachmentLinkUrl: null,
          buttons: [
            {
              text: 'Yes',
              value: 'Yes',
            },
            {
              text: 'No',
              value: 'No',
            },
          ],
          imageUrl: null,
          subTitle: '...',
          title: 'Anything else I can help you with? ',
        },
      ];
      var msg =
        'Thank You so much :) . I have processed your application. You will hear from us in 48 hours. \nTo know more about our work culture visit https://www.prologic-technologies.com/prologic-work-culture/';

      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var msg =
            'Thank You so much :slightly_smiling_face: . I have processed your application. You will hear from us in 48 hours. \nTo know more about our work culture visit https://www.prologic-technologies.com/prologic-work-culture/';
        }
      } else {
        var msg =
          'Thank You so much 🙂 . I have processed your application. You will hear from us in 48 hours. \nTo know more about our work culture visit https://www.prologic-technologies.com/prologic-work-culture/';
      }

      return lexResponses.elicitSlot(
        intentRequest.sessionAttributes,
        'ApplyNow',
        {
          user_email: query_form.user_email,
          user_experience: query_form.user_experience,
          user_name: query_form.user_name,
          user_phone: query_form.user_phone,
          user_qualification: query_form.user_qualification,
          user_vacancy: query_form.user_vacancy,
          is_complete: null,
        },
        'is_complete',
        msg,
        genericAttachments
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_qualification != null &&
      query_form.user_experience != null &&
      query_form.user_vacancy != null &&
      query_form.is_complete == 'Yes'
    ) {
      let genericAttachments = [
        {
          attachmentLinkUrl: null,
          buttons: [
            {
              text: 'Business Enquiry?',
              value: 'Business Query',
            },
            {
              text: 'General Enquiry?',
              value: 'General Query',
            },
          ],
          imageUrl: null,
          subTitle: '...',
          title: 'Do you have a',
        },
      ];
      return lexResponses.elicitSlot(
        intentRequest.sessionAttributes,
        'Greeting',
        { query: null },
        'query',
        'Okay, How can i help you?',
        genericAttachments
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_qualification != null &&
      query_form.user_experience != null &&
      query_form.user_vacancy != null &&
      query_form.is_complete == 'No'
    ) {
      var msg = 'Thank You. Have a great day! :)';
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var msg = 'Thank You. Have a great day! :slightly_smiling_face:';
        }
      } else {
        var msg = 'Thank You. Have a great day! 🙂';
      }
      return lexResponses.close(
        intentRequest.sessionAttributes,
        'Fulfilled',
        msg
      );
    }
  }

  if (source === 'FulfillmentCodeHook') {
  }
};

var https = require('https');
function sendSlackMsg(query_form, source, callback) {
  var post_data = {
    text: 'Hi *' +
      query_form.user_name +
      '* has applied for the job from ' +
      source +
      '. His/Her details are given below : \n' +
      " Applicant's e-mail Id :" +
      query_form.user_email +
      "\n Applicant's contact number : " +
      query_form.user_phone +
      '\n Qualification : ' +
      query_form.user_qualification +
      '\n Job Experience (in years) : ' +
      query_form.user_experience +
      '\n Job Profile:' +
      query_form.user_vacancy,
  };
  var post_options = {
    host: 'hooks.slack.com',
    path: '/services/T5676QE8N/BBYUHJB1A/N1AZzu3MjtyT6RsEUsxg6Y8N',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(JSON.stringify(post_data)),
    },
  };

  var status = common.sendEmail(
    '<p> Hi <b>' +
    query_form.user_name +
    '</b> has applied for the job. His/Her details are given below :</p> ' +
    " Applicant's e-mail Id: " +
    query_form.user_email +
    "<br> Applicant's contact number: " +
    query_form.user_phone +
    '<br> Qualification: ' +
    query_form.user_qualification +
    '<br>Job Experience (in years): ' +
    query_form.user_experience +
    '<br> Job Profile: ' +
    query_form.user_vacancy,
    'Iris Job Application from ' + source
  );
  console.log(status, 'status');

  var post_req = https.request(post_options, res => {
    res.setEncoding('utf8');
    var returnData = '';
    res.on('data', chunk => {
      returnData += chunk;
    });
    res.on('end', () => {
      callback('Success');
    });
  });
  post_req.write(JSON.stringify(post_data));
  post_req.end();
}
