requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: '/javascripts/lib',
  waitSeconds: 45,
  paths: {
    app: '/javascripts/app',
    'jquery.cookie': 'jquery/cookie'
  },

  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    bootstrap: {
      deps: ['jquery']
    },
    'moment/langs/ru': {
      deps: ['moment']
    },
    'jquery.cookie': {
      deps: ['jquery']
    },
    'mediaplayer': {
      deps: 'jquery',
      exports: 'mejs'
    }
  }
});

var errorTimeout;

requirejs(['jquery', 'backbone', 'moment', 'app/router', 'jquery.cookie', 'moment/langs/ru', 'bootstrap'], function($, Backbone, moment, Router){
  $(document)
    .ready(function() {

    /* Setup moment */
    var lang = $.cookie('lang') || navigator.language || navigator.userLanguage;
    lang = lang.split('-')[0].toLowerCase(); // for Firefox when it returns en-US
    moment.lang(lang);

    var router = new Router();

    /* Setup routing */
    Backbone.history.start({pushState: true});

  })
    .ajaxError(function () {

      if (errorTimeout) {
        clearTimeout(errorTimeout);
      } else {
        $('<div class="ajax-error alert alert-error fade in">' +
          'Something wrong happened, please refresh page and try again. If this doesn\'t help, wait a few minutes please, we already doing an action' +
          '<a class="close" data-dismiss="alert" href="#">&times;</a>' +
        '</div>').on('closed', function() {
            clearTimeout(errorTimeout);
            errorTimeout = false;
          }).prependTo('.content-container');

        $('.ajax-error').alert();
      }

      errorTimeout = setTimeout(function(){ $('.ajax-error').alert('close')}, 5000);

    });
});
