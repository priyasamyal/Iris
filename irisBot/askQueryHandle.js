'use strict';

const lexResponses = require('../lexResponses');
const request = require('request');
const config = require('../lib/send_email.js');
const common = require('../lib/send_email');

var url = require('url');
module.exports = function (intentRequest) {
  // console.log (
  //   'intentRequest askquery  called ..' + '' + JSON.stringify (intentRequest)
  // );
  // console.log (config.is_send_ask, 'config.is_send_ask');
  const source = intentRequest.invocationSource;
  var query_form = intentRequest.currentIntent.slots;
  var mail;
  // console.log (query_form.user_name, 'form value updated', query_form);
  // spliting email value  in slack
  if (intentRequest.inputTranscript.indexOf('<mailto:') !== -1) {
    mail = intentRequest.inputTranscript.split('|');
    mail = mail[1].split('>');
    query_form.user_email = mail[0];
    // console.log (mail, 'split perform', query_form);
  }
  if (source === 'DialogCodeHook') {
    //check if someone type an uttereance of ask query in project description
    if (config.current_step == 'discussIntent') {
      // console.log (config.user_details, 'detailsssssssss');
      config.current_step = '';
      config.is_send_discuss = 'true';
      config.user_details.user_des = intentRequest.inputTranscript;
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      var message =
        'Thank you for sharing your Project/Idea. We will call you between ' +
        config.user_details.user_time +
        ' (IST, + 5.5 GMT) on ' +
        config.user_details.user_day +
        '.' +
        ' \n For more queries you may send a mail to business@prologictechnologies.in';

      if (platform == 'Web') {
        // console.log ('platform web');
        var message =
          '<div> Thank you for sharing your Project/Idea. We will call you between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT) on ' +
          config.user_details.user_day +
          '.' +
          ' <br/>For more queries you may send a mail to <a href="mailto:business@prologictechnologies.in" target="_top">business@prologictechnologies.in</a>  </div>';
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
      var status = common.sendInvite(
        '<span>Hi ' + config.user_details.user_name + ', <br> This is to inform you that, your appointment for  project/Idea discussion session has been confirmed. You will receive a phone call from us on ' + config.user_details.user_day + ' between ' + config.user_details.user_time + ' (IST, + 5.5 GMT). <br><br>If you have any query, please feel free to contact us at 0172-55316 or you can write us at <a href="mailto:example@email.com">info@prologictechnologie.in</a>  <br><br> Thanks & Regards<br>Prologic Technologies</span> ', config.user_details.user_email, 'Project Discussion Appointment with Prologic Technologies'
      );
      sendSlackMsg(slack_msg, myResult => {
        // console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail(
          ' <pre> <span>Hi <b>' +
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
          config.user_details.user_time +
          '</pre>',
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
        message,
        genericAttachments
      );
      //check if someone type an uttereance of ask query in book a consulatation
    } else if (config.current_step == 'consultIntent') {
      // consult intent  handling

      // console.log (config.user_details, 'detailsssssssss');
      config.current_step = '';
      config.is_send = true;
      config.user_details.user_des = intentRequest.inputTranscript;
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      var message =
        'I have booked your free 30 minutes consultation with our expert. We will call between ' +
        config.user_details.user_time +
        ' (IST, + 5.5 GMT) on ' +
        config.user_details.user_day +
        '.' +
        '\n To know more about Prologic Technologies visit https://www.prologic-technologies.com/';

      if (platform == 'Web') {
        // console.log ('platform web');
        var message =
          '<div> I have booked your free 30 minutes consultation with our expert. We will call between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT) on ' +
          config.user_details.user_day +
          '.' +
          '<br/>To know more about Prologic Technologies visit <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a>    </div>';
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
        // console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail(
          '<pre> <span>Hi <b>' +
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
          config.user_details.user_time +
          '</pre>',
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
        message,
        genericAttachments
      );
    } else if (config.current_step == 'askqueryIntent') {
      config.current_step = '';
      config.is_send_ask = true;

      config.user_details.user_query = intentRequest.inputTranscript;
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }

      var message =
        'Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. \nTo know more about Prologic Technologies, visit https://www.prologic-technologies.com/';

      if (platform == 'Web') {
        // console.log ('platform web');
        var message =
          '<div> Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. <br/><br/> To know more about Prologic Technologies, visit  <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a>  </div>';
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
        // console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail(
          '<pre><h4>Hi <b>' +
          config.user_details.user_name +
          '</b> has asked the following query from ' +
          platform +
          ':</h4><br>' +
          config.user_details.user_query +
          ' .<br>Kindly respond back to his/her email id : <b>' +
          config.user_details.user_email +
          ' </b>or contact number :<b>' +
          config.user_details.user_contact +
          '</b></pre>',
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
        message,
        genericAttachments
      );
    } else if (
      query_form.user_name == null &&
      query_form.user_email == null &&
      query_form.user_contact == null &&
      query_form.user_query == null
    ) {
      // console.log ('nameblock');
      // check for platform
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
          '<div> I am happy to help &#x1F60A and would need some details. Can I have your name, please?</div>';
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
      // validation for name
      // console.log ('namecheckblock');
      // var emailPattern = /^[a-zA-Z][a-zA-Z0-9_+]*(\.[a-zA-Z][a-zA-Z0-9_+]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
      var namePattern = /^[A-Za-z ]+$/;
      var nameVAlidation = namePattern.test(intentRequest.inputTranscript);
      // if (intentRequest.requestAttributes != null) {
      //   if (mail) {
      //     if (
      //       intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
      //     ) {
      //       var emailValidation = emailPattern.test (mail[0]);
      //     }
      //   } else if (
      //     intentRequest.requestAttributes['x-amz-lex:channel-type'] ==
      //     'Facebook'
      //   ) {
      //     var emailValidation = emailPattern.test (
      //       intentRequest.inputTranscript
      //     );
      //   }
      // } else {
      //   var emailValidation = emailPattern.test (intentRequest.inputTranscript);
      // }
      // if (!emailValidation) {
      //   return lexResponses.elicitSlotWithoutCard (
      //     intentRequest.sessionAttributes,
      //     'AskQuery',
      //     {
      //       user_contact: null,
      //       user_email: null,
      //       user_name: query_form.user_name,
      //       user_query: null,
      //       is_complete: null,
      //     },
      //     'user_email',
      //     'Your email address please?'
      //   );
      // }
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
      // console.log ('email block');
      // validaton for email
      var emailPattern = /^[a-zA-Z][a-zA-Z0-9_+]*(\.[a-zA-Z][a-zA-Z0-9_+]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
      if (intentRequest.requestAttributes != null) {
        if (mail) {
          if (
            intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
          ) {
            var emailValidation = emailPattern.test(mail[0]);
          }
        } else if (
          //chedck for email for sllack
          intentRequest.requestAttributes['x-amz-lex:channel-type'] ==
          'Facebook'
        ) {
          var emailValidation = emailPattern.test(
            intentRequest.inputTranscript
          );
        }
      } else {
        var emailValidation = emailPattern.test(intentRequest.inputTranscript);
      }
      if (!emailValidation) {
        //email validation
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
      // phone number valiation
      var phone_reg = /^\d{7,13}$/;
      var phone_val = phone_reg.test(intentRequest.inputTranscript);
      if (!phone_val) {
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
      // console.log ('enter block');
      // platform check for smiley
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }

      var message =
        'Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. \nTo know more about Prologic Technologies, visit https://www.prologic-technologies.com/';

      if (platform == 'Web') {
        // console.log ('platform web');
        var message =
          '<div> Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. <br/><br/> To know more about Prologic Technologies, visit  <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a>  </div>';
      }
      if (config.is_send_ask == true) {
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
      } else {
        config.is_send_ask = true;

        if (intentRequest.requestAttributes != null) {
          var platform =
            intentRequest.requestAttributes['x-amz-lex:channel-type'];
        } else {
          var platform = 'Web';
        }
        console.log('platform web');
        var message =
          'Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. \n\nTo know more about Prologic Technologies, visit https://www.prologic-technologies.com/';

        if (platform == 'Web') {
          console.log('platform web');
          var message =
            '<div> Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours.<br/>  <br/>To know more about Prologic Technologies, visit  <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a><br/>  </div>';
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
          console.log(query_form.user_query, 'userquery');
          var status = common.sendEmail(
            '<pre><h4>Hi <b>' +
            query_form.user_name +
            '</b> has asked the following query from ' +
            platform +
            ':</h4><br>' +
            query_form.user_query +
            ' .<br>Kindly respond back to his/her email id : <b>' +
            query_form.user_email +
            ' </b>or contact number :<b>' +
            query_form.user_contact +
            '</b> </pre>',
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
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_contact != null &&
      query_form.user_query != null &&
      query_form.is_complete.toUpperCase() == 'YES' // converting input values to uppercase
    ) {
      config.is_send_ask = false;
      config.current_step = '';
      let genericAttachments = [
        {
          attachmentLinkUrl: null,
          // buttons: [
          //   {
          //     text: 'General Enquiry?',
          //     value: 'General Enquiry',
          //   },
          //   {
          //     text: 'Business Enquiry?',
          //     value: 'Business Enquiry',
          //   },
          // ],
          buttons: [
            {
              text: 'Apply for Job',
              value: 'Apply for Job',
            },
            {
              text: 'Our Service Areas',
              value: 'Our Service Areas',
            },
            {
              text: 'Discuss Project/Idea',
              value: 'Discuss Project or Idea',
            },
            {
              text: 'Book a free consult',
              value: 'Book a free consult',
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
      query_form.is_complete.toUpperCase() == 'NO'
    ) {
      //smiley check for platforms
      config.is_send_ask = false;
      var msg = 'Thank You. Have a great day! :)';
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var msg = 'Thank You. Have a great day!:slightly_smiling_face:';
        }
      } else {
        var msg =
          '<div>Thank You. Have a great day! &#x1F60A <br/>To start a new conversation say, Hi</div>';
      }
      return lexResponses.close(
        intentRequest.sessionAttributes,
        'Fulfilled',
        msg
      );
    } else if (config.is_send_ask == true) {
      // console.log ('call');
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }

      var message =
        'Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. \n\nTo know more about Prologic Technologies, visit https://www.prologic-technologies.com/';

      if (platform == 'Web') {
        // console.log ('platform web');
        var message =
          '<div> Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. <br/><br/> To know more about Prologic Technologies, visit  <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a> <br/> </div>';
      }
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
    }
  }
};

var https = require('https');
// sending slack message function
function sendSlackMsg(postm, callback) {
  var post_data = {
    text: postm,
  };

  var post_options = {
    host: 'hooks.slack.com',
    path: '/services/T5676QE8N/BD5VAL5JP/bRgApPuynJxt6yPZoN9p6A9b',
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
