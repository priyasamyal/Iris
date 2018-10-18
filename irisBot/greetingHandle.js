'use strict';

const request = require('request');
const lexResponses = require('../lexResponses');
const config = require('../lib/send_email.js');
const common = require('../lib/send_email');

module.exports = function (intentRequest) {
  // console.log (
  //   'intentRequest greeting Handle called' + '' + JSON.stringify (intentRequest)
  // );

  const source = intentRequest.invocationSource;
  // console.log (source, 'greeting Handle : source deploy');

  if (source === 'DialogCodeHook') {
    if (config.current_step == 'discussIntent') {
      config.current_step = '';
      config.is_send_discuss = 'true';
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
        '\n For more queries you may send a mail to business@prologictechnologies.in';

      if (platform == 'Web') {
        var message =
          '<div> Thank you for sharing your Project/Idea. We will call you between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT) on ' +
          config.user_details.user_day +
          '.' +
          ' <br/>For more queries you may send a mail to <a href="mailto:business@prologictechnologies.in" target="_top">business@prologictechnologies.in</a>  </div>';
      }
      config.user_details.user_des = intentRequest.inputTranscript;
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
      var status = common.sendInvite(
        '<span>Hi Priya, <br> This is to inform you that, your appointment for  project/Idea discussion session has been confirmed. You will receive a phone call from us on ' + config.user_details.user_day + ' between ' + config.user_details.user_time + ' (IST, + 5.5 GMT). <br><br>If you have any query, please feel free to contact us at 0172-55316 or you can write us at <a href="mailto:example@email.com">info@prologictechnologie.in</a>  <br><br> Thanks & Regards<br>Prologic Technologies</span> ', config.user_details.user_email, 'Project Discussion Appointement with Prologic Technologies'
      );
      sendSlackMsg(slack_msg, myResults => {
        // console.log ('Slack message sent : ' + myResult);
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
        message,
        genericAttachments
      );
    } else if (config.current_step == 'consultIntent') {
      // consult intent  handling

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
          '<br/><br/>To know more about Prologic Technologies visit <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a> <br/>   </div>';
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
        config.user_details.company_size +
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
          '<span>Hi <b>' +
          config.user_details.user_name +
          '</b> has booked a Consultation session. His/Her details are given below:</span> <br>' +
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
          '<pre> <h4>Hi <b>' +
          config.user_details.user_name +
          '</b> has asked the following query from ' +
          platform +
          ':</h4><br>' +
          config.user_details.user_query +
          ' .<br>Kindly respond back to his/her email id : <b>' +
          config.user_details.user_email +
          ' </b>or contact number :<b>' +
          config.user_details.user_contact +
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
    } else if (intentRequest.currentIntent.slots.query == null) {
      // console.log ('first time hit . So slot chosen');
      var message =
        'Hello, My name is Iris and I work for Prologic Technologies.';
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      if (platform == 'Web') {
        var message = 'Hi, Welcome to Prologic Technologies.';
      }

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
          title: 'What can I help you with?',
        },
      ];
      return lexResponses.elicitSlot(
        intentRequest.sessionAttributes,
        'Greeting',
        intentRequest.currentIntent.slots,
        'query',
        message,
        genericAttachments
      );
    } else if (intentRequest.currentIntent.slots.query == 'Apply Now') {
      config.name_filled = true;
      let message =
        'Thanks for showing your interest in Prologic Technologies. To process your application, please enter your name.';
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
    } else {
      if (intentRequest.currentIntent.slots.query == 'Business Query') {
        // console.log ('Business Query selected');

        let genericAttachments = [
          {
            attachmentLinkUrl: null,
            buttons: [
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
            subTitle: 'Would you like to',
            title: 'Please choose your option',
          },
        ];
        return lexResponses.elicitSlot(
          intentRequest.sessionAttributes,
          'BusinessQuery',
          { bus_query: null },
          'bus_query',
          "I'm sure i can help you with this",
          genericAttachments
        );
      } else {
        // console.log ('General Query selected');
        // console.log ('switch to User query intent');
        let genericAttachments = [
          {
            attachmentLinkUrl: null,
            buttons: [
              {
                text: 'Career Query?',
                value: 'Career Query',
              },
              {
                text: 'Service Query?',
                value: 'Service Query',
              },
            ],
            imageUrl: null,
            subTitle: '...',
            title: 'Do you have a ',
          },
        ];
        return lexResponses.elicitSlot(
          intentRequest.sessionAttributes,
          'UserQuery',
          { query_gen: null, is_complete: null },
          'query_gen',
          'Okay, Can you please be specific?',
          genericAttachments
        );
      }
    }
  }

  if (source === 'FulfillmentCodeHook') {
    // console.log ('switch to User query intent');
    let genericAttachments = [
      {
        attachmentLinkUrl: null,
        buttons: [
          {
            text: 'Career Query',
            value: 'Career Query',
          },
          {
            text: 'Common Query',
            value: 'Common Query',
          },
        ],
        imageUrl: null,
        subTitle: 'Queries',
        title: 'What kind of queries you have ?',
      },
    ];
    return lexResponses.elicitSlot(
      intentRequest.sessionAttributes,
      'UserQuery',
      intentRequest.currentIntent.slots,
      'query_gen',
      'What kind of general queries',
      genericAttachments
    );
  }
};
// sending slack message function
var https = require('https');
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
