'use strict';

const lexResponses = require ('../lexResponses');
const config = require ('../lib/send_email.js');

module.exports = function (intentRequest) {
  console.log (
    'intentRequest businessHandle  called ..' +
      '' +
      JSON.stringify (intentRequest)
  );
  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {
    if (intentRequest.currentIntent.slots.bus_query == null) {
      let genericAttachments = [
        {
          attachmentLinkUrl: null,
          buttons: [
            {
              text: 'Discuss project/Idea',
              value: 'specialization',
            },
            {
              text: 'Book a consultation ',
              value: 'consultation',
            },
          ],
          imageUrl: null,
          subTitle: '...',
          title: 'Would you like to',
        },
      ];
      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'BusinessQuery',
        {bus_query: null},
        'bus_query',
        "I'm sure i can help you with this",
        genericAttachments
      );
    }

    if (intentRequest.currentIntent.slots.bus_query == 'specialization') {
      let message =
        'To process your request I would need some information.\nDo not worry, Your idea is 100% protected by our non-disclosure agreement.\n\nMay I know your name please?';
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
    }

    if (intentRequest.currentIntent.slots.bus_query == 'consultation') {
      let message =
        'Wow! I am excited. Our experts are here to help. \nMay i know your first name';
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
          // user_day_fb: null,
          user_time: null,
          is_complete: null,
        },
        'user_name',
        message
      );
    }
  }
};
