var _canv = (function() {
    var scale = 6;
    var ext = {};
    var canvas, ctx;

    var init =
        function() {
            canvas = document.getElementById("canv");
            ctx = canvas.getContext("2d");
        };

    var click = ext.click =
        function(e) {
            var colormap = create_colormap(xpm);
            var pixels = xpm.pixels, line, char;
            for (var i=0; i<pixels.length; i++) {
                line = pixels[i];
                for (var j=0; j<line.length; j++) {
                    char = line[j];
                    color_pixel(j, i, colormap[char]);
                }
            }
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
                out[char] = color;
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

    window.onload = init;
    return ext;
})();

var xpm = {
    dimensions: "32 30 5 1",
    colors: [" 	c None", //" 	s None	c None",
             ".	c grey",
             "X	c white",
             "o	c blue",
             "O	c black"],
    pixels: [
        "                                ",
        "                                ",
        "                                ",
        "   ......            ........   ",
        "   .XXXXX.           XXXXXXXX   ",
        "    .XXXXX.           .XXXX     ",
        "     .XXXXX.           .XX      ",
        "      .XXXXX.          .XX      ",
        "      .XXXXXX.         .XX      ",
        "      .XXXXXXX.        .XX      ",
        "      .XX XXXXX.       .XX      ",
        "      .XX  XXXXX.      .XX      ",
        "      .XX   XXXXX.     .XX      ",
        "      .XX    XXXXX.    .XX      ",
        "      .XX     XXXXX.   .XX      ",
        "      .XX      XXXXX.  .XX      ",
        "      .XX       XXXXX. .XX      ",
        "      .XX        XXXXX..XX      ",
        "      .XX         XXXXX.XX      ",
        "      .XX          XXXXXXX      ",
        "      .XX           XXXXXX      ",
        "      .XXooooooooooooooXXX      ",
        "     ooXXOOOOOOOOOOOOOOoooo     ",
        " ooooOOXXOOOOOOOOOOOOOOOOOOooo  ",
        "oOOOOOOXXOOOOOOOOOOOOOOOOOOOOOoo",
        "OOOOOOXXXXOOOOOOOOOOOOOOOOOOOOOO",
        "OOOOXXXXXXXXOOOOOOOOOOOOOOOOOOOO",
        "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
        "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
        "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"]
};
