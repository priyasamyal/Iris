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
  console.log(query_form, 'query_form', config.name_filled);
  var mail;
  // console.log (query_form.user_name, 'form value', query_form);
  // value of email in slack
  if (intentRequest.inputTranscript.indexOf('<mailto:') !== -1) {
    mail = intentRequest.inputTranscript.split('|');
    mail = mail[1].split('>');
    query_form.user_email = mail[0];
    // console.log (mail, 'split perform', query_form);
  }

  if (source === 'DialogCodeHook') {
    // console.log ('ll');
    // console.log (config.name_filled, 'config.name');
    // console.log (query_form.user_name, 'username');
    // console.log (intentRequest.inputTranscript, 'transcript');
    // if (query_form.user_name == null) {
    //   // console.log ('name1');
    //   query_form.user_name = intentRequest.inputTranscript;
    // }
    //  console.log(query_form, "query_form");
    if (
      query_form.user_name == null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_qualification == null &&
      query_form.user_experience == null &&
      query_form.user_vacancy == null &&
      config.name_filled == false
    ) {
      console.log(config.name_filled, 'namefiller7');

      // console.log ('email34');
      // console.log (config.name_filled, 'namefiller');
      config.name_filled = true;
      console.log(config.name_filled, 'namefiller7again');
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
      // for checking apply in name(as .1 % of the total population might have name whic contains apply)
    } else if (
      query_form.user_name == null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_qualification == null &&
      query_form.user_experience == null &&
      query_form.user_vacancy == null &&
      query_form.is_complete == null
    ) {
      config.name_filled = true;
      console.log('come');
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
      // for checking apply in name(as .1 % of the total population might have name whic contains apply)
    } else if (
      query_form.user_name != null &&
      query_form.user_email == null &&
      query_form.user_phone == null &&
      query_form.user_qualification == null &&
      query_form.user_experience == null &&
      query_form.user_vacancy == null &&
      config.name_filled == true
    ) {
      console.log(config.name_filled, 'namefiller');
      // console.log ('email1');
      // validation for name
      var namePattern = /^[A-Za-z ]+$/;
      var nameVAlidation = namePattern.test(intentRequest.inputTranscript);

      console.log('ram', nameVAlidation);
      if (!nameVAlidation) {
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
          'Okay ' + query_form.user_name + ', Can I have your email address?'
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone == null &&
      query_form.user_qualification == null &&
      query_form.user_experience == null &&
      query_form.user_vacancy == null
    ) {
      // validation for email
      // console.log ('email1');
      var emailPattern = /^[a-zA-Z][a-zA-Z0-9_+]*(\.[a-zA-Z][a-zA-Z0-9_+]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
      // console.log (mail, 'mailmail');
      var emailValidation = emailPattern.test(query_form.user_email);
      // if (intentRequest.requestAttributes != null) {
      //   if (mail) {
      //     if (
      //       intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
      //     ) {
      //       console.log (query_form.user_email);
      //       var emailValidation = emailPattern.test (query_form.user_email);
      //     }
      //   } else if (
      //     intentRequest.requestAttributes['x-amz-lex:channel-type'] ==
      //     'Facebook'
      //   ) {
      //     var emailValidation = emailPattern.test (query_form.user_email);
      //   }
      // } else {
      //   var emailValidation = emailPattern.test (query_form.user_email);
      // }

      if (!emailValidation) {
        // console.log ('vap');
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
          'Okay ' + query_form.user_name + ', Can I have your email address?'
        );
      } else {
        // console.log ('phone field');
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
          "Can I have your phone number, in case we get disconnected?"
        );
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_qualification == null &&
      query_form.user_experience == null &&
      // query_form.user_vacancy == null &&
      intentRequest.inputTranscript != 'UI/UX Designer'
    ) {
      // console.log ('email3');
      // validation for phone number
      var phone_reg = /^\d{7,13}$/;
      var phone_val = phone_reg.test(intentRequest.inputTranscript);
      if (!phone_val) {
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
          "Can I have your phone number, in case we get disconnected?"
        );
      } else {
        //check for facebook slot value
        if (intentRequest.requestAttributes != null) {
          if (
            intentRequest.requestAttributes['x-amz-lex:channel-type'] ==
            'Facebook'
          ) {
            // console.log (intentRequest.inputTranscript, 'blahblah');

            // console.log (query_form.user_qualification);
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
              '*Please choose your highest educational qualification.* \n Type 1 for B.Tech \n Type 2 for MCA \n Type 3 for BCA \n Type 4 for MBA \n Type 5 for Others'
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
                title: '(Please choose one)',
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
              'Please choose your highest educational qualification',
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
              title: '(Please choose one) ',
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
            'Please choose your highest educational qualification.',
            genericAttachments
          );
        }
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_qualification != null &&
      query_form.user_experience == null &&
      query_form.user_vacancy == null
    ) {
      //giving values to the corresponding number
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
              value: 'Upto 1 year',
            },
            {
              text: '2 years or more',
              value: '2 years or more',
            },
            // {
            //   text: 'Upto 3+ years',
            //   value: '3+',
            // },
          ],
          imageUrl: null,
          subTitle: '...',
          title: '(Please choose one)',
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
        'What is your total work experience? ',
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
      console.log("enter");
      if (intentRequest.inputTranscript == 'Others') {
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
                value: 'Upto 1 year',
              },
              {
                text: '2 years or more',
                value: '2 years or more',
              },
              // {
              //   text: 'Upto 3+ years',
              //   value: '3+',
              // },
            ],
            imageUrl: null,
            subTitle: '...',
            title: '(Please choose one)',
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
          'What is your total work experience? ',
          genericAttachments
        );
      }
      else if (intentRequest.inputTranscript == 'UI/UX Designer') {
        console.log("match");

        console.log('ff');
        config.is_send_apply = true;
        query_form.user_vacancy = 'UI/UX Designer';

        if (intentRequest.requestAttributes != null) {
          var platform =
            intentRequest.requestAttributes['x-amz-lex:channel-type'];
        } else {
          var platform = 'Web';
        }
        console.log(query_form, 'query_form');
        sendSlackMsg(query_form, platform, myResult => {
          console.log('Slack message sent : ' + myResult);
        });
        config.is_send_apply = true;
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
          'Thank You so much :)  I have processed your application. You will hear from us within 48 hours. \nTo know more about our work culture visit https://www.prologic-technologies.com/prologic-work-culture/';

        if (intentRequest.requestAttributes != null) {
          if (
            intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
          ) {
            var msg =
              'Thank You so much :slightly_smiling_face: I have processed your application. You will hear from us within 48 hours. \n\nTo know more about our work culture visit https://www.prologic-technologies.com/prologic-work-culture/';
          }
        } else {
          var msg =
            '<div> Thank You so much &#x1F60A  I have processed your application. You will hear from us within 48 hours.<br/> <br/> To know more about our work culture visit <a HR Manageref="https://www.prologic-technologies.com/prologic-work-culture/" target="_blank"> https://www.prologic-technologies.com/prologic-work-culture/ </a> <br/></div>  ';
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

      }
      else {
        // check for platforms
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
              '*Which vacancy you wish to apply for?* \n Type 1 for Web Developer \n Type 2 for Hybrid App Developer \n Type 3 for UI/UX Designer \n Type 4 for QA Tester \n Type 5 for HR Manager'
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
                    text: 'Hybrid App Developer',
                    value: 'Hybrid App Developer',
                  },
                  {
                    text: 'UI/UX Designer',
                    value: 'UI/UX Designer',
                  },
                  {
                    text: 'QA Tester',
                    value: 'QA Engineer',
                  },
                  {
                    text: 'HR Manager',
                    value: 'HR Manager',
                  },
                ],
                imageUrl: null,
                subTitle: '...',
                title: '(Please choose one)',
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
                  text: 'Hybrid App Developer',
                  value: 'Hybrid App Developer',
                },
                {
                  text: 'UI/UX Designer',
                  value: 'UI/UX Designer',
                },
                {
                  text: 'QA Tester',
                  value: 'QA Engineer',
                },
                {
                  text: 'HR Manager',
                  value: 'HR Manager',
                },
              ],
              imageUrl: null,
              subTitle: '...',
              title: '(Please choose one)',
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
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_qualification != null &&
      query_form.user_experience != null &&
      (query_form.user_vacancy != null ||
        intentRequest.inputTranscript == 'UI/UX Designer') &&
      query_form.is_complete == null
    ) {
      console.log("come");
      //check for not repeating values
      if (
        intentRequest.inputTranscript == 'Fresher' ||
        intentRequest.inputTranscript == 'Upto 1 year' ||
        intentRequest.inputTranscript == '2 years or more' ||
        intentRequest.inputTranscript == 'B.Tech' ||
        intentRequest.inputTranscript == 'Others' ||
        intentRequest.inputTranscript == 'MBA' ||
        intentRequest.inputTranscript == 'MCA' ||
        intentRequest.inputTranscript == 'BCA'
        //check for repeating values when wrong
      ) {

        console.log('vacancy');
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
              '*Which vacancy you wish to apply for?* \n Type 1 for Web Developer \n Type 2 for Hybrid App Developer \n Type 3 for UI/UX Designer \n Type 4 for QA Tester \n Type 5 for HR Manager'
            );
          }
        } else {

          // console.log ('vacancy2');
          let genericAttachments = [
            {
              attachmentLinkUrl: null,
              buttons: [
                {
                  text: 'Web Developer',
                  value: 'Web Developer',
                },
                {
                  text: 'Hybrid App Developer',
                  value: 'Hybrid App Developer',
                },
                {
                  text: 'UI/UX Designer',
                  value: 'UI/UX Designer',
                },
                {
                  text: 'QA Tester',
                  value: 'QA Engineer',
                },
                {
                  text: 'HR Manager',
                  value: 'HR Manager',
                },
              ],
              imageUrl: null,
              subTitle: '...',
              title: '(Please choose one)',
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
        console.log('ff');
        config.is_send_apply = true;

        if (intentRequest.inputTranscript == 1) {
          query_form.user_vacancy = 'Web Developer';
        } else if (intentRequest.inputTranscript == 2) {
          query_form.user_vacancy = 'Hybrid App Developer';
        } else if (intentRequest.inputTranscript == 3) {
          query_form.user_vacancy = 'UI/UX Designer';
        } else if (intentRequest.inputTranscript == 4) {
          query_form.user_vacancy = 'QA Tester';
        } else if (intentRequest.inputTranscript == 5) {
          query_form.user_vacancy = 'HR Manager';
        } else if (intentRequest.inputTranscript == 'UI/UX Designer') {
          query_form.user_vacancy = 'UI/UX Designer';
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
        console.log(query_form, 'query_form');
        config.is_send_apply = true;
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
          'Thank You so much :)  I have processed your application. You will hear from us within 48 hours. \nTo know more about our work culture visit https://www.prologic-technologies.com/prologic-work-culture/';

        if (intentRequest.requestAttributes != null) {
          if (
            intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
          ) {
            var msg =
              'Thank You so much :slightly_smiling_face: I have processed your application. You will hear from us within 48 hours. \n\nTo know more about our work culture visit https://www.prologic-technologies.com/prologic-work-culture/';
          }
        } else {
          var msg =
            '<div> Thank You so much &#x1F60A  I have processed your application. You will hear from us within 48 hours.<br/> <br/> To know more about our work culture visit <a HR Manageref="https://www.prologic-technologies.com/prologic-work-culture/" target="_blank"> https://www.prologic-technologies.com/prologic-work-culture/ </a> <br/></div>  ';
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
      }
    } else if (
      query_form.user_name != null &&
      query_form.user_email != null &&
      query_form.user_phone != null &&
      query_form.user_qualification != null &&
      query_form.user_experience != null &&
      query_form.user_vacancy != null &&
      query_form.is_complete.toUpperCase() == 'YES'
    ) {
      // console.log (query_form.is_complete, 'iscomplete');
      config.is_send_apply = false;
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
          title: '(Please choose one)',
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
      query_form.is_complete.toUpperCase() == 'NO' // converting input value to uppercase
    ) {
      config.is_send_apply = false;
      var msg = 'Have a great day! :)';
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var msg = 'Have a great day! :slightly_smiling_face: \n\nTo start a new conversation say, Hi';
        }
      } else {
        var msg =
          '<div>Have a great day! &#x1F60A <br/>To start a new conversation say, Hi</div>';
      }
      return lexResponses.close(
        intentRequest.sessionAttributes,
        'Fulfilled',
        msg
      );
      // check for not sending slack message again nad again
    } else if (config.is_send_apply == true) {
      // console.log ('gg');
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        var platform = 'Web';
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
      var msg =
        'Thank You so much :) . I have processed your application. You will hear from us within 48 hours. \n\nTo know more about our work culture visit https://www.prologic-technologies.com/prologic-work-culture/';
      // check for various platform for smiley
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var msg =
            'Thank You so much :slightly_smiling_face: . I have processed your application. You will hear from us within 48 hours. \n\nTo know more about our work culture visit https://www.prologic-technologies.com/prologic-work-culture/';
        }
      } else {
        var msg =
          '<div> Thank You so much &#x1F60A . I have processed your application. You will hear from us within 48 hours. <br/><br/> To know more about our work culture visit <a HR Manageref="https://www.prologic-technologies.com/prologic-work-culture/" target="_blank"> https://www.prologic-technologies.com/prologic-work-culture/ </a> <br/> </div>';
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
    }
  }

  if (source === 'FulfillmentCodeHook') {
  }
};
// slack message
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
    path: '/services/T5676QE8N/BD5VAL5JP/bRgApPuynJxt6yPZoN9p6A9b',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(JSON.stringify(post_data)),
    },
  };
  var status = common.sendInvite(
    '<span>Hi ' + query_form.user_name + ', <br> This is to inform you that, we have received your application for the post of ' + query_form.user_vacancy + ' .  You will hear from us within 48 hour. <br><br>To know more about our work culture visit <a  href="https://www.prologic-technologies.com/prologic-work-culture/" target="_blank"> https://www.prologic-technologies.com/prologic-work-culture/ </a><br><br>If you have any query, please feel free to contact us at 0172-55316 or you can write us at <a href="mailto:example@email.com">info@prologictechnologie.in</a>  <br><br> Thanks & Regards<br>Prologic Technologies</span> ', query_form.user_email, 'Job Application Received'
  );

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
  // console.log (status, 'status');

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
