define(['backbone', 'underscore', 'app/models/player', 'text!app/templates/toolbar/Player.html'],
  function (Backbone, _, playerModel, toolbarPlayerTemplate) {
    return Backbone.View.extend({

      template: _.template(toolbarPlayerTemplate),
      model: playerModel,
      className: 'toolbar-player',

      events: {
        'click .control-playpause': 'playpause',
        'click .control-seek': 'seekTo'
      },

      initialize: function () {
        this.model.on('change', this.play, this);
      },

      playpause: function () {
         if (this.playerControl.paused) {
           this.playerControl.play();
         } else {
           this.playerControl.pause();
         }

        return false;
      },

      play: function (track) {
        this.$player.attr('src', track.get('url'));
        this.$('.track-title').text(track.get('artist') + ' - ' + track.get('title'));
        this.playerControl.play();
      },

      render: function () {
        this.$el.html(this.template(this.model.toJSON()));

        this.$player = this.$('.audio-player');
        this.playerControl = this.$player.get(0);

        this.setupControls(); // Can't bind via backbone events for some reason :(

        return this;
      },

      seekTo: function (evt) {
        var seekTo = evt.offsetX / $(evt.currentTarget).width();
        this.playerControl.currentTime = this.playerControl.duration * seekTo;
      },

      controls: {
        pause: function () {
          this.$('.control-playpause i').removeClass('icon-pause').addClass('icon-play');
        },
        play: function () {
          this.$('.control-playpause i').removeClass('icon-play').addClass('icon-pause');
        },

        timeupdate: function (evt) {
          var percentage = evt.target.currentTime / evt.target.duration * 100;
          this.$('.control-progress').css('width', percentage + '%');
        }
      },

      setupControls: function () {
        _.each(this.controls, function (callback, event) {
          this.$player.on(event, $.proxy(callback, this));
        }, this);
      }

    });
});
