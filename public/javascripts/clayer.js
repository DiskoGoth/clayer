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

        this.player =  new MediaElementPlayer("#control-player", {defaultAudioHeight: "36px",
            success: function (mediaElement, domObject) {

                // add event listener
                mediaElement.addEventListener('ended', clayer.next, false);
            }
        });

        VK.Api.call('users.get', {uids: [this.session.mid], fields:'nickname'}, function(r) {
              $("#get_login").text(r.response[0].nickname);
        });

        $("#do_search").submit(function(){
            VK.Api.call('audio.search', {q: $("#get_search_query").val(), count: 200}, clayer.searchResults);
            return false;
        });

        $("#do_search_submit").click(function(){
            $("#do_search").trigger('submit');
            return false;
        });


        $("#container-playlist").on("click", "a", function() {
            $(this).addClass('current');
            return clayer.play($(this).attr('href'));
        });

    },

    play: function(url) {
        clayer.player.setSrc(url);
        clayer.player.play();

        return false;
    },

    next: function(event) {
        var $current = $('#container-playlist .current').removeClass('current');
        var $next = $current.parents('tr').next().find('a');
        $next.addClass('current');
        clayer.play($next.attr('href'));
    },

    initUser: function(){
        VK.Api.call('audio.getAlbums', {uid: this.session.mid}, function(r) {
            // TODO: add playlist loading
        })
    },

    searchResults: function(r) {
        console.log(r);
        var $playlist = $("#container-playlist").find('tbody').html('').end();

        var $playlistItemTemplate = $("#template-playlist-item");

        $.each(r.response, function(index, elem){
            if (typeof elem == 'object') {

                var playlistItem = $playlistItemTemplate.clone().removeAttr('id')
                    .find('.playlist-item-artist').text(elem.artist).end()
                    .find('.playlist-item-title').text(elem.title).end()
                    .find('.playlist-item-time').text(elem.duration).end()
                    .find('.playlist-item-url').attr('href', elem.url).end();

                playlistItem.appendTo($playlist);

            }


        })
    }

};
