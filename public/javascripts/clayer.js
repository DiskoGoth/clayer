var clayer = {

    session: {},

    init: function(session) {
        this.session = session;
        // Init ui

        this.initUI();


        // Load user playlists

        this.initUser();

    },
    initUI: function() {

        VK.Api.call('users.get', {uids: [this.session.mid], fields:'nickname'}, function(r) {
              $("#get_login").text(r.response[0].nickname);
        });

        $("#do_search").submit(function(){
            VK.Api.call('audio.search', {q: $("#get_search_query").val()}, clayer.searchResults);
            return false;
        });

        $("#do_search_submit").click(function(){
            $("#do_search").trigger('submit');
            return false;
        })

    },

    initUser: function(){
        VK.Api.call('audio.getAlbums', {uid: this.session.mid}, function(r) {
            console.log(r);
        })
    },

    searchResults: function(r) {
        console.log(r);
    },

}
