var _canv = (function() {
    var scale = 6;
    var ext = {};
    var canvas, ctx;

    var init =
        function() {
            require("libxpm.js");
            canvas = document.getElementById("canv");
        };

    var xhr;
    var click = ext.click =
        function(e) {
            var url = "xpm/owl.xpm";

            xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange =
                function(e) {
                    if (xhr.readyState == 4) {
                        var xpmstr = xhr.responseText;
                        $("wrapper").appendChild(libxpm.xpm_to_img(xpmstr, {scale:10}));
                    }
                };

            xhr.send();
        };

    window.onload = init;
    return ext;
})();

var require =
    function(what, cached) {
        var url = what + (!cached? "?nocache=" + Date.now() : "");

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type= 'text/javascript';
        script.src = url;
        
        head.appendChild(script);
    };

var $ = function(what) { return document.getElementById(what); };