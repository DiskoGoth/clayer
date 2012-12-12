define(['backbone', 'underscore', 'text!app/templates/Sidebar.html'], function (Backbone, _, sidebarTemplate){

  return Backbone.View.extend({
    _moduleName: 'Sidebar',
    className: 'well sidebar-nav',

    template: _.template(sidebarTemplate),

    events: {
      'click .settings' : 'goSettings',
      'click .search': 'goSearch'
    },

    goSettings: function () {
      Backbone.history.navigate('settings', {trigger: true});
      return false;
    },

    goSearch: function () {
      Backbone.history.navigate('search', {trigger: true});
      return false;
    },

    render: function () {
      this.$el.html(this.template());

      return this;
    }

  });

});
