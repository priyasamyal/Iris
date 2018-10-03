'use strict';

const lexResponses = require('../lexResponses');
const config = require('../lib/send_email.js');

module.exports = function (intentRequest) {
  console.log(
    'intentRequest General Query Handle called' +
    '' +
    JSON.stringify(intentRequest)
  );

  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {
    if (intentRequest.currentIntent.slots.query_gen == null) {
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
        { query_gen: 'Service Query', is_complete: null },
        'query_gen',
        'Okay, Can you please be specific?',
        genericAttachments
      );
    } else if (
      intentRequest.currentIntent.slots.query_gen == 'Service Query' &&
      intentRequest.currentIntent.slots.is_complete == null
    ) {
      // if (intentRequest.inputTranscript != 'Service Query') {
      //   console.log ('vmart');
      // } else {
      if (intentRequest.requestAttributes != null) {
        var message =
          'We are a Specialized Digital Agency with expertise in:  1. *IT Consulting* \n\tTelemedicine Solutions\n\tWeb Engineering\n\tMobilty Solutions\n\tUI/ UX Services\n2. *Web And Mobile Engineering* \n\tBespoke Web Development\n\tHybrid And Native Mobile Apps\n\tWebRTC Solutions Using Tokbox\n\tSocial Commerce\n\tPayment Gateway Integration\n3. *Mobile Website Designs* \n\tResponsive UI Designs\n\tEnhanced User Experience\n4. *Healthcare Solutions* \n\tBespoke Telemedicine Platforms\n\tCustom TeleNutrition Solutions\n\tFitness And Wellness Applications \nFor more details, you can visit https://www.prologic-technologies.com/';
      } else {
        var message =
          '<div>We are a Specialized Digital Agency with expertise in:  <br/>1. <b>IT Consulting </b> <br/> &nbsp;Telemedicine Solutions <br/>&nbsp;Web Engineering<br/>&nbsp;Mobilty Solutions<br/> &nbsp;UI/ UX Services.<br/> 2.<b>Web And Mobile Engineering</b><br/> &nbsp;Bespoke Web Development <br/> &nbsp;Hybrid And Native Mobile Apps<br/> &nbsp;WebRTC Solutions Using Tokbox<br/> &nbsp;Social Commerce<br/> &nbsp;Payment Gateway Integration<br/>3. <b>Mobile Website Designs</b><br/> &nbsp;Responsive UI Designs<br/> &nbsp;Enhanced User Experience<br/>4. <b>Healthcare Solutions</b> <br/> &nbsp;Bespoke Telemedicine Platforms<br/>&nbsp;Custom TeleNutrition Solutions<br/> &nbsp;Fitness And Wellness Applications<br/>For more details, you can visit <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a> <br/></div>';
      }
      // }

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
        'UserQuery',
        { query_gen: 'Service Query', is_complete: null },
        'is_complete',
        message,
        genericAttachments
      );
    } else if (
      intentRequest.currentIntent.slots.query_gen == 'Service Query' &&
      intentRequest.currentIntent.slots.is_complete == 'Yes'
    ) {
      let genericAttachments = [
        {
          attachmentLinkUrl: null,
          buttons: [
            {
              text: 'General Enquiry',
              value: 'General Enquiry',
            },
            {
              text: 'Business Enquiry',
              value: 'Business Enquiry',
            },
          ],
          imageUrl: null,
          subTitle: '...',
          title: 'Please choose one',
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
      intentRequest.currentIntent.slots.query_gen == 'Service Query' &&
      intentRequest.currentIntent.slots.is_complete == 'No'
    ) {
      var msg = 'Thank You. Have a great day! :)';
      if (intentRequest.requestAttributes != null) {
        if (
          intentRequest.requestAttributes['x-amz-lex:channel-type'] == 'Slack'
        ) {
          var msg = 'Thank You. Have a great day! :slightly_smiling_face:';
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
    } else if (intentRequest.currentIntent.slots.query_gen == 'Career Query') {
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
              value: 'Learn More ',
            },
          ],
          imageUrl: null,
          subTitle: '...',
          title: 'You may apply now or choose a option to know more.',
        },
      ];
      return lexResponses.elicitSlot(
        intentRequest.sessionAttributes,
        'CareerQuery',
        { career: null },
        'career',
        'Great! Do you wish to join our vibrant team?',
        genericAttachments
      );
    }
  }
};
