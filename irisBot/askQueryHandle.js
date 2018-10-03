'use strict';

const lexResponses = require('../lexResponses');
const request = require('request');
const config = require('../lib/send_email.js');
const common = require('../lib/send_email');

var url = require('url');
module.exports = function (intentRequest) {
  console.log(
    'intentRequest askquery  called ..' + '' + JSON.stringify(intentRequest)
  );
  const source = intentRequest.invocationSource;
  var query_form = intentRequest.currentIntent.slots;
  var mail;
  console.log(query_form.user_name, 'form value', query_form);
  if (intentRequest.inputTranscript.indexOf('<mailto:') !== -1) {
    mail = intentRequest.inputTranscript.split('|');
    mail = mail[1].split('>');
    query_form.user_email = mail[0];
    console.log(mail, 'split perform', query_form);
  }
  if (source === 'DialogCodeHook') {
    if (config.current_step == 'discussIntent') {
      console.log(config.user_details, 'detailsssssssss');
      config.current_step = '';
      config.user_details.user_des = intentRequest.inputTranscript;
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      var slack_msg =
        'Hi *' +
        config.user_details.user_name +
        '* has booked a Project Discussion session from ' +
        platform +
        '. His/Her details are given below : \n' +
        'E-mail Id :' +
        config.user_details.user_email +
        '\n Contact number : ' +
        config.user_details.user_phone +
        '\n Company Name : ' +
        config.user_details.user_company +
        '\n Company Size : ' +
        config.user_details.company_size +
        '\n Project Description:' +
        config.user_details.user_des +
        '\n Contact Day :' +
        config.user_details.user_day +
        '\n Contact Time : ' +
        config.user_details.user_time +
        '\n User Type : ' +
        config.user_details.userr_type;

      config.user_details.user_des = intentRequest.inputTranscript;
      sendSlackMsg(slack_msg, myResult => {
        console.log('Slack message sent : ' + myResult);
        var status = common.sendEmail(
          '<span>Hi <b>' +
          config.user_details.user_name +
          '</b> has booked a Project Discussion session from ' +
          platform +
          '. His/Her details are given below:</span> <br>' +
          ' E-mail Id : ' +
          config.user_details.user_email +
          '\<br> Contact number : ' +
          config.user_details.user_phone +
          '<br> Company Name : ' +
          config.user_details.user_company +
          '<br> User Type : ' +
          config.user_details.userr_type +
          '<br> Company Size : ' +
          config.user_details.company_size +
          '<br> Project Description : ' +
          config.user_details.user_des +
          '<br> Contact Day : ' +
          config.user_details.user_day +
          '<br> Contact Time : ' +
          config.user_details.user_time,
          'Iris Project Discussion Request   ' + platform
        );
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
      return lexResponses.elicitSlot(
        intentRequest.sessionAttributes,
        'DiscussIntent',
        {
          user_company: config.user_details.user_company,
          user_des: config.user_details.user_des,
          user_email: config.user_details.user_email,
          user_name: config.user_details.user_name,
          user_phone: config.user_details.user_phone,
          company_size: config.user_details.company_size,
          userr_type: config.user_details.userr_type,
          user_day: config.user_details.user_day,
          user_time: config.user_details.user_time,
          is_complete: null,
        },
        'is_complete',
        'Thank you for sharing your Project/Idea. We will call you between ' +
        config.user_details.user_time +
        ' (IST, + 5.5 GMT) on ' +
        config.user_details.user_day +
        '\n For more queries you may send a mail to business@prologictechnologies.in',
        genericAttachments
      );
    } else if (config.current_step == 'consultIntent') {
      // consult intent  handling

      console.log(config.user_details, 'detailsssssssss');
      config.current_step = '';

      config.user_details.user_des = intentRequest.inputTranscript;
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      var slack_msg =
        'Hi *' +
        config.user_details.user_name +
        '* has booked a consultation session from ' +
        platform +
        '. His/Her details are given below : \n' +
        ' E-mail Id :' +
        config.user_details.user_email +
        '\n Contact number : ' +
        config.user_details.user_phone +
        '\n Company Name : ' +
        config.user_details.user_company +
        '\n Company Size : ' +
        config.user_details.user_size +
        '\n Project Description:' +
        config.user_details.user_des +
        '\n Contact Day :' +
        config.user_details.user_day +
        '\n Contact Time : ' +
        config.user_details.user_time +
        '\n User Type : ' +
        config.user_details.userr_type;
      sendSlackMsg(slack_msg, myResult => {
        console.log('Slack message sent : ' + myResult);
        var status = common.sendEmail(
          '<span>Hi <b>' +
          config.user_details.user_name +
          '</b> has booked a Consultation session from' +
          platform +
          '. His/Her details are given below:</span> <br>' +
          ' E-mail Id : ' +
          config.user_details.user_email +
          '<br> Contact number : ' +
          config.user_details.user_phone +
          '<br> Company Name : ' +
          config.user_details.user_company +
          '<br> User Type : ' +
          config.user_details.userr_type +
          '<br> Company Size : ' +
          config.user_details.user_size +
          '<br> Project Description : ' +
          config.user_details.user_des +
          '<br> Contact Day : ' +
          config.user_details.user_day +
          '<br> Contact Time : ' +
          config.user_details.user_time,
          'Iris Consultation session Request from ' + platform
        );
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

      return lexResponses.elicitSlot(
        intentRequest.sessionAttributes,
        'ConsultIntent',
        {
          user_company: config.user_details.user_company,
          user_des: config.user_details.user_des,
          user_email: config.user_details.user_email,
          user_name: config.user_details.user_name,
          user_phone: config.user_details.user_phone,
          user_size: config.user_details.user_size,
          userr_type: config.user_details.userr_type,
          user_day: config.user_details.user_day,
          user_time: config.user_details.user_time,
          is_complete: null,
        },
        'is_complete',
        'I have booked your free 30 minutes consultation with our expert. We will call between ' +
        config.user_details.user_time +
        ' (IST, + 5.5 GMT) on ' +
        config.user_details.user_day +
        '\n To know more about Prologic Technologies visit https://www.prologic-technologies.com/',
        genericAttachments
      );
    } else if (config.current_step == 'askqueryIntent') {
      config.current_step = '';

      config.user_details.user_query = intentRequest.inputTranscript;
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      var slack_msg =
        'Hi *' +
        config.user_details.user_name +
        '* has asked the following query from : ' +
        platform +
        '\n' +
        config.user_details.user_query +
        '\nKindly respond back to his/her email id : *' +
        config.user_details.user_email +
        '* or contact number :*' +
        config.user_details.user_contact +
        '*';
      sendSlackMsg(slack_msg, myResult => {
        console.log('Slack message sent : ' + myResult);
        var status = common.sendEmail(
          '<h4>Hi <b>' +
          config.user_details.user_name +
          '</b> has asked the following query from ' +
          platform +
          ':</h4><br>' +
          config.user_details.user_query +
          ' .<br>Kindly respond back to his/her email id : <b>' +
          config.user_details.user_email +
          ' </b>or contact number :<b>' +
          config.user_details.user_contact +
          '</b>',
          'Iris User Query from ' + platform
        );
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

      return lexResponses.elicitSlot(
        intentRequest.sessionAttributes,
        'AskQuery',
        {
          user_contact: config.user_details.user_contact,
          user_email: config.user_details.user_email,
          user_name: config.user_details.user_name,
          user_query: config.user_details.user_query,
          is_complete: null,
        },
        'is_complete',
        'Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. \nTo know more about Prologic Technologies, visit https://www.prologic-technologies.com/',
        genericAttachments
      );
    } else if (
      query_form.user_name == null &&
      query_form.user_email == null &&
      query_form.user_contact == null &&
      query_form.user_query == null
    ) {
      var message =
        ' I am happy to help :) and would need some details. Can I have your name, please?';
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var message =
            'I am happy to help :slightly_smiling_face: and would need some details. Can I have your name, please?';
        }
      } else {
        var message =
          ' I am happy to help 🙂 and would need some details. Can I have your name, please?';
      }
      return lexResponses.elicitSlotWithoutCard(
        intentRequest.sessionAttributes,
        'AskQuery',
        {
          user_contact: null,
          user_email: null,
          user_name: null,
          user_query: null,
          is_complete: null,
        },
        'user_name',
        message
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email == null &&
      query_form.user_contact == null &&
      query_form.user_query == null
    ) {
      var namePattern = /^[A-Za-z ]+$/;
      var nameVAlidation = namePattern.test(intentRequest.inputTranscript);
      if (!nameVAlidation) {
        return lexResponses.elicitSlotWithoutCard(
          intentRequest.sessionAttributes,
          'AskQuery',
          {
            user_contact: null,
            user_email: null,
            user_name: null,
            user_query: null,
            is_complete: null,
          },
          'user_name',
          message
        );
      } else {
        return lexResponses.elicitSlotWithoutCard(
          intentRequest.sessionAttributes,
          'AskQuery',
          {
            user_contact: null,
            user_email: null,
            user_name: query_form.user_name,
            user_query: null,
            is_complete: null,
          },
          'user_email',
          'Your email address please?'
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_contact == null &&
      query_form.user_query == null
    ) {
      var emailPattern = /^[a-zA-Z][a-zA-Z0-9_+]*(\.[a-zA-Z][a-zA-Z0-9_+]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;

      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var emailValidation = emailPattern.test(mail[0]);
        } else {
          var emailValidation = emailPattern.test(
            intentRequest.inputTranscript
          );
        }
      } else {
        var emailValidation = emailPattern.test(intentRequest.inputTranscript);
      }
      if (!emailValidation) {
        return lexResponses.elicitSlotWithoutCard(
          intentRequest.sessionAttributes,
          'AskQuery',
          {
            user_contact: null,
            user_email: null,
            user_name: query_form.user_name,
            user_query: null,
            is_complete: null,
          },
          'user_email',
          'Your email address please?'
        );
      } else {
        return lexResponses.elicitSlotWithoutCard(
          intentRequest.sessionAttributes,
          'AskQuery',
          {
            user_contact: null,
            user_email: query_form.user_email,
            user_name: query_form.user_name,
            user_query: null,
            is_complete: null,
          },
          'user_contact',
          'And your phone number?'
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_contact != null &&
      query_form.user_query == null
    ) {
      if (
        intentRequest.inputTranscript.length < 7 ||
        intentRequest.inputTranscript.length > 13
      ) {
        return lexResponses.elicitSlotWithoutCard(
          intentRequest.sessionAttributes,
          'AskQuery',
          {
            user_contact: null,
            user_email: query_form.user_email,
            user_name: query_form.user_name,
            user_query: null,
            is_complete: null,
          },
          'user_contact',
          'And your phone number?'
        );
      } else {
        config.current_step = 'askqueryIntent';
        config.user_details = query_form;
        return lexResponses.elicitSlotWithoutCard(
          intentRequest.sessionAttributes,
          'AskQuery',
          {
            user_contact: query_form.user_contact,
            user_email: query_form.user_email,
            user_name: query_form.user_name,
            user_query: null,
            is_complete: null,
          },
          'user_query',
          'Please describe your query.'
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_contact != null &&
      query_form.user_query != null &&
      query_form.is_complete == null
    ) {
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      console.log("platform web");
      var message = "Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. \nTo know more about Prologic Technologies, visit https://www.prologic-technologies.com/";

      if (platform == 'Web') {
        console.log("platform web");
        var message = '<div> Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. <br> To know more about Prologic Technologies, visit  <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a>  </div>';

      }
      var slack_msg =
        'Hi *' +
        config.user_details.user_name +
        '* has asked the following query from : ' +
        platform +
        '\n' +
        config.user_details.user_query +
        '\nKindly respond back to his/her email id : *' +
        config.user_details.user_email +
        '* or contact number :*' +
        config.user_details.user_contact +
        '*';
      sendSlackMsg(slack_msg, myResult => {
        console.log('Slack message sent : ' + myResult);
        var status = common.sendEmail(
          '<h4>Hi <b>' +
          query_form.user_name +
          '</b> has asked the following query from ' +
          platform +
          ':</h4><br>' +
          query_form.user_query +
          ' .<br>Kindly respond back to his/her email id : <b>' +
          query_form.user_email +
          ' </b>or contact number :<b>' +
          query_form.user_contact +
          '</b>',
          'Iris User Query from ' + platform
        );
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

      return lexResponses.elicitSlot(
        intentRequest.sessionAttributes,
        'AskQuery',
        {
          user_contact: query_form.user_contact,
          user_email: query_form.user_email,
          user_name: query_form.user_name,
          user_query: query_form.user_query,
          is_complete: null,
        },
        'is_complete',
        message,
        genericAttachments
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_contact != null &&
      query_form.user_query != null &&
      query_form.is_complete == 'Yes'
    ) {
      config.current_step = '';
      let genericAttachments = [
        {
          attachmentLinkUrl: null,
          buttons: [
            {
              text: 'General Enquiry?',
              value: 'General Enquiry',
            },
            {
              text: 'Business Enquiry?',
              value: 'Business Enquiry',
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
      query_form.user_contact != null &&
      query_form.user_query != null &&
      query_form.is_complete == 'No'
    ) {
      var msg = 'Thank You. Have a great day! :)';
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var msg = 'Thank You. Have a great day!:slightly_smiling_face:';
        }
      } else {
        var msg =
          'Thank You. Have a great day! 🙂.To start a new conversation say Hi';
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
function sendSlackMsg(postm, callback) {
  var post_data = {
    text: postm,
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
