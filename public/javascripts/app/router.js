define(['backbone', 'app/collection/playlist', 'app/views/Main'], function(Backbone, playlistCollection, MainView){

  return Backbone.Router.extend({
    routes: {
      '': 'index',
      'search': 'lastSearch',
      'search/:keyword': 'search',
      'radio/library': 'radioLibrary',
      'radio/mix': 'radioMix',
      'radio/friends': 'radioFriends',
      'radio/neighbourhood': 'radioNeighbourhood',
      'radio/recommended': 'radioRecommended',
      'radio/search': 'radioSearch',
      'radio/:keyword': 'radio',
      'settings': 'settings'
    },

    mainView: new MainView(),

    search: function (keyword) {
      playlistCollection.setParam('q', keyword);
      playlistCollection.fetch();
    },

    lastSearch: function() {
      this.mainView.loadContent('Playlist');
    },

    radio: function (keyword) {

    },

    settings: function () {
      this.mainView.loadContent('Settings');
    },

    index: function () {
      this.mainView.render();
    }
  });

});
