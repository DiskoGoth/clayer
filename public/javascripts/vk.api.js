var vk = {
  init: function() {
    if (typeof access_token != 'undefined') {
      this.access_token = access_token;
    }
  },

  call: function(method, params, callback) {

    params['access_token'] = this.access_token;

    $.getJSON('https://api.vk.com/method/'+method+'?callback=?', params, callback);

  }

};
