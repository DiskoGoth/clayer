define(['backbone', 'underscore', 'text!app/templates/Playlist.html'], function (Backbone, _, playlistTemplate) {
  return Backbone.View.extend({
    className: 'well',
    template: _.template(playlistTemplate),

    render: function () {

      this.$el.html(this.template());

      return this;
    }

  });
});
