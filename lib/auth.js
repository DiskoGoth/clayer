var everyauth = require('everyauth');

everyauth.vkontakte
  .appId('3007617')
  .appSecret('sLvu0troCTrFlG3rTLwo')
  .scope('audio,nickname')
  .fields('first_name,last_name,nickname,photo')
  .findOrCreateUser(function (session, accessToken, accessTokenExtra, vkUserMetadata) {
    // find or create user logic goes here
    // Return a user or Promise that promises a user
    // Promises are created via
    //     var promise = this.Promise();

    var promise = this.Promise();

    promise.fulfill(vkUserMetadata);

    return  promise;
  }).redirectPath('/auth/vkontakte/ok');

module.exports = everyauth;
