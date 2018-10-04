'use strict';

const lexResponses = require ('../lexResponses');
const config = require ('../lib/send_email.js');

module.exports = function (intentRequest) {
  console.log (
    'intentRequest General Query Handle called' +
      '' +
      JSON.stringify (intentRequest)
  );

  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {
    console.log (config.is_send_ourservices, 'ourour');

    if (intentRequest.currentIntent.slots.query_gen == null) {
      config.is_send_ourservices = false;
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
      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'UserQuery',
        {query_gen: 'Service Query', is_complete: null},
        'query_gen',
        'Okay, Can you please be specific?',
        genericAttachments
      );
    } else if (
      intentRequest.currentIntent.slots.query_gen == 'Service Query' &&
      intentRequest.currentIntent.slots.is_complete == null
    ) {
      config.is_send_ourservices = true;
      // if (intentRequest.inputTranscript != 'Service Query') {
      //   console.log ('vmart');
      // } else {
      if (intentRequest.requestAttributes != null) {
        var message =
          'We are a Specialized Digital Agency with expertise in:  1. *IT Consulting* \n\tTelemedicine Solutions\n\tWeb Engineering\n\tMobilty Solutions\n\tUI/ UX Services\n2. *Web And Mobile Engineering* \n\tBespoke Web Development\n\tHybrid And Native Mobile Apps\n\tWebRTC Solutions Using Tokbox\n\tSocial Commerce\n\tPayment Gateway Integration\n3. *Mobile Website Designs* \n\tResponsive UI Designs\n\tEnhanced User Experience\n4. *Healthcare Solutions* \n\tBespoke Telemedicine Platforms\n\tCustom TeleNutrition Solutions\n\tFitness And Wellness Applications \nFor more details, you can visit https://www.prologic-technologies.com/';
      } else {
        var message =
          '<div><div class="services_list"> <h2> We are a Specialized Digital Agency with expertise in: </h2 >  <h2>1. IT Consulting </h2><ul><li>Telemedicine Solutions </li> <li>Web Engineering</li> <li>Mobilty Solutions</li><li>UI/ UX Services.</li> </ul></div ><div class="services_list"> <h2>2. Web And Mobile Engineering</h2><ul> <li>Bespoke Web Development</li><li>Hybrid And Native Mobile Apps</li> <li>WebRTC Solutions Using Tokbox</li> <li>Social Commerce</li> <li>Payment Gateway Integration</li> </ul></div> <div class="services_list"><h2>3. Mobile Website Designs</h2> <ul> <li>Responsive UI Designs</li><li>Enhanced User Experience</li></ul></div><div class="services_list"><h2>4. Healthcare Solutions</h2><ul><li>Bespoke Telemedicine Platforms</li> <li>Custom TeleNutrition Solutions</li> <li>Fitness And Wellness Applications</li> </ul> </div><div class="services_list"><p>For more details, you can visit</p><div class="link"><a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a></div> </div> </div>';
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

      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'UserQuery',
        {query_gen: 'Service Query', is_complete: null},
        'is_complete',
        message,
        genericAttachments
      );
    } else if (
      intentRequest.currentIntent.slots.query_gen == 'Service Query' &&
      intentRequest.currentIntent.slots.is_complete == 'Yes'
    ) {
      config.is_send_ourservices = false;
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
      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'Greeting',
        {query: null},
        'query',
        'Okay, How can i help you?',
        genericAttachments
      );
    } else if (
      intentRequest.currentIntent.slots.query_gen == 'Service Query' &&
      intentRequest.currentIntent.slots.is_complete == 'No'
    ) {
      config.is_send_ourservices = false;
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
      return lexResponses.close (
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
      return lexResponses.elicitSlot (
        intentRequest.sessionAttributes,
        'CareerQuery',
        {career: null},
        'career',
        'Great! Do you wish to join our vibrant team?',
        genericAttachments
      );
    } else if (config.is_send_ourservices == true) {
      console.log ('aaaaa');
      console.log ('blue');
      if (intentRequest.requestAttributes != null) {
        var platform =
          intentRequest.requestAttributes['x-amz-lex:channel-type'];
      } else {
        console.log ('webweb');
        var platform = 'Web';
      }
      var message =
        'We are a Specialized Digital Agency with expertise in: \n1. IT Consulting \n\tTelemedicine Solutions\n\tWeb Engineering\n\tMobilty Solutions\n\tUI/ UX Services\n2. Web And Mobile Engineering \n\tBespoke Web Development\n\tHybrid And Native Mobile Apps\n\tWebRTC Solutions Using Tokbox\n\tSocial Commerce\n\tPayment Gateway Integration\n3. Mobile Website Designs \n\tResponsive UI Designs\n\tEnhanced User Experience\n4. Healthcare Solutions \n\tBespoke Telemedicine Platforms\n\tCustom TeleNutrition Solutions\n\tFitness And Wellness Applications \nFor more details, you can visit https://www.prologic-technologies.com/';
      if (platform == 'Web') {
        console.log ('webwebweb');

        var message =
          '<div><div class="services_list"> <h2> We are a Specialized Digital Agency with expertise in: </h2 >  <h2>1. IT Consulting </h2><ul><li>Telemedicine Solutions </li> <li>Web Engineering</li> <li>Mobilty Solutions</li><li>UI/ UX Services.</li> </ul></div ><div class="services_list"> <h2>2. Web And Mobile Engineering</h2><ul> <li>Bespoke Web Development</li><li>Hybrid And Native Mobile Apps</li> <li>WebRTC Solutions Using Tokbox</li> <li>Social Commerce</li> <li>Payment Gateway Integration</li> </ul></div> <div class="services_list"><h2>3. Mobile Website Designs</h2> <ul> <li>Responsive UI Designs</li><li>Enhanced User Experience</li></ul></div><div class="services_list"><h2>4. Healthcare Solutions</h2><ul><li>Bespoke Telemedicine Platforms</li> <li>Custom TeleNutrition Solutions</li> <li>Fitness And Wellness Applications</li> </ul> </div><div class="services_list"><p>For more details, you can visit</p><div class="link"><a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a></div> </div> </div>';
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
        'UserQuery',
        {query_gen: 'Service Query', is_complete: null},
        'is_complete',
        message,
        genericAttachments
      );
    }
  }
};
