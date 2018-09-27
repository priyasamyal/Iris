'use strict';
const common = require ('../lib/send_email');
const lexResponses = require ('../lexResponses');
const config = require ('../lib/send_email.js');

module.exports = function (intentRequest) {
  console.log (
    'intentRequest careerQueryHandle  called ..' +
      '' +
      JSON.stringify (intentRequest)
  );
  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {
    if (config.current_step == 'askqueryIntent') {
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
      sendSlackMsg (slack_msg, myResult => {
        console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail (
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

      return lexResponses.elicitSlot (
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
    } else if (intentRequest.currentIntent.slots.career == null) {
      let genericAttachments = [
        {
          attachmentLinkUrl: null,
          buttons: [
            {
              text: 'Apply Now',
              value: 'Apply Now',
            },
            {
              text: 'Learn More',
              value: 'query',
            },
          ],
          imageUrl: null,
          subTitle: '...',
          title: 'You may apply now or choose a option to know more.',
        },
      ];
      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'CareerQuery',
        {career: null},
        'career',
        'Great! Do you wish to join our vibrant team?',
        genericAttachments
      );
    } else if (intentRequest.currentIntent.slots.career == 'Learn More') {
      var message =
        'I am happy to help :) and would need some details. Can I have your first name, please?';
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var message =
            'I am happy to help :slightly_smiling_face: and would need some details. Can I have your first name, please?';
        }
      } else {
        var message =
          'I am happy to help 🙂 and would need some details. Can I have your first name, please?';
      }

      return lexResponses.elicitSlotWithoutCard (
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
    }

    if (intentRequest.currentIntent.slots.career == 'Apply Now') {
      let message =
        'Sure, I can help you process your application right now. Please type in your first name.';
      return lexResponses.elicitSlotWithoutCard (
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
    }
  }

  if (source === 'FulfillmentCodeHook') {
    console.log ('switch to User query intent');
    let genericAttachments = [
      {
        attachmentLinkUrl: null,
        buttons: [
          {
            text: 'Career',
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
    return lexResponses.elicitSlot (
      intentRequest.sessionAttributes,
      'UserQuery',
      intentRequest.currentIntent.slots,
      'query_gen',
      'What kind of general queries',
      genericAttachments
    );
  }
};
var https = require ('https');
function sendSlackMsg (postm, callback) {
  var post_data = {
    text: postm,
  };

  var post_options = {
    host: 'hooks.slack.com',
    path: '/services/T5676QE8N/BBYUHJB1A/N1AZzu3MjtyT6RsEUsxg6Y8N',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength (JSON.stringify (post_data)),
    },
  };

  var post_req = https.request (post_options, res => {
    res.setEncoding ('utf8');
    var returnData = '';
    res.on ('data', chunk => {
      returnData += chunk;
    });
    res.on ('end', () => {
      callback ('Success');
    });
  });
  post_req.write (JSON.stringify (post_data));
  post_req.end ();
}
