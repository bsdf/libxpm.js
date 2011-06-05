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
            var scaleInput = parseInt($("scale").value);
            if (scaleInput)
                scale = scaleInput;

            var rnd = Math.floor(Math.random()*xpm_images.length);
            var url = "xpm/" + xpm_images[rnd];

            xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange =
                function(e) {
                    if (xhr.readyState == 4) {
                        var xpmstr = xhr.responseText;
                        var render_options = {
                            scale: scale,
                            bg_checkered: false
                        };


                        var wrapper = $("wrapper");
                        wrapper.appendChild(libxpm.xpm_to_img(xpmstr, render_options));
                        wrapper.scrollTop = wrapper.scrollHeight;
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

var xpm_images = ["N.xpm",
                  "arrows.xpm",
                  "atom.xpm",
                  "bomb.xpm",
                  "book_index.xpm",
                  "book_library.xpm",
                  "color_chart.xpm",
                  "colours.xpm",
                  "disk_3D.xpm",
                  "disk_run.xpm",
                  "dont_panic.xpm",
                  "editres.xpm",
                  "fonts.xpm",
                  "fruit.xpm",
                  "fv.xpm",
                  "globe.xpm",
                  "index.xpm",
                  "info.xpm",
                  "magnify.xpm",
                  "mail.xpm",
                  "map.xpm",
                  "mini.destroy.xpm",
                  "mini.excl.xpm",
                  "mini.exit.xpm",
                  "mini.fvwm.xpm",
                  "mini.lower.xpm",
                  "mini.move.xpm",
                  "mini.netscape.xpm",
                  "mini.raise.xpm",
                  "mini.resize.xpm",
                  "mini.xboing.xpm",
                  "mini.xlock.xpm",
                  "mini.xpm",
                  "network.xpm",
                  "news2.xpm",
                  "owl.xpm",
                  "palette2.xpm",
                  "rcalc.xpm",
                  "rterm.xpm",
                  "smallx.xpm",
                  "snail.xpm",
                  "snoopy.xpm",
                  "sysedi.xpm",
                  "tas.xpm",
                  "term.xpm",
                  "uk.xpm",
                  "window.xpm",
                  "x.xpm",
                  "x_server.xpm",
                  "xblast.xpm",
                  "xedit.xpm",
                  "xedit_w.xpm",
                  "xemacs-icon.xpm",
                  "xemacs.xpm",
                  "xgl.xpm",
                  "xgrab.xpm",
                  "xhelp.backward.xpm",
                  "xhelp.exclaim.xpm",
                  "xhelp.forward.xpm",
                  "xhelp.index.xpm",
                  "xhelp.search.xpm",
                  "xlab.xpm",
                  "xmail.xpm",
                  "xman.xpm",
                  "xmosaic.xpm",
                  "xmosaic_w.xpm",
                  "xnomail.xpm",
                  "xoldmail.xpm",
                  "xscrabble.xpm",
                  "xterm.xpm",
                  "xterm2.xpm",
                  "yinyang.xpm"];