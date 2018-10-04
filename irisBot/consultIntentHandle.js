'use strict';
const lexResponses = require ('../lexResponses');
const request = require ('request');

const config = require ('../lib/send_email.js');
const common = require ('../lib/send_email');
module.exports = function (intentRequest) {
  console.log (
    'intentRequest consultIntentHandle  called ..' +
      '' +
      JSON.stringify (intentRequest)
  );

  console.log (config.is_send, 'config.is_send');
  const source = intentRequest.invocationSource;
  var query_form = intentRequest.currentIntent.slots;
  var mail;
  console.log (query_form.user_name, 'form value', query_form);
  if (intentRequest.inputTranscript.indexOf ('<mailto:') !== -1) {
    mail = intentRequest.inputTranscript.split ('|');
    mail = mail[1].split ('>');
    query_form.user_email = mail[0];
    console.log (mail, 'split perform', query_form);
  }
  if (source === 'DialogCodeHook') {
    if (config.current_step == 'discussIntent') {
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
        '\n For more queries you may send a mail to business@prologictechnologies.in';

      if (platform == 'Web') {
        console.log ('platform web');
        var message =
          '<div> Thank you for sharing your Project/Idea. We will call you between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT) on ' +
          config.user_details.user_day +
          '<br/>For more queries you may send a mail to <b>business@prologictechnologies.in</b>   </div>';
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
      sendSlackMsg (slack_msg, myResult => {
        console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail (
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
      return lexResponses.elicitSlot (
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
    } else if (config.current_step == 'askqueryIntent') {
      console.log ('bloack1 call');
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
        console.log ('platform web');
        var message =
          '<div> Thank You so much. I have forwarded your query to the concerned person. Someone from our team will get back to you within 48 hours. <br> To know more about Prologic Technologies, visit  <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a>  </div>';
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
        message,
        genericAttachments
      );
    } else if (config.current_step == 'consultIntent') {
      console.log ('bloack2 call');
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
        '\n To know more about Prologic Technologies visit https://www.prologic-technologies.com/';

      if (platform == 'Web') {
        console.log ('platform web');
        var message =
          '<div> I have booked your free 30 minutes consultation with our expert. We will call between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT) on ' +
          config.user_details.user_day +
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
      sendSlackMsg (slack_msg, myResult => {
        console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail (
          '<span>Hi <b>' +
            config.user_details.user_name +
            '</b> has booked a Consultation session from' +
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

      return lexResponses.elicitSlot (
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
    } else if (
      query_form.user_name == null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_company == null &&
      query_form.user_des == null &&
      query_form.user_size == null &&
      query_form.userr_type == null &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      console.log ('callconsult.....');
      let message =
        'Wow! I am excited. Our experts are here to help. \nMay i know your name?';
      return lexResponses.elicitSlotWithoutCard (
        intentRequest.sessionAttributes,
        'ConsultIntent',
        {
          user_company: null,
          user_des: null,
          user_email: null,
          user_name: null,
          user_phone: null,
          user_size: null,
          userr_type: null,
          user_day: null,
          user_time: null,

          is_complete: null,
        },
        'user_name',
        message
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_company == null &&
      query_form.user_des == null &&
      query_form.user_size == null &&
      (query_form.userr_type == 'SME' || query_form.userr_type == 'Start-up') &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      let message = "What's your company's name ?";
      return lexResponses.elicitSlotWithoutCard (
        intentRequest.sessionAttributes,
        'ConsultIntent',
        {
          user_company: null,
          user_des: null,
          user_email: null,
          user_name: query_form.user_name,
          user_phone: null,
          user_size: null,
          userr_type: query_form.userr_type,
          user_day: null,

          user_time: null,
          is_complete: null,
        },
        'user_company',
        message
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_company == null &&
      query_form.user_des == null &&
      query_form.user_size == null &&
      query_form.userr_type == null &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      var namePattern = /^[A-Za-z ]+$/;
      var nameVAlidation = namePattern.test (intentRequest.inputTranscript);
      console.log (nameVAlidation, 'aaaaa');
      if (!nameVAlidation) {
        console.log ('a');
        let message =
          'Wow! I am excited. Our experts are here to help. \nMay i know your name?';
        return lexResponses.elicitSlotWithoutCard (
          intentRequest.sessionAttributes,
          'ConsultIntent',
          {
            user_company: null,
            user_des: null,
            user_email: null,
            user_name: null,
            user_phone: null,
            user_size: null,
            userr_type: null,
            user_day: null,
            user_time: null,

            is_complete: null,
          },
          'user_name',
          message
        );
      } else {
        let genericAttachments = [
          {
            attachmentLinkUrl: null,
            buttons: [
              {
                text: 'an Individual',
                value: 'individual',
              },
              {
                text: 'SME',
                value: 'SME',
              },
              {
                text: 'Start-up',
                value: 'Start-up',
              },
            ],
            imageUrl: null,
            subTitle: '...',
            title: 'Are you?',
          },
        ];
        return lexResponses.elicitSlot (
          intentRequest.sessionAttributes,
          'ConsultIntent',
          {
            user_company: null,
            user_des: null,
            user_email: null,
            user_name: query_form.user_name,
            user_phone: null,
            user_size: null,
            userr_type: null,
            user_day: null,

            user_time: null,
            is_complete: null,
          },
          'userr_type',
          'Please specify your user type.',
          genericAttachments
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_company != null &&
      query_form.user_des == null &&
      query_form.user_size == null &&
      (query_form.userr_type == 'SME' || query_form.userr_type == 'Start-up') &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      let message = 'Size of your company please?';
      let genericAttachments = [
        {
          attachmentLinkUrl: null,
          buttons: [
            {
              text: '0-50',
              value: '0-50',
            },

            {
              text: '50-150',
              value: '50-150',
            },
            {
              text: '150+',
              value: '150+',
            },
          ],
          imageUrl: null,
          subTitle: '...',
          title: 'Please choose one',
        },
      ];
      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'ConsultIntent',
        {
          user_company: query_form.user_company,
          user_des: null,
          user_email: null,
          user_name: query_form.user_name,
          user_phone: null,
          user_size: null,
          userr_type: query_form.userr_type,
          user_day: null,

          user_time: null,
          is_complete: null,
        },
        'user_size',
        message,
        genericAttachments
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.userr_type != null &&
      query_form.user_des == null &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      let message = 'May I have your phone number?';
      return lexResponses.elicitSlotWithoutCard (
        intentRequest.sessionAttributes,
        'ConsultIntent',
        {
          user_company: query_form.user_company,
          user_des: null,
          user_email: null,
          user_name: query_form.user_name,
          user_phone: null,
          user_size: query_form.user_size,
          userr_type: query_form.userr_type,
          user_day: null,

          user_time: null,
          is_complete: null,
        },
        'user_phone',
        message
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email == null &&
      query_form.user_phone != null &&
      query_form.user_des == null &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      var emailPattern = /^[a-zA-Z][a-zA-Z0-9_+]*(\.[a-zA-Z][a-zA-Z0-9_+]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var emailValidation = emailPattern.test (mail[0]);
        } else {
          var emailValidation = emailPattern.test (
            intentRequest.inputTranscript
          );
        }
      } else {
        var emailValidation = emailPattern.test (intentRequest.inputTranscript);
      }
      if (!emailValidation) {
        let message = 'And your email address please?';
        return lexResponses.elicitSlotWithoutCard (
          intentRequest.sessionAttributes,
          'ConsultIntent',
          {
            user_company: query_form.user_company,
            user_des: null,
            user_email: null,
            user_name: query_form.user_name,
            user_phone: query_form.user_phone,
            user_size: query_form.user_size,
            userr_type: query_form.userr_type,
            user_day: null,

            user_time: null,
            is_complete: null,
          },
          'user_email',
          message
        );
      } else if (
        intentRequest.inputTranscript.length < 7 ||
        intentRequest.inputTranscript.length > 13
      ) {
        let message = 'May I have your phone number?';
        return lexResponses.elicitSlotWithoutCard (
          intentRequest.sessionAttributes,
          'ConsultIntent',
          {
            user_company: query_form.user_company,
            user_des: null,
            user_email: null,
            user_name: query_form.user_name,
            user_phone: null,
            user_size: query_form.user_size,
            userr_type: query_form.userr_type,
            user_day: null,

            user_time: null,
            is_complete: null,
          },
          'user_phone',
          message
        );
      } else {
        let message = 'And your email address please?';
        return lexResponses.elicitSlotWithoutCard (
          intentRequest.sessionAttributes,
          'ConsultIntent',
          {
            user_company: query_form.user_company,
            user_des: null,
            user_email: null,
            user_name: query_form.user_name,
            user_phone: query_form.user_phone,
            user_size: query_form.user_size,
            userr_type: query_form.userr_type,
            user_day: null,

            user_time: null,
            is_complete: null,
          },
          'user_email',
          message
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_des == null &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      var emailPattern = /^[a-zA-Z][a-zA-Z0-9_+]*(\.[a-zA-Z][a-zA-Z0-9_+]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;

      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var emailValidation = emailPattern.test (mail[0]);
        } else {
          var emailValidation = emailPattern.test (
            intentRequest.inputTranscript
          );
        }
      } else {
        var emailValidation = emailPattern.test (intentRequest.inputTranscript);
      }
      if (!emailValidation) {
        let message = 'And your email address please?';
        return lexResponses.elicitSlotWithoutCard (
          intentRequest.sessionAttributes,
          'ConsultIntent',
          {
            user_company: query_form.user_company,
            user_des: null,
            user_email: null,
            user_name: query_form.user_name,
            user_phone: query_form.user_phone,
            user_size: query_form.user_size,
            userr_type: query_form.userr_type,
            user_day: null,

            user_time: null,
            is_complete: null,
          },
          'user_email',
          message
        );
      } else {
        if (intentRequest.requestAttributes != null) {
          if (
            intentRequest.requestAttributes['x-amz-lex:channel-type'] ==
            'Facebook'
          ) {
            return lexResponses.elicitSlotWithoutCard (
              intentRequest.sessionAttributes,
              'ConsultIntent',
              {
                user_company: query_form.user_company,
                user_des: null,
                user_email: query_form.user_email,
                user_name: query_form.user_name,
                user_phone: query_form.user_phone,
                user_size: query_form.user_size,
                userr_type: query_form.userr_type,
                user_day: null,

                user_time: null,
                is_complete: null,
              },
              'user_day',
              'Best day to contact you'
            );
          } else {
            var all_days = [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
            ];
            var d = new Date ();
            var current_day = d.getDay ();
            var show_days = [];
            for (var i = 0; i < all_days.length; i++) {
              show_days.push ({
                text: all_days[i],
                value: all_days[i],
              });
            }
            console.log (show_days, JSON.stringify (show_days), 'show days');
            let genericAttachments = [
              {
                attachmentLinkUrl: null,
                buttons: show_days,
                imageUrl: null,
                subTitle: '...',
                title: 'Choose a day.',
              },
            ];
            return lexResponses.elicitSlot (
              intentRequest.sessionAttributes,
              'ConsultIntent',
              {
                user_company: query_form.user_company,
                user_des: null,
                user_email: query_form.user_email,
                user_name: query_form.user_name,
                user_phone: query_form.user_phone,
                user_size: query_form.user_size,
                userr_type: query_form.userr_type,
                user_day: null,

                user_time: null,
                is_complete: null,
              },
              'user_day',
              'Best day to contact you',
              genericAttachments
            );
          }
        } else {
          var all_days = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ];
          var d = new Date ();
          var current_day = d.getDay ();
          var show_days = [];
          for (var i = 0; i < all_days.length; i++) {
            show_days.push ({
              text: all_days[i],
              value: all_days[i],
            });
          }
          console.log (show_days, JSON.stringify (show_days), 'show days');
          let genericAttachments = [
            {
              attachmentLinkUrl: null,
              buttons: show_days,
              imageUrl: null,
              subTitle: '...',
              title: 'Choose a day.',
            },
          ];
          return lexResponses.elicitSlot (
            intentRequest.sessionAttributes,
            'ConsultIntent',
            {
              user_company: query_form.user_company,
              user_des: null,
              user_email: query_form.user_email,
              user_name: query_form.user_name,
              user_phone: query_form.user_phone,
              user_size: query_form.user_size,
              userr_type: query_form.userr_type,
              user_day: null,

              user_time: null,
              is_complete: null,
            },
            'user_day',
            'Best day to contact you',
            genericAttachments
          );
        }
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_des == null &&
      query_form.user_day != null &&
      query_form.user_time == null
    ) {
      let message =
        'May i know a convenient time slot for phone call on ' +
        query_form.user_day +
        '.';
      let genericAttachments = [
        {
          attachmentLinkUrl: null,
          buttons: [
            {
              text: '9:00 am - 12:00 pm',
              value: '9:00 am - 12:00 pm',
            },

            {
              text: '12:00 pm - 4:00 pm ',
              value: '12:00 pm - 4:00 pm',
            },
            {
              text: '4:00pm - 8:00 pm',
              value: '4:00pm - 8:00 pm',
            },
          ],
          imageUrl: null,
          subTitle: '...',
          title: 'Indian Standard Time, +5.5 GMT',
        },
      ];
      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'ConsultIntent',
        {
          user_company: query_form.user_company,
          user_des: null,
          user_email: query_form.user_email,
          user_name: query_form.user_name,
          user_phone: query_form.user_phone,
          user_size: query_form.user_size,
          userr_type: query_form.userr_type,
          user_day: query_form.user_day,

          user_time: null,
          is_complete: null,
        },
        'user_time',
        message,
        genericAttachments
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_des == null &&
      query_form.user_day != null &&
      query_form.user_time != null
    ) {
      config.current_step = 'consultIntent';
      config.user_details = query_form;
      let message = 'Can you please specify, what you need to consult?';

      return lexResponses.elicitSlotWithoutCard (
        intentRequest.sessionAttributes,
        'ConsultIntent',
        {
          user_company: query_form.user_company,
          user_des: null,
          user_email: query_form.user_email,
          user_name: query_form.user_name,
          user_phone: query_form.user_phone,
          user_size: query_form.user_size,
          userr_type: query_form.userr_type,
          user_day: query_form.user_day,

          user_time: query_form.user_time,
          is_complete: null,
        },
        'user_des',
        message
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_des != null &&
      query_form.is_complete == null &&
      config.is_send == false
    ) {
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      console.log ('bloack3 call');

      var message =
        'I have booked your free 30 minutes consultation with our expert. We will call between ' +
        config.user_details.user_time +
        ' (IST, + 5.5 GMT) on ' +
        config.user_details.user_day +
        '\n To know more about Prologic Technologies visit https://www.prologic-technologies.com/';

      if (platform == 'Web') {
        console.log ('platform web');
        var message =
          '<div> I have booked your free 30 minutes consultation with our expert. We will call between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT) on ' +
          config.user_details.user_day +
          '<br/>To know more about Prologic Technologies visit <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a>    </div>';
      }

      var slack_msg =
        'Hi *' +
        config.user_details.user_name +
        '* has booked a consultation session from ' +
        platform +
        '. His/Her details are given below : \n' +
        ' E-mail Id :' +
        query_form.user_email +
        '\n Contact number : ' +
        query_form.user_phone +
        '\n Company Name : ' +
        query_form.user_company +
        '\n Company Size : ' +
        query_form.user_size +
        '\n Project Description:' +
        query_form.user_des +
        '\n Contact Day :' +
        query_form.user_day +
        '\n Contact Time : ' +
        query_form.user_time +
        '\n User Type : ' +
        query_form.userr_type;
      sendSlackMsg (slack_msg, myResult => {
        console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail (
          '<span>Hi <b>' +
            query_form.user_name +
            '</b> has booked a Consultation session from' +
            platform +
            '. His/Her details are given below:</span> <br>' +
            ' E-mail Id : ' +
            query_form.user_email +
            '\<br> Contact number : ' +
            query_form.user_phone +
            '<br> Company Name : ' +
            query_form.user_company +
            '<br> User Type : ' +
            query_form.userr_type +
            '<br> Company Size : ' +
            query_form.user_size +
            '<br> Project Description : ' +
            query_form.user_des +
            '<br> Contact Day : ' +
            query_form.user_day +
            '<br> Contact Time : ' +
            query_form.user_time,
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

      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'ConsultIntent',
        {
          user_company: query_form.user_company,
          user_des: query_form.user_des,
          user_email: query_form.user_email,
          user_name: query_form.user_name,
          user_phone: query_form.user_phone,
          user_size: query_form.user_size,
          userr_type: query_form.userr_type,
          user_day: query_form.user_day,

          user_time: query_form.user_time,
          is_complete: null,
        },
        'is_complete',
        message,
        genericAttachments
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_des != null &&
      query_form.is_complete == 'Yes'
    ) {
      // For second time enter

      config.is_send = false;

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
      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'Greeting',
        {query: null},
        'query',
        'Okay, How can i help you?',
        genericAttachments
      );
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_des != null &&
      query_form.is_complete == 'No'
    ) {
      config.is_send = false;
      var msg = 'Thank You. Have a great day! :)';
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var msg = 'Thank You. Have a great day! :slightly_smiling_face:';
        }
      } else {
        var msg =
          '<div>Thank You. Have a great day! &#x1F642.To start a new conversation say Hi</div>';
      }
      return lexResponses.close (
        intentRequest.sessionAttributes,
        'Fulfilled',
        msg
      );
    } else if (config.is_send == true) {
      console.log ('config.is_send.....');
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      console.log ('bloack3 call');

      var message =
        'I have booked your free 30 minutes consultation with our expert. We will call between ' +
        config.user_details.user_time +
        ' (IST, + 5.5 GMT) on ' +
        config.user_details.user_day +
        '\n To know more about Prologic Technologies visit https://www.prologic-technologies.com/';

      if (platform == 'Web') {
        console.log ('platform web');
        var message =
          '<div> I have booked your free 30 minutes consultation with our expert. We will call between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT) on ' +
          config.user_details.user_day +
          '<br/>To know more about Prologic Technologies visit <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a>    </div>';
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

      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'ConsultIntent',
        {
          user_company: query_form.user_company,
          user_des: query_form.user_des,
          user_email: query_form.user_email,
          user_name: query_form.user_name,
          user_phone: query_form.user_phone,
          user_size: query_form.user_size,
          userr_type: query_form.userr_type,
          user_day: query_form.user_day,

          user_time: query_form.user_time,
          is_complete: null,
        },
        'is_complete',
        message,
        genericAttachments
      );
    }

    //other
  }
};
var https = require ('https');
function sendSlackMsg (postm, callback) {
  console.log (postm, 'postm');

  var post_data = {
    text: postm,
  };

  var post_options = {
    host: 'hooks.slack.com',
    path: '/services/T5676QE8N/BD5VAL5JP/bRgApPuynJxt6yPZoN9p6A9b',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength (JSON.stringify (post_data)),
    },
  };

  // var email_message =
  //   '<span>Hi <b>' +
  //   query_form.user_name +
  //   'email_string' +
  //   ' E-mail Id : ' +
  //   query_form.user_email +
  //   '\<br> Contact number : ' +
  //   query_form.user_phone +
  //   '<br> Company Name : ' +
  //   query_form.user_company +
  //   '<br> User Type : ' +
  //   query_form.userr_type +
  //   '<br> Company Size : ' +
  //   query_form.user_size +
  //   '<br> Project Description : ' +
  //   query_form.user_des +
  //   '<br> Contact Day : ' +
  //   query_form.user_day +
  //   '<br> Contact Time : ' +
  //   query_form.user_time;
  // var email_subject = emai_sub + source;

  // var status = common.sendEmail (email_message, 'email_subject');

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
