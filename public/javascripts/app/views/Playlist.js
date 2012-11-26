define(['backbone', 'underscore', 'app/views/playlist/Item', 'app/collection/playlist', 'text!app/templates/Playlist.html'],
  function (Backbone, _, PlaylistItemView, playlistCollection, playlistTemplate) {
  return Backbone.View.extend({
    className: 'well',
    template: _.template(playlistTemplate),
    collection: playlistCollection,

    initialize: function () {
      this.collection.on('reset', this.loadPlaylist, this);
    },

    trackViews: [],

    loadPlaylist: function (collection) {
      var me = this;
      this.$('.playlist-table tbody').html('');

      collection.each(function (track) {

        var trackView = new PlaylistItemView({model: track.toJSON()});
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
