var _canv = (function() {
    var scale = 6;
    var ext = {};
    var canvas, ctx;

    var init =
        function() {
            require('libxpm.js');
            require('xpm_data.js');

            canvas = document.getElementById("canv");
            ctx = canvas.getContext("2d");
        };

    var click = ext.click =
        function(e) {
            // var colormap = create_colormap(xpm);
            // var pixels = xpm.pixels, line, char;
            // for (var i=0; i<pixels.length; i++) {
            //     line = pixels[i];
            //     for (var j=0; j<line.length; j++) {
            //         char = line[j];
            //         color_pixel(j, i, colormap[char]);
            //     }
            // }
            test_render();
        };

    var test_render = ext.test =
        function() {
            var xpm_info = libxpm.parse_xpm(xpmstr);
            libxpm.render_to_canvas(xpm_info, ctx);
        };


    window.onload = init;
    return ext;
})();

var require = function(what, cached) {
    var url;

    if (!cached)
        url = what + '?nocache=' + Math.random();
    else
        url = what;

    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
};