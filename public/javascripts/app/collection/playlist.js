define(['backbone', 'underscore', 'app/models/Track'], function (Backbone, _, TrackModel) {
  return new (Backbone.Collection.extend({
    model: TrackModel,
    params: [],

    idAttribute: 'aid',

    url: function () {
      return 'https://api.vk.com/method/audio.search?callback=?&q=' + this.params['q'] + '&count=200&access_token=' + this.params['access_token']
    },

    parse: function (response) {
      return _.rest(response.response, 1); // first item is something not needed
    },

    setParam: function (name, value) {
      this.params[name] = value;
    }
  }))();
});
