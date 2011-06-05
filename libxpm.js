var libxpm = (function() {
    var comment_regex = /\s*\/\*.*\*\/\s*/g;
    var $__SCALE__$ = 5;

    var color_pixel =
        function(c, x, y, color) {
            var xx, yy;
            xx = x*$__SCALE__$;
            yy = y*$__SCALE__$;

            if (color == "None") {
                var step = $__SCALE__$/2;
                c.fillStyle = "#333";
                c.fillRect(xx, yy, step, step);                
                c.fillRect(xx+step, yy+step, step, step);
                
            } else {
                c.fillStyle = color;
                c.fillRect(xx, yy, $__SCALE__$, $__SCALE__$);
            }
        };

    var create_color_map =
        function(what) {
            var out = {};
            var colors = what.colors, current, sp, char, color;
            for (var k in colors) {
                current = colors[k];
                char = current[0];
                sp = current.split(/\s/);
                color = sp[sp.length-1];
                console.log(color);
                if (color.length == 13) {
                    // 48bit col errr...
                    var intrgb = parseInt(Math.sqrt(parseInt(color.substring(1), 16)));
                    color = "" + intrgb;
                }


                out[char] = color;
            }

            return out;
        };

    var xpminfo;
    var ctx;
    var timer;
    var i=j=0;
    var timeout_callback =
        function() {
            console.log('i: ' + i + ' j: ' + j);
            if (i++ == xpminfo.width) {
                ++j;
                i=0;

                return;
            }

            if (j == xpminfo.height) {
                clearInterval(timer);
                return;
            }

            var char = xpminfo.pixels[j][i];
            color_pixel(ctx, i, j, xpminfo.color_map[char]);

        };

    return {
        parse_xpm: function(what) {
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
                    // remove quotes "..."
                    line = line.substring(line.indexOf('"')+1, line.lastIndexOf('"'));
                    lines.push(line);
                }
            }

            var info_line = lines[0];
            var info_parts = info_line.split(/\s+/);
            xpm_info.width = parseInt(info_parts[0]);
            xpm_info.height = parseInt(info_parts[1]);
            xpm_info.num_colors = parseInt(info_parts[2]);
            xpm_info.cpp = parseInt(info_parts[3]);
            
            var i;
            var color_map = {}, parts, char, color, color_split;
            for (i=1; i<=xpm_info.num_colors; i++) {
                parts = lines[i].split('\t');
                char = parts[0];
                color_split = parts[parts.length-1].split(/\s/);
                color = color_split[1];

                if (color.length == 13) {
                    // 48bit col errr...
                    var intrgb = parseInt(Math.sqrt(parseInt(color.substring(1), 16)));
                    color = "#" + intrgb.toString(16);
                }


                color_map[char] = color;
            }

            xpm_info.color_map = color_map;
            xpm_info.pixels = lines.slice(i);

            return xpm_info;
        },

        slow_render: function (xpm_info, c) {
            xpminfo = xpm_info;
            ctx = c;

            timer = window.setInterval(timeout_callback, 10, true);
        },

        render_to_canvas: function(xpm_info, c) {
            var pixels = xpm_info.pixels;

            for (var i=0; i<pixels.length; i++) {
                line = pixels[i];
                for (var j=0; j<line.length; j++) {
                    char = line[j];
                    color_pixel(c, j, i, xpm_info.color_map[char]);
                }
            }
        }
    };
})();