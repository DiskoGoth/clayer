var auth = {
  init: function() {
    $("#do_login").on("click", function(){
      auth.start();
    });
  },

  start: function() {
    window.open(
      '/auth/vkontakte',
      'Login with VK',
      'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=800,height=450'
    );

    $.get('/auth/longpoll', function() {
      document.location.reload();
    });

  }
};
