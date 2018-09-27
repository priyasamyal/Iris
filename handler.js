'use strict';
const dispatch = require ('./dispatch');
const config = require ('./lib/send_email.js');

module.exports.intents = (event, context, callback) => {
  // config.user_id = event.userId;
  // var express = require ('express');
  // var app = express ();
  // console.log (`event.bot.name=${event.bot.name}`, JSON.stringify (event));
  // app.post (
  //   'https://channels.lex.us-east-1.amazonaws.com/facebook/webhook/1f138b3c-4933-46ab-902b-fa6bb79081dd',
  //   function (req, res) {
  //     var data = req.body;
  //     console.log ('mustang4');
  //     // Make sure this is a page subscription
  //     if (data.object === 'page') {
  //       console.log ('mustang3');
  //       // Iterate over each entry - there may be multiple if batched
  //       data.entry.forEach (function (entry) {
  //         var pageID = entry.id;
  //         var timeOfEvent = entry.time;

  //         // Iterate over each messaging event
  //         entry.messaging.forEach (function (event) {
  //           if (event.message) {
  //             console.log ('mustang1');
  //             //receivedMessage(event);
  //           } else {
  //             console.log ('mustang');
  //             console.log (res);
  //             // If the event is a postback and has a payload equals USER_DEFINED_PAYLOAD
  //             // if (
  //             //   event.postback &&
  //             //   event.postback.payload === USER_DEFINED_PAYLOAD
  //             // ) {
  //             //   //present user with some greeting or call to action
  //             //   console.log ('mustang');
  //             //   //sendMessage(event.sender.id,msg);
  //             // }
  //           }
  //         });
  //       });

  //       res.sendStatus (200);
  //     }
  //   }
  // );
  // event.sessionAttributes = event.userId;

  // if (config.user_id == event.sessionAttributes) {

  try {
    dispatch (event, function (response) {
      console.log ('dispatch response in callback', JSON.stringify (response));
      callback (null, response);
    });
  } catch (err) {
    callback (err);
  }
  // } else {
  console.log ('bbbbbbb');
  // try {
  //   console.log (`event.bot.name=${event.bot.name}`, JSON.stringify (event));

  //   dispatch (event, function (response) {
  //     console.log ('dispatch response in callback', JSON.stringify (response));
  //     callback (null, response);
  //   });
  // } catch (err) {
  //   callback (err);
  // }
};
// };
