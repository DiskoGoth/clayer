define(['backbone', 'underscore', 'app/views/toolbar/Player', 'app/collection/playlist', 'text!app/templates/Toolbar.html', 'text!app/templates/toolbar/loggedin.html'],
  function(Backbone, _, ToolbarPlayerView, playlistCollection, toolbarTemplate, toolbarLoggedinTemplate) {
    return Backbone.View.extend({

      className: 'navbar navbar-fixed-top',
      template: _.template(toolbarTemplate),
      loggedinTemplate: _.template(toolbarLoggedinTemplate),

      events: {
        'click .login-button': 'doLogin',
        'submit .form-search': 'doSearch'
      },

      subviews: {
        '.widget-player': new ToolbarPlayerView()
      },

      checkLoginInProgress: false,

      initialize: function () {
        this.checkLogin();
      },

      doSearch: function () {
        var query = this.$('.search-query').val();
        Backbone.history.navigate('search/' + query, {trigger: true});
        return false;
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
            clearInterval(me.checkLoginInteval);
            me.$('.login-button').replaceWith(me.loggedinTemplate(result.data));

            playlistCollection.setParam('access_token', result.data.vkontakte.accessToken);
          }
          me.checkLoginInProgress = false;
        });

      },

      render: function () {
        this.$el.html(this.template());
        this.$('.widget-player').replaceWith(this.subviews['.widget-player'].render().el);
        return this;
      }

    });
});
