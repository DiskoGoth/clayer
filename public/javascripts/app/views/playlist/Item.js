define(['backbone', 'underscore', 'text!app/templates/playlist/Item.html'], function (Backbone, _, playlistItemTemplate){
  return Backbone.View.extend({
    tagName: 'tr',
    template: _.template(playlistItemTemplate),
    render: function () {
      this.$el.html(this.template(this.model));

      return this;
    }
  });
});
