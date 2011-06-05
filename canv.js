var _canv = (function() {
    var scale = 6;
    var ext = {};
    var canvas, ctx;

    var init =
        function() {
            require("libxpm.js");
            require("xpm_data.js");

            canvas = document.getElementById("canv");
        };

    var click = ext.click =
        function(e) {
            var xpm_info = libxpm.parse_xpm(xpmstr);
            libxpm.render_to_canvas(xpm_info, canvas);
            
            document.getElementById("pre").innerHTML = xpm_info.pixels.join('\n');
        };

    var export_canvas = ext.export_canvas =
        function() {
            
        };

    var test_render = ext.test =
        function() {
            var xpm_info = libxpm.parse_xpm(xpmstr);
            libxpm.render_to_canvas(xpm_info, ctx);
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