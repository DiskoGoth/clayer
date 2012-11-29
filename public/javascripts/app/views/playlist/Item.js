define(['backbone', 'underscore', 'app/models/player', 'text!app/templates/playlist/Item.html'],
  function (Backbone, _, playerModel, playlistItemTemplate){
    return Backbone.View.extend({
      tagName: 'tr',
      className: 'playlist-item',
      template: _.template(playlistItemTemplate),

      events: {
        'click': 'play'
      },

      playing: false,

      initialize: function () {
        this.trackNumber = this.options.trackNumber;
      },

      play: function () {
        var $trackNumber = this.$('.track-number');

        playerModel.set(this.model);

        this.aid = this.model.aid;
        this.playing = true;

        $trackNumber.html('<i class="icon-bullhorn"></i>');
        this.$el.addClass('info').attr('id', 'aid-' + this.model.aid);
      },

      unplay: function () {
        this.playing = false;
        this.$('.track-number').html(this.trackNumber + 1);
        this.$el.removeClass('info');
      },

      render: function () {
        this.$el.html(this.template(this.model));

        return this;
      }
    });
});
