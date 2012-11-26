define(['backbone', 'underscore', 'text!app/templates/Sidebar.html'], function (Backbone, _, sidebarTemplate){

  return Backbone.View.extend({

    className: 'well sidebar-nav',

    template: _.template(sidebarTemplate),

    events: {
      //'click' :
    },

    render: function () {
      this.$el.html(this.template());

      return this;
    }

  });

});
