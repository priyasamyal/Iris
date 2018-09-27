'use strict';

const lexResponses = require('../lexResponses');
module.exports = function (intentRequest) {
    console.log(
        'intentRequest infoIntentHandle  called ..' +
        '' +
        JSON.stringify(intentRequest)
    );
    const source = intentRequest.invocationSource;
    if (source === 'DialogCodeHook') {
        let message = 'Hello, My name is Iris and I work for Prologic Technologies. I can help you solving your queries related to Prologic Technologies.  \n Type Consultation if you want to book a free consultation meeting with Prologic Technologies \n  Type Apply to directly apply to Prologic Technologies \n Type Query if you want to as any query related to  Prologic Technologies \n Type Services to know about our services. \n ';
        return lexResponses.close(
            intentRequest.sessionAttributes,
            'Fulfilled',
            message
        );
    }

}