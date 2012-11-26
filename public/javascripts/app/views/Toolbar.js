define(['backbone', 'underscore', 'text!app/templates/Toolbar.html', 'text!app/templates/toolbar/loggedin.html'],
  function(Backbone, _, toolbarTemplate, toolbarLoggedinTemplate) {
    return Backbone.View.extend({

      className: 'navbar navbar-fixed-top',
      template: _.template(toolbarTemplate),
      loggedinTemplate: _.template(toolbarLoggedinTemplate),

      events: {
        'click .login-button': 'doLogin'
      },

      checkLoginInProgress: false,

      initialize: function () {
        this.checkLogin();
      },

      doLogin: function () {
        var me = this;

        window.open(
          '/auth/vkontakte',
          'VK',
          'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=800,height=450'
        );

        this.checkLoginInteval = setInterval(function () { me.checkLogin()}, 1000);

      },

      checkLogin: function () {

        if(this.checkLoginInProgress) {
          return;
        }

        var me = this;

        this.checkLoginInProgress = $.getJSON('/auth/check', function (result) {
          if (result.data.loggedIn == true) {
            me.$('.user-info-container').html(result.data.html);
            clearInterval(me.checkLoginInteval);
            me.$('.login-button').replaceWith(me.loggedinTemplate(result.data));
          }
          me.checkLoginInProgress = false;
        });

      },

      render: function () {
        this.$el.html(this.template());
        return this;
      }

    });
});
