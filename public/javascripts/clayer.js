var clayer = {

  session: {},

  init: function (session) {
    this.session = session;
    // Init ui

    this.initUI();

    // Load user playlists

    this.initUser();

  },
  initUI: function () {

    this.player = new MediaElementPlayer("#control-player", {
      features: ['current', 'progress', 'duration', 'tracks', 'volume'],
      defaultAudioHeight: "36px",
      success: function (mediaElement, domObject) {
        mediaElement.addEventListener('ended', clayer.next, false);

        mediaElement.addEventListener('pause', function () {

          $("#control-playpause i").removeClass('icon-pause').addClass('icon-play');
        });

        mediaElement.addEventListener('play', function () {
          $("#control-playpause i").removeClass('icon-play').addClass('icon-pause');
        });
      }
    });

    $("#do_search").submit(function () {
      vk.call('audio.search', {q: $("#get_search_query").val(), count: 200}, clayer.searchResults);
      return false;
    });

    $("#do_search_submit").click(function () {
      $("#do_search").trigger('submit');
      return false;
    });

    $("#container").on("click", "a.playlist-item-title", function () {
      $("#container-playlist .current").removeClass('current');
      $(this).parents('tr').addClass('current');
      clayer.play($(this).attr('href'));
      return false;
    });

    $("#control-playpause").on('click', function () {
      if (clayer.player.media.paused) {
        clayer.player.play();
      } else {
        clayer.player.pause();
      }

    });

    $("#control-backward").on('click', function () {
      clayer.prev();
      return false;
    });

    $("#control-forward").on('click', function () {
      clayer.next();
      return false;
    });

  },

  play: function (url) {
    clayer.player.setSrc(url);
    clayer.player.play();

    return false;
  },

  next: function () {
    var $current = $('#container-playlist .current').removeClass('current');
    var $next = $current.next().find('a');
    $next.parents('tr').addClass('current');
    clayer.play($next.attr('href'));
  },

  prev: function () {
    var $current = $('#container-playlist .current').removeClass('current');
    var $next = $current.prev().find('a');
    $next.parents('tr').addClass('current');
    clayer.play($next.attr('href'));
  },

  initUser: function () {

  },

  searchResults: function (r) {
    $("#container").html($('#playlist-template').text());

    var $playlist = $("#container-playlist").find('tbody').html('');

    var $playlistItemTemplate = $($("#playlist-item-template").text());

    $.each(r.response, function (index, elem) {

      if (typeof elem == 'object') {

        var duration = moment.duration(elem.duration, 's');
        var title = elem.title.length > 80 ? (elem.title.substring(0, 80) + '...') : elem.title;

        var playlistItem = $playlistItemTemplate.clone()
          .find('.playlist-item-artist').text(elem.artist).end()
          .find('.playlist-item-title').text(title).end()
          .find('.playlist-item-time').text(duration.humanize()).end()
          .find('.playlist-item-url').attr('href', elem.url).end();

        playlistItem.appendTo($playlist);

      }

    })
  }

};
