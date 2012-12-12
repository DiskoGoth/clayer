define(['backbone', 'app/views/Toolbar', 'app/views/Sidebar', 'app/views/Playlist', 'text!app/templates/Main.html'],
  function(Backbone, ToolbarView, SidebarView, PlaylistView, mainTemplate) {
    return Backbone.View.extend({
      _moduleName: 'Main',
      el: 'body',

      savedState: [],

      template: _.template(mainTemplate),

      subviews: {
        '.widget-toolbar': new ToolbarView(),
        '.widget-sidebar': new SidebarView(),
        '.widget-content': new PlaylistView()
      },

      loadContent: function (viewName) {

        // Saving previous view
        this.savedState[this.subviews['.widget-content']._moduleName] = this.subviews['.widget-content'];

        // Checking, if we alredy have current view in saved state
        if (typeof this.savedState[viewName] !== 'undefined') { // Got it
          this.$('.widget-content').html(this.savedState[viewName].el);
        } else { // Let's create
          var me = this;

          require(['app/views/' + viewName], function (View) {
            var view = me[viewName.toLowerCase() + 'View'] = new View();
            me.$('.widget-content').html(view.render().el);
            me.subviews['.widget-content'] = view;
          });
        }
      },

      render: function () {
        this.$el.append(this.template());

        this.$el.addClass('app');

        _.each(this.subviews, function (widget, selector) {
          if (this.$(selector).hasClass('replace')) {
            this.$(selector).replaceWith(widget.render().el);
          } else {
            this.$(selector).append(widget.render().el);
          }

        }, this);

        this.subviews['.widget-toolbar'].subviews['.widget-player'].playlistView = this.subviews['.widget-content'];

        return this;
      }

    });
});
