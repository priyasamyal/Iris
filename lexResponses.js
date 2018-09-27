'use strict';

module.exports.delegate = function (sessionAttributes, slots) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Delegate',
      slots
    }
  };
};

module.exports.elicitSlot = function (sessionAttributes, intentName, slots, slotToElicit, message, generic) {
  console.log('slotToElicit', slotToElicit)
  return {
    'sessionAttributes': sessionAttributes,
    'dialogAction': {
      'type': 'ElicitSlot',
      'intentName': intentName,
      'slots': slots,
      'slotToElicit': slotToElicit,
      'message': {
        'contentType': 'PlainText',
        'content': message
      },
      "responseCard": {
        "contentType": "application/vnd.amazonaws.card.generic",
        "genericAttachments": generic,
        "version": "1"
      },
    }
  };
};
module.exports.elicitSlotWithoutCard = function (sessionAttributes, intentName, slots, slotToElicit, message) {
  console.log('slotToElicit', slotToElicit)
  return {
    'sessionAttributes': sessionAttributes,
    'dialogAction': {
      'type': 'ElicitSlot',
      'intentName': intentName,
      'slots': slots,
      'slotToElicit': slotToElicit,
      'message': {
        'contentType': 'PlainText',
        'content': message
      },

    }
  };
};

module.exports.close = function (sessionAttributes, fulfillmentState, message) {
  return {
    'sessionAttributes': sessionAttributes,
    'dialogAction': {
      'type': 'Close',
      'fulfillmentState': fulfillmentState,
      'message': {
        'contentType': 'PlainText',
        'content': message
      },
    }
  };
};

module.exports.confirmIntent = function (sessionAttributes, intentName, slots, message) {
  return {
    'sessionAttributes': sessionAttributes,
    'dialogAction': {
      'type': 'ConfirmIntent',
      'intentName': intentName,
      'slots': slots,
      'message': {
        'contentType': 'PlainText',
        'content': message
      }
    }
  }
};

function getResponseCard(title, imageUrl, buttons) {
  return {
    contentType: 'application/vnd.amazonaws.card.generic',
    genericAttachments: [
      {
        title,
        imageUrl,
        buttons
      }
    ]
  };
}