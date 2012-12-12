define(['backbone', 'underscore', 'app/models/player', 'text!app/templates/toolbar/Player.html'],
  function (Backbone, _, playerModel, toolbarPlayerTemplate) {
    return Backbone.View.extend({
      _moduleName: 'toolbar/Player',
      template: _.template(toolbarPlayerTemplate),
      model: playerModel,
      className: 'toolbar-player',

      events: {
        'click .control-playpause': 'playpause',
        'click .control-seek': 'seekTo',
        'click .control-timer': 'toogleTimer'
      },

      timer: 'left', // or 'elapsed'

      toogleTimer: function () {
        this.timer = this.timer == 'left' ? 'elapsed' : 'left';
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
          var currentTime = Math.floor(evt.target.currentTime),
            elapsedMinutes = ("0" + Math.floor(currentTime / 60)).slice(-3),
            elapsedSeconds = ("0" + currentTime % 60).slice(-2),
            durationTime =  Math.floor(evt.target.duration - evt.target.currentTime),
            durationMinutes = ("0" + Math.floor(durationTime / 60)).slice(-3),
            durationSeconds = ("0" + durationTime % 60).slice(-2),
            percentage = evt.target.currentTime / evt.target.duration * 100;

          this.$('.control-progress').css('width', percentage + '%');

          if (this.timer == 'elapsed') {
            this.$('.control-timer').html(elapsedMinutes + ":" + elapsedSeconds);
          } else { // timer == 'elapsed'
            this.$('.control-timer').html("-" + durationMinutes + ":" + durationSeconds);
          }
        },
        ended: function () {
          this.playlistView.playNext();
        }
      },

      setupControls: function () {
        _.each(this.controls, function (callback, event) {
          this.$player.on(event, $.proxy(callback, this));
        }, this);
      }

    });
});
