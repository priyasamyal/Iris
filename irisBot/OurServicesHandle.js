'use strict';

const lexResponses = require('../lexResponses');
const config = require('../lib/send_email.js');
module.exports = function (intentRequest) {
  // console.log (
  //   'intentRequest bbb  called ..' + '' + JSON.stringify (intentRequest)
  // );
  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {
    // check for html rendering for different  platforms
    // console.log ('green');
    if (intentRequest.requestAttributes != null) {
      var platform = intentRequest.requestAttributes['x-amz-lex:channel-type'];
    } else {
      // console.log ('webweb');
      var platform = 'Web';
    }
    var message =
      'We are a Specialized Digital Agency with expertise in: \n1. IT Consulting \n\tTelemedicine Solutions\n\tWeb Engineering\n\tMobilty Solutions\n\tUI/ UX Services\n2. Web And Mobile Engineering \n\tCustom Web Development\n\tHybrid And Native Mobile Apps\n\tWebRTC Solutions Using Tokbox\n\tSocial Commerce\n\tPayment Gateway Integration\n3. UI UX Designs \n\tResponsive UI Designs\n\tSimplified User Experience\n4. Telemedicine Solutions \n\tCustom Telemedicine Platforms\n\tCustom TeleNutrition Solutions\n\tFitness And Wellness Applications \n\nFor more details, you can visit https://www.prologic-technologies.com/ \n\n Still have some doubts? Ask from our experts.';
    if (platform == 'Web') {
      // console.log ('webwebweb');

      var message =
        '<div><div class="services_list"> <h2> We are a Specialized Digital Agency with expertise in: </h2 >  <h2>1. IT Consulting </h2><ul><li>Telemedicine Solutions </li> <li>Web Engineering</li> <li>Mobilty Solutions</li><li>UI/ UX Services.</li> </ul></div ><div class="services_list"> <h2>2. Web And Mobile Engineering</h2><ul> <li>Custom Web Development</li><li>Hybrid And Native Mobile Apps</li> <li>WebRTC Solutions Using Tokbox</li> <li>Social Commerce</li> <li>Payment Gateway Integration</li> </ul></div> <div class="services_list"><h2>3. UI UX Designs </h2> <ul> <li>Responsive UI Designs</li><li>Simplified User Experience</li></ul></div><div class="services_list"><h2>4. Telemedicine Solutions</h2><ul><li>Custom Telemedicine Platforms</li> <li>Custom TeleNutrition Solutions</li> <li>Fitness And Wellness Applications</li> </ul><br/> </div><div class="services_list"><p><br/>For more details, you can visit</p><div class="link"><a href="https://www.prologic-technologies.com/" target="_blank"> https://www.prologic-technologies.com/ </a> <br/></div> </div> <p>Still have some doubts? Ask from our experts.<br><br></p></div>';

      // console.log (message);
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
        title: 'Want to ask any query?',
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
  }
};
