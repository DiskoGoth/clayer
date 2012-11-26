define(['backbone', 'app/views/Toolbar', 'app/views/Sidebar', 'app/views/Playlist', 'text!app/templates/Main.html'],
  function(Backbone, ToolbarView, SidebarView, PlaylistView, mainTemplate) {
    return Backbone.View.extend({

      el: 'body',

      template: _.template(mainTemplate),

      subviews: {
        '.widget-toolbar': new ToolbarView(),
        '.widget-sidebar': new SidebarView(),
        '.widget-playlist': new PlaylistView()
      },

      render: function () {
        this.$el.append(this.template());

        this.$el.addClass('app');

        _.each(this.subviews, function (widget, selector) {
          this.$(selector).replaceWith(widget.render().el);
        }, this);

        return this;
      }

    });
});
