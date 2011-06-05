var _canv = (function() {
    var scale = 6;
    var ext = {};
    var canvas, ctx;

    var init =
        function() {
            require("libxpm.js");
            require("xpm_data.js");
            require("color_parse.js");
            canvas = document.getElementById("canv");
            ctx = canvas.getContext("2d");

            var select = document.getElementById("which_xpm");
            var xpms = ["snoopy", "netscape", "xemacs"];
            for (var key in xpms) {
                select.options.add(new Option(xpms[key]));
            }
        };

    var click = ext.click =
        function(e) {
            var xpm_data;
            var select = document.getElementById("which_xpm");
            if (select.value == "netscape")
                xpm_data = netscape;
            else if (select.value == "xemacs")
                xpm_data = xemacs;
            else if (select.value == "snoopy")
                xpm_data = snoopy;
            else
                xpm_data = netscape;
            
            var width = xpm_data.dimensions[0];
            var height = xpm_data.dimensions[1];
            
            // resize canvas;
            canvas.width = (width*scale);
            canvas.height = (height*scale);
            canvas.style.width = (width*scale) + "px";
            canvas.style.height = (height*scale) + "px";

            var colormap = create_colormap(xpm_data);
            var pixels = xpm_data.pixels, line, char;
            for (var i=0; i<height; i++) {
                line = pixels[i];
                for (var j=0; j<line.length; j++) {
                    char = line[j];
                    color_pixel(j, i, colormap[char]);
                }
            }

            document.getElementById("pre").innerHTML = xpm_data.pixels.join('\n');
        };

    var create_colormap =
        function(what) {
            var out = {};
            var colors = what.colors, current, sp, char, color;
            for (var k in colors) {
                current = colors[k];
                char = current[0];
                sp = current.split(/\s/);
                color = sp[sp.length-1];
                out[char] = x11_colors.get_color_value(color);
            }

            return out;
        };

    var color_pixel =
        function(x, y, color) {
            var xx, yy;
            xx = x*scale;
            yy = y*scale;

            if (color == "None") {
                var step = scale/2;
                ctx.fillStyle = "#333";
                ctx.fillRect(xx, yy, step, step);                
                ctx.fillRect(xx+step, yy+step, step, step);
                
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(xx, yy, scale, scale);
            }
        };



    var parse_xpm = ext.parse =
        function(what) {
            var xpm_info = {};
            // grab the { ... }
            var body = what.substring(what.indexOf('{')+1,
                                      what.lastIndexOf('}'));

            var lines = [], line;
            var sp = body.split(',');
            for (var k in sp) {
                line = sp[k];
                // remove comments
                line = line.replace(comment_regex, "");

                if (line.trim() != "") {
                    lines.push(line);
                }
            }

            var info_line = lines[0];
            var info_parts = info_line.split(/\s+/);
            xpm_info.width = info_parts[0];
            xpm_info.height = info_parts[1];
            xpm_info.colors = info_parts[2];
            xpm_info.cpp = info_parts[3];
            
            console.log(xpm_info);


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
var comment_regex = /\s*\/\*.*\*\/\s*/g;