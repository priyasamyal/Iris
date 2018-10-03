'use strict';

const lexResponses = require ('../lexResponses');
const config = require ('../lib/send_email.js');
module.exports = function (intentRequest) {
  console.log (
    'intentRequest bbb  called ..' + '' + JSON.stringify (intentRequest)
  );
  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {
    if (intentRequest.requestAttributes != null) {
      var platform = intentRequest.requestAttributes['x-amz-lex:channel-type'];
    } else {
      console.log ('webweb');
      var platform = 'Web';
    }
    var message =
      'We are a Specialized Digital Agency with expertise in: \n1. IT Consulting \n\tTelemedicine Solutions\n\tWeb Engineering\n\tMobilty Solutions\n\tUI/ UX Services\n2. Web And Mobile Engineering \n\tBespoke Web Development\n\tHybrid And Native Mobile Apps\n\tWebRTC Solutions Using Tokbox\n\tSocial Commerce\n\tPayment Gateway Integration\n3. Mobile Website Designs \n\tResponsive UI Designs\n\tEnhanced User Experience\n4. Healthcare Solutions \n\tBespoke Telemedicine Platforms\n\tCustom TeleNutrition Solutions\n\tFitness And Wellness Applications \nFor more details, you can visit https://www.prologic-technologies.com/';
    if (platform == 'Web') {
      console.log ('webwebweb');

      // var message =
      //   '<div>We are a Specialized Digital Agency with expertise in:  <br/>1. <b>IT Consulting </b> <br/> &nbsp;  Telemedicine Solutions <br/>&nbsp;Web Engineering<br/>&nbsp;Mobilty Solutions<br/> &nbsp;UI/ UX Services.<br/> 2.<b>Web And Mobile Engineering</b><br/> &nbsp;Bespoke Web Development <br/> &nbsp;Hybrid And Native Mobile Apps<br/> &nbsp;WebRTC Solutions Using Tokbox<br/> &nbsp;Social Commerce<br/> &nbsp;Payment Gateway Integration<br/>3. <b>Mobile Website Designs</b><br/> &nbsp;Responsive UI Designs<br/> &nbsp;Enhanced User Experience<br/>4. <b>Healthcare Solutions</b> <br/> &nbsp;Bespoke Telemedicine Platforms<br/>&nbsp;Custom TeleNutrition Solutions<br/> &nbsp;Fitness And Wellness Applications<br/>For more details, you can visit <a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a> <br/></div>';

      var message =
        '<div><div class="services_list"> <h2> We are a Specialized Digital Agency with expertise in: </h2 >  <h2>1. IT Consulting </h2><ul><li>Telemedicine Solutions </li> <li>Web Engineering</li> <li>Mobilty Solutions</li><li>UI/ UX Services.</li> </ul></div ><div class="services_list"> <h2>2. Web And Mobile Engineering</h2><ul> <li>Bespoke Web Development</li><li>Hybrid And Native Mobile Apps</li> <li>WebRTC Solutions Using Tokbox</li> <li>Social Commerce</li> <li>Payment Gateway Integration</li> </ul></div> <div class="services_list"><h2>3. Mobile Website Designs</h2> <ul> <li>Responsive UI Designs</li><li>Enhanced User Experience</li></ul></div><div class="services_list"><h2>4. Healthcare Solutions</h2><ul><li>Bespoke Telemedicine Platforms</li> <li>Custom TeleNutrition Solutions</li> <li>Fitness And Wellness Applications</li> </ul> </div><div class="services_list"><p>For more details, you can visit</p><div class="link"><a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a></div> </div> </div>';

      console.log (message);
    }
    config.is_send_ourservices = true;
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
    // return lexResponses.elicitSlot(
    //   intentRequest.sessionAttributes,
    //   'Fulfilled',
    //   message
    // );
    if (config.is_send_ourservices == true) {
      console.log ('blue');
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
