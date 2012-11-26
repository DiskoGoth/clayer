define(['backbone'], function(Backbone){

  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'search/:keyword': 'search',
      'radio/library': 'radioLibrary',
      'radio/mix': 'radioMix',
      'radio/friends': 'radioFriends',
      'radio/neighbourhood': 'radioNeighbourhood',
      'radio/recommended': 'radioRecommended',
      'radio/search': 'radioSearch',
      'radio/:keyword': 'radio',
      'settings': 'settings',
      'accounts': 'accounts'

    },

    search: function (keyword) {

    },

    radio: function (keyword) {

    },

    index: function () {

      require(['app/views/Main'], function(MainView){

        var mainView = new MainView();
        mainView.render();

      });

    }
  });

});
