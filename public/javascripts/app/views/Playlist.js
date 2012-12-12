define(['backbone', 'underscore', 'app/views/playlist/Item', 'app/collection/playlist', 'text!app/templates/Playlist.html'],
  function (Backbone, _, PlaylistItemView, playlistCollection, playlistTemplate) {
  return Backbone.View.extend({
    _moduleName: 'Playlist',
    className: 'well',
    template: _.template(playlistTemplate),
    collection: playlistCollection,

    events: {
      'click': 'onTrackPlay' // Deselect other played tracks
    },

    initialize: function () {
      this.collection.on('reset', this.loadPlaylist, this);
    },

    trackViews: [],

    playNext: function () {
     var currentTrack =_.where(this.trackViews, {playing: true})[0];

     _.find(this.trackViews, function (trackView) {
      return trackView.trackNumber == currentTrack.trackNumber + 1;
     }).$el.find('.track-number').trigger('click');

    },

    onTrackPlay: function (evt) {

      var playedId = $(evt.target).parents('tr').attr('id').split('-')[1],
        currentTracks =_.where(this.trackViews, {playing: true});

      _.each(currentTracks, function(trackView) {
        if (trackView.aid != playedId) {
          trackView.unplay();
        }
      })
    },

    loadPlaylist: function (collection) {
      var me = this;
      this.$('.playlist-table tbody').html('');

      collection.each(function (track, idx) {

        var data = track.toJSON();
        data.idx = idx + 1; // A bit crunchy

        var trackView = new PlaylistItemView({model: data, trackNumber: idx});
        me.trackViews.push(trackView);
        me.$('.playlist-table tbody').append(trackView.render().el);
      });

      this.$('.playlist-table').show();
      this.$('.playlist-empty').hide();
    },

    render: function () {
      this.$el.html(this.template({items: this.collection}));

      return this;
    }

  });
});
