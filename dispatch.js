'use strict';

const greetingHandle = require ('./irisBot/greetingHandle');
const generalQueryHandle = require ('./irisBot/generalQueryHandle');
const careerQueryHandle = require ('./irisBot/careerQueryHandle');
const askQueryHandle = require ('./irisBot/askQueryHandle');
const applyNowHandle = require ('./irisBot/applyNowHandle');
const businessQueryHandle = require ('./irisBot/businessQueryHandle');
const consultIntentHandle = require ('./irisBot/consultIntentHandle');
const projectDiscussionHandle = require ('./irisBot/projectDiscussionHandle');
const infoIntentHandle = require ('./irisBot/infoIntentHandle');
const OurServicesHandle = require ('./irisBot/OurServicesHandle');
module.exports = function (intentRequest, callback) {
  console.log (
    `dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`
  );
  const intentName = intentRequest.currentIntent.name;

  // var str = '<mailto:priya@gmail.com|priya@gmail.com> ';

  if (intentName === 'Greeting') {
    return callback (greetingHandle (intentRequest));
  }
  if (intentName === 'UserQuery') {
    return callback (generalQueryHandle (intentRequest));
  }
  if (intentName === 'CareerQuery') {
    return callback (careerQueryHandle (intentRequest));
  }
  if (intentName === 'AskQuery') {
    return callback (askQueryHandle (intentRequest));
  }
  if (intentName === 'ApplyNow') {
    return callback (applyNowHandle (intentRequest));
  }
  if (intentName === 'BusinessQuery') {
    return callback (businessQueryHandle (intentRequest));
  }
  if (intentName === 'ConsultIntent') {
    return callback (consultIntentHandle (intentRequest));
  }
  if (intentName === 'DiscussIntent') {
    return callback (projectDiscussionHandle (intentRequest));
  }
  if (intentName === 'InfoIntent') {
    console.log ('mustang1');
    return callback (infoIntentHandle (intentRequest));
  }
  if (intentName === 'OurServices') {
    console.log ('mustang2');
    return callback (OurServicesHandle (intentRequest));
  }

  throw new Error (`Intent with name ${intentName} not supported`);
};
