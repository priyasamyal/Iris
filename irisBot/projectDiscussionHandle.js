'use strict';
const lexResponses = require ('../lexResponses');
const request = require ('request');

const config = require ('../lib/send_email.js');
const common = require ('../lib/send_email');
module.exports = function (intentRequest) {
  // console.log (config.current_step);

  // console.log (
  //   'intentRequest projectDiscussion  called ..' +
  //     '' +
  //     JSON.stringify (intentRequest)
  // );
  const source = intentRequest.invocationSource;
  var query_form = intentRequest.currentIntent.slots;
  var mail;
  //  updated code
  // console.log (query_form.user_name, 'form value', query_form);
  if (intentRequest.inputTranscript.indexOf ('<mailto:') !== -1) {
    //email for slack
    mail = intentRequest.inputTranscript.split ('|');
    mail = mail[1].split ('>');
    query_form.user_email = mail[0];
    // console.log (mail, 'split perform', query_form);
  }
  if (source === 'DialogCodeHook') {
    if (config.current_step == 'consultIntent') {
      // console.log (config.user_details, 'blueeyes');
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
        ' (IST, + 5.5 GMT)' +
        '\n User Type : ' +
        config.user_details.userr_type;
      var status = common.sendInvite (
        '<pre><span>Hi</span></pre>',
        'priya@prologictechnologies.in',
        'Test'
      );
      var status = common.sendInvite (
        '<span>Hi ' +
          config.user_details.user_name +
          ', <br> This is to inform you that, your appointment for free consultation session has been confirmed. You will receive a phone call from us on ' +
          config.user_details.user_day +
          ' between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT). <br><br>If you have any query, please feel free to contact us at 0172-55316 or you can write us at <a href="mailto:example@email.com">info@prologictechnologie.in</a>  <br><br> Thanks & Regards<br>Prologic Technologies</span> ',
        config.user_details.user_email,
        'Consultation Appointment with Prologic Technologies'
      );
      sendSlackMsg (slack_msg, myResult => {
        // console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail (
          ' <pre> <span>Hi <b>' +
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
            config.user_details.user_size +
            '<br> Project Description : ' +
            config.user_details.user_des +
            '<br> Contact Day : ' +
            config.user_details.user_day +
            '<br> Contact Time : ' +
            config.user_details.user_time +
            ' (IST, + 5.5 GMT)' +
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
      var status = common.sendInvite (
        '<pre><span>Hi</span></pre>',
        'priya@prologictechnologies.in',
        'Test'
      );
      sendSlackMsg (slack_msg, myResult => {
        // console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail (
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
    } else if (config.current_step == 'discussIntent') {
      config.current_step = '';
      config.is_send_discuss = true;
      // console.log ('welcome');
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
        '\n For more queries you may send a mail to business@prologictechnologies.in';

      if (platform == 'Web') {
        // console.log ('platform web');
        var message =
          '<div> Thank you for sharing your Project/Idea. We will call you between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT) on ' +
          query_form.user_day +
          '.' +
          ' <br/><br/>For more queries you may send a mail to <a href="mailto:business@prologictechnologies.in" target="_top">business@prologictechnologies.in</a> <br/> </div>';
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
        query_form.user_day +
        '\n Contact Time : ' +
        config.user_details.user_time +
        ' (IST, + 5.5 GMT)' +
        '\n User Type : ' +
        config.user_details.userr_type;
      var status = common.sendInvite (
        '<span>Hi ' +
          config.user_details.user_name +
          ', <br> This is to inform you that, your appointment for  project/Idea discussion session has been confirmed. You will receive a phone call from us on ' +
          query_form.user_day +
          ' between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT). <br><br>If you have any query, please feel free to contact us at 0172-55316 or you can write us at <a href="mailto:example@email.com">info@prologictechnologie.in</a>  <br><br> Thanks & Regards<br>Prologic Technologies</span> ',
        config.user_details.user_email,
        'Project Discussion Appointment with Prologic Technologies'
      );
      sendSlackMsg (slack_msg, myResult => {
        // console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail (
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
            query_form.user_day +
            '<br> Contact Time : ' +
            config.user_details.user_time +
            ' (IST, + 5.5 GMT)' +
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
    } else if (
      query_form.user_name == null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_company == null &&
      query_form.user_des == null &&
      query_form.company_size == null &&
      query_form.userr_type == null &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      let message =
        'To process your request I would need some information.\nDo not worry, Your idea is 100% protected by our non-disclosure agreement.\n\nMay I know your name, please?';
      return lexResponses.elicitSlotWithoutCard (
        intentRequest.sessionAttributes,
        'DiscussIntent',
        {
          user_company: null,
          user_des: null,
          user_email: null,
          user_name: null,
          user_phone: null,
          company_size: null,
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
      query_form.company_size == null &&
      (query_form.userr_type == 'SME' || query_form.userr_type == 'Start-Up') &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      let message = 'What is the name of your company, please?';
      return lexResponses.elicitSlotWithoutCard (
        intentRequest.sessionAttributes,
        'DiscussIntent',
        {
          user_company: null,
          user_des: null,
          user_email: null,
          user_name: query_form.user_name,
          user_phone: null,
          company_size: null,
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
      query_form.company_size == null &&
      query_form.userr_type == null &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      var namePattern = /^[A-Za-z ]+$/;
      var nameVAlidation = namePattern.test (intentRequest.inputTranscript);
      if (!nameVAlidation) {
        // console.log ('pologt');
        let message =
          'To process your request I would need some information.\nDo not worry, Your idea is 100% protected by our non-disclosure agreement.\n\nMay I know your name, please?';
        return lexResponses.elicitSlotWithoutCard (
          intentRequest.sessionAttributes,
          'DiscussIntent',
          {
            user_company: null,
            user_des: null,
            user_email: null,
            user_name: null,
            user_phone: null,
            company_size: null,
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
                value: 'an Individual',
              },

              {
                text: 'Start-up',
                value: 'Start-Up',
              },
              {
                text: 'SME',
                value: 'SME',
              },
            ],
            imageUrl: null,
            subTitle: '...',
            title: 'Are you?',
          },
        ];
        return lexResponses.elicitSlot (
          intentRequest.sessionAttributes,
          'DiscussIntent',
          {
            user_company: null,
            user_des: null,
            user_email: null,
            user_name: query_form.user_name,
            user_phone: null,
            company_size: null,
            userr_type: null,
            user_day: null,
            user_time: null,
            is_complete: null,
          },
          'userr_type',
          'What is your user type?',
          genericAttachments
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_company != null &&
      query_form.user_des == null &&
      query_form.company_size == null &&
      (query_form.userr_type == 'SME' || query_form.userr_type == 'Start-Up') &&
      query_form.user_day == null &&
      query_form.user_time == null
    ) {
      let message = 'What is your company size?';
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
        'DiscussIntent',
        {
          user_company: query_form.user_company,
          user_des: null,
          user_email: null,
          user_name: query_form.user_name,
          user_phone: null,
          company_size: null,
          userr_type: query_form.userr_type,
          user_day: null,
          user_time: null,
          is_complete: null,
        },
        'company_size',
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
      let message =
        'Okay ' + query_form.user_name + ', May I have your phone number?';
      return lexResponses.elicitSlotWithoutCard (
        intentRequest.sessionAttributes,
        'DiscussIntent',
        {
          user_company: query_form.user_company,
          user_des: null,
          user_email: null,
          user_name: query_form.user_name,
          user_phone: null,
          company_size: query_form.company_size,
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
      // console.log ('email1');

      // console.log ('phone1');
      var phone_reg = /^\d{7,13}$/;
      // console.log ('phone2');
      var phone_val = phone_reg.test (query_form.user_phone);
      // console.log ('phone3');
      let message =
        'Okay ' + query_form.user_name + ', May I have your phone number?';
      if (!phone_val) {
        // console.log ('phone4');
        return lexResponses.elicitSlotWithoutCard (
          intentRequest.sessionAttributes,
          'DiscussIntent',
          {
            user_company: query_form.user_company,
            user_des: null,
            user_email: null,
            user_name: query_form.user_name,
            user_phone: null,
            company_size: query_form.company_size,
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
          'DiscussIntent',
          {
            user_company: query_form.user_company,
            user_des: null,
            user_email: null,
            user_name: query_form.user_name,
            user_phone: query_form.user_phone,
            company_size: query_form.company_size,
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
      //getting next seven days
      var startDate = new Date ();
      config.aryDates = GetDates (startDate, 7);
      var splitArr;
      config.daysArr = [];

      for (var i = 0; i < config.aryDates.length; i++) {
        splitArr = config.aryDates[i].split (' ');
        console.log (splitArr, 'split');

        // check for having only week days in array
        if (
          splitArr[0] == 'Monday' ||
          splitArr[0] == 'Tuesday' ||
          splitArr[0] == 'Wednesday' ||
          splitArr[0] == 'Thursday' ||
          splitArr[0] == 'Friday'
        ) {
          config.daysArr.push ({
            text: dateSuffix (splitArr[1]) + ' of ' + splitArr[0],
            value: splitArr[0],
          });
        }
      }
      // email validation
      var emailPattern = /^[a-zA-Z][a-zA-Z0-9_+]*(\.[a-zA-Z][a-zA-Z0-9_+]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
      var contactno = /^\d+$/;
      // console.log (mail, 'mailmustang');
      if (intentRequest.requestAttributes != null) {
        if (mail) {
          //fetching email on slack
          if (
            intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
          ) {
            var emailValidation = emailPattern.test (mail[0]);
          }
        } else if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] ==
          'Facebook'
        ) {
          var emailValidation = emailPattern.test (
            intentRequest.inputTranscript
          );
        }
      } else {
        var emailValidation = emailPattern.test (intentRequest.inputTranscript);
      }

      let message = 'And your email address please?';
      if (!emailValidation) {
        return lexResponses.elicitSlotWithoutCard (
          intentRequest.sessionAttributes,
          'DiscussIntent',
          {
            user_company: query_form.user_company,
            user_des: null,
            user_email: null,
            user_name: query_form.user_name,
            user_phone: query_form.user_phone,
            company_size: query_form.company_size,
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
              'DiscussIntent',
              {
                user_company: query_form.user_company,
                user_des: null,
                user_email: query_form.user_email,
                user_name: query_form.user_name,
                user_phone: query_form.user_phone,
                company_size: query_form.company_size,
                userr_type: query_form.userr_type,
                user_day: null,
                user_time: null,
                is_complete: null,
              },
              'user_day',
              'Best day to contact you'
            );
          } else {
            let genericAttachments = [
              {
                attachmentLinkUrl: null,
                buttons: config.daysArr,
                imageUrl: null,
                subTitle: '...',
                title: 'Please choose a day.',
              },
            ];
            return lexResponses.elicitSlot (
              intentRequest.sessionAttributes,
              'DiscussIntent',
              {
                user_company: query_form.user_company,
                user_des: null,
                user_email: query_form.user_email,
                user_name: query_form.user_name,
                user_phone: query_form.user_phone,
                company_size: query_form.company_size,
                userr_type: query_form.userr_type,
                user_day: null,
                user_time: null,
                is_complete: null,
              },
              'user_day',
              'Best day for a phone call, please?',
              genericAttachments
            );
          }
        } else {
          let genericAttachments = [
            {
              attachmentLinkUrl: null,
              buttons: config.daysArr,
              imageUrl: null,
              subTitle: '...',
              title: 'Please choose a day.',
            },
          ];
          return lexResponses.elicitSlot (
            intentRequest.sessionAttributes,
            'DiscussIntent',
            {
              user_company: query_form.user_company,
              user_des: null,
              user_email: query_form.user_email,
              user_name: query_form.user_name,
              user_phone: query_form.user_phone,
              company_size: query_form.company_size,
              userr_type: query_form.userr_type,
              user_day: null,
              user_time: null,
              is_complete: null,
            },
            'user_day',
            'Best day for a phone call, please?',
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
      // displaying day value in a particular fromat
      var u = config.aryDates.map (val => {
        var split = val.split (' ');

        if (split[0] == query_form.user_day) {
          query_form.user_day =
            split[0] +
            ', ' +
            dateSuffix (split[1]) +
            ' ' +
            split[2] +
            ', ' +
            split[3];
        }
      });
      // check for only having mon to fri in day slot
      if (
        intentRequest.inputTranscript == 'Monday' ||
        intentRequest.inputTranscript == 'Tuesday' ||
        intentRequest.inputTranscript == 'Wednesday' ||
        intentRequest.inputTranscript == 'Thursday' ||
        intentRequest.inputTranscript == 'Friday'
      ) {
        // console.log ('abu');
      }
      let message =
        'May I know a convenient time slot for a phone call on ' +
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
              text: '4:00 pm - 8:00 pm',
              value: '4:00 pm - 8:00 pm',
            },
          ],
          imageUrl: null,
          subTitle: '...',
          title: '(Indian Standard Time, +5.5 GMT)',
        },
      ];
      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'DiscussIntent',
        {
          user_company: query_form.user_company,
          user_des: null,
          user_email: query_form.user_email,
          user_name: query_form.user_name,
          user_phone: query_form.user_phone,
          company_size: query_form.company_size,
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
      config.current_step = 'discussIntent';
      config.user_details = query_form;
      let message =
        'Please give us a brief description about your project. (You may copy and paste it here.)';
      return lexResponses.elicitSlotWithoutCard (
        intentRequest.sessionAttributes,
        'DiscussIntent',
        {
          user_company: query_form.user_company,
          user_des: null,
          user_email: query_form.user_email,
          user_name: query_form.user_name,
          user_phone: query_form.user_phone,
          company_size: query_form.company_size,
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
      query_form.is_complete == null
    ) {
      config.is_send_discuss = true; // step variable for sending slack just once
      // console.log ('roru');
      // check for platform specfic smileys and html rendering
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      var message =
        'Thank you for sharing your Project/Idea. We will call you between ' +
        query_form.user_time +
        ' (IST, + 5.5 GMT) on ' +
        query_form.user_day +
        '.' +
        ' \n\n For more queries you may send a mail to business@prologictechnologies.in\n';

      if (platform == 'Web') {
        // console.log ('platform web');
        var message =
          '<div> Thank you for sharing your Project/Idea. We will call you between ' +
          config.user_details.user_time +
          ' (IST, + 5.5 GMT) on ' +
          config.user_details.user_day +
          '.' +
          ' <br/><br/>For more queries you may send a mail to <a href="mailto:business@prologictechnologies.in" target="_top">business@prologictechnologies.in</a><br/>  </div>';
      }
      var slack_msg =
        'Hi *' +
        query_form.user_name +
        '* has booked a Project Discussion session from ' +
        platform +
        '. His/Her details are given below : \n' +
        'E-mail Id :' +
        query_form.user_email +
        '\n Contact number : ' +
        query_form.user_phone +
        '\n Company Name : ' +
        query_form.user_company +
        '\n Company Size : ' +
        query_form.company_size +
        '\n Project Description:' +
        query_form.user_des +
        '\n Contact Day :' +
        query_form.user_day +
        '\n Contact Time : ' +
        query_form.user_time +
        +' (IST, + 5.5 GMT)' +
        '\n User Type : ' +
        query_form.userr_type;
      var status = common.sendInvite (
        '<span>Hi ' +
          query_form.user_name +
          ', <br> This is to inform you that, your appointment for  project/Idea discussion session has been confirmed. You will receive a phone call from us on ' +
          query_form.user_day +
          ' between ' +
          query_form.user_time +
          ' (IST, + 5.5 GMT). <br><br>If you have any query, please feel free to contact us at 0172-55316 or you can write us at <a href="mailto:example@email.com">info@prologictechnologie.in</a>  <br><br> Thanks & Regards<br>Prologic Technologies</span> ',
        query_form.user_email,
        'Project Discussion Appointment with Prologic Technologies'
      );
      sendSlackMsg (slack_msg, myResult => {
        // console.log ('Slack message sent : ' + myResult);
        var status = common.sendEmail (
          ' <pre> <span>Hi <b>' +
            query_form.user_name +
            '</b> has booked a Project Discussion session from ' +
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
            query_form.company_size +
            '<br> Project Description : ' +
            query_form.user_des +
            '<br> Contact Day : ' +
            query_form.user_day +
            '<br> Contact Time : ' +
            query_form.user_time +
            ' (IST, + 5.5 GMT)' +
            '</pre>',
          'Iris Project Discussion Request From' + platform
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
          user_company: query_form.user_company,
          user_des: query_form.user_des,
          user_email: query_form.user_email,
          user_name: query_form.user_name,
          user_phone: query_form.user_phone,
          company_size: query_form.company_size,
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
      query_form.is_complete.toUpperCase () == 'YES'
      // config.current_step == 'discussIntent'
    ) {
      // console.log ('jj block');
      if (
        intentRequest.inputTranscript == 'Yes' ||
        intentRequest.inputTranscript == 'No'
      ) {
        config.is_send_discuss = false;
        // console.log ('burb');
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
        return lexResponses.elicitSlot (
          intentRequest.sessionAttributes,
          'Greeting',
          {query: null},
          'query',
          'Okay, How can i help you?',
          genericAttachments
        );
      } else {
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
            user_company: query_form.user_company,
            user_des: query_form.user_des,
            user_email: query_form.user_email,
            user_name: query_form.user_name,
            user_phone: query_form.user_phone,
            company_size: query_form.company_size,
            userr_type: query_form.userr_type,
            user_day: query_form.user_day,
            user_time: query_form.user_time,
            is_complete: null,
          },
          'is_complete',
          '<div> Thank you for sharing your Project/Idea. We will call you between ' +
            query_form.user_time +
            ' (IST, + 5.5 GMT) on ' +
            query_form.user_day +
            '<br/><br/>For more queries you may send a mail to <a href="mailto:business@prologictechnologies.in" target="_top">business@prologictechnologies.in</a> <br/> </div>',
          genericAttachments
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_des != null &&
      query_form.is_complete.toUpperCase () == 'NO'
      // (config.current_step == 'discussIntent' && query_form.is_complete == null)
    ) {
      config.is_send_discuss = false;
      var msg = 'Thank You. Have a great day! :)';
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var msg = 'Thank You. Have a great day! :slightly_smiling_face:';
        }
      } else {
        var msg =
          '<div>Thank You. Have a great day! &#x1F60A <br/>To start a new conversation say, Hi</div>';
      }
      return lexResponses.close (
        intentRequest.sessionAttributes,
        'Fulfilled',
        msg
      );
    } else if (config.is_send_discuss == true) {
      // console.log ('hi');
      // console.log ('roru');
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
      }
      var message =
        'Thank you for sharing your Project/Idea. We will call you between ' +
        query_form.user_time +
        ' (IST, + 5.5 GMT) on ' +
        query_form.user_day +
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
          user_company: query_form.user_company,
          user_des: query_form.user_des,
          user_email: query_form.user_email,
          user_name: query_form.user_name,
          user_phone: query_form.user_phone,
          company_size: query_form.company_size,
          userr_type: query_form.userr_type,
          user_day: query_form.user_day,
          user_time: query_form.user_time,
          is_complete: null,
        },
        'is_complete',
        message,
        genericAttachments
      );
    } else {
      // console.log ('hi1');
    }
  }
};

var https = require ('https');
function sendSlackMsg (postm, callback) {
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
function GetDates (startDate, daysToAdd) {
  config.aryDates = [];

  for (var i = 1; i <= daysToAdd; i++) {
    var currentDate = new Date ();
    currentDate.setDate (startDate.getDate () + i);
    config.aryDates.push (
      DayAsString (currentDate.getDay ()) +
        ' ' +
        currentDate.getDate () +
        ' ' +
        MonthAsString (currentDate.getMonth ()) +
        ' ' +
        currentDate.getFullYear ()
    );
  }

  return config.aryDates;
}

function MonthAsString (monthIndex) {
  var d = new Date ();
  var month = new Array ();
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';

  return month[monthIndex];
}

function DayAsString (dayIndex) {
  var weekdays = new Array (7);
  weekdays[0] = 'Sunday';
  weekdays[1] = 'Monday';
  weekdays[2] = 'Tuesday';
  weekdays[3] = 'Wednesday';
  weekdays[4] = 'Thursday';
  weekdays[5] = 'Friday';
  weekdays[6] = 'Saturday';

  return weekdays[dayIndex];
}
function dateSuffix (i) {
  var j = i % 10, k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}
