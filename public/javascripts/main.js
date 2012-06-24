
$(document).ready(function(){

    var authInfo = function(response) {
        if (response.session) {
            clayer.init(response.session);
        } else {
            // alert('not auth');
        }
    };

    VK.init({
        apiId: 3007617
    });

    $("#do_login").click(function(){
        VK.Auth.login(authInfo);
        return false;
    })

    VK.Auth.getLoginStatus(authInfo);

});



