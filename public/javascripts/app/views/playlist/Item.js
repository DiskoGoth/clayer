define(['backbone', 'underscore', 'app/models/player', 'text!app/templates/playlist/Item.html'], function (Backbone, _, playerModel, playlistItemTemplate){
  return Backbone.View.extend({
    tagName: 'tr',
    className: 'playlist-item',
    template: _.template(playlistItemTemplate),

    events: {
      'click': 'play'
    },

    play: function () {
      playerModel.set(this.model);
      this.trackNumber = this.$('.track-number').text();
      this.$('.track-number').html('<i class="icon-bullhorn"></i>');
      this.$el.addClass('info');
    },

    render: function () {
      this.$el.html(this.template(this.model));

      return this;
    }
  });
});
