define(['backbone', 'underscore', 'text!app/templates/Settings.html'], function (Backbone, _, settingsTemplate) {
  return Backbone.View.extend({

    _moduleName: 'Settings',
    template: _.template(settingsTemplate),

    events: {

    },

    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });
});
