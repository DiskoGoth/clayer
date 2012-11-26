var settings = {

  uri: 'http://clayer.dev:300',
  port: process.env.PORT || 3000,

  vkontakte: {
    appId: '3260732',
    appSecret: '2FAKLR3BGTYxOivMQxvZ',
    scope: 'audio,nickname'
  }

};

if (process.env.NODE_ENV == 'production') {
  settings.uri = 'http://lp.josser.net';
  settings.port = process.env.PORT || 80; // Joyent SmartMachine uses process.env.PORT

  settings.vkontakte = {
    appId: '3007617',
      appSecret: 'sLvu0troCTrFlG3rTLwo',
      scope: 'audio,nickname'
  }
}

module.exports = settings;
