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



    var parse_xpm = ext.parse =
        function(what) {
            // grab the { ... }
            var body = what.substring(what.indexOf('{')+1,
                                      what.lastIndexOf('}'));

            var lines = [], line;
            var sp = body.split(',');
            for (var k in sp) {
                line = sp[k];
                // remove comments
                line = line.replace(comment_regex, "");
                console.log(line);
                if (line.trim() != "") {
                    lines.push(line);
                }
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

var xpmstr = '/* XPM */\
static char * xemacs-icon_xpm[] = {\
"48 48 10 1",\
" 	c #FFFFFFFFFFFF",\
".	c #618565956185",\
"X	c #E79DE38DE79D",\
"o	c #CF3CCB2BCF3C",\
"O	c #79E77DF779E7",\
"+	c #965896589658",\
"@	c #492449244924",\
"#	c #FFFF00000000",\
"$	c #AEBAAEBAAEBA",\
"%	c #FFFFFFFF0000",\
"                                                ",\
"                                            .   ",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.   ",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXooo..O..OooOOooXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"       @        @X           @XXXXXXXXXXXXXo.O++",\
"  #####@   #####@X ##########@..OooXXXXXXXXo.O++",\
"   ####@   ####@XX ##########@XXXXXXXXXXXXXo.O++",\
"   #####@ #####@$$ ##########@$$$XXXXXXXXXXo.O++",\
"    ####@ ####@$$$ #####@@@@@@$$$OO.OOoXXXXo.O++",\
"    ##########@$$% #####@%%%%$%%%%%%%%%%%XXo.O++",\
"     ########@$$$% #####@     %%%%%%%%%%%XXo.O++",\
"     ########@$$$% ##########@$$$oo%%%%%%XXo.O++",\
"      ######@$$$$% ##########@%%%%%%%%%%%XXo.O++",\
"     ########@$$$% ##########@%%%%%%%%%%%XXo.O++",\
"     ########@$$XX #####@@@@@@$$.OOOooXXXXXo.O++",\
"    ##########@$$X #####@$$$$$$$$XXXXXXXXXXo.O++",\
"    ####@@####@$$X #####@     $$$XXXXXXXXXXo.O++",\
"   #####@ #####@$$ ##########@$$$oooXXXXXXXo.O++",\
"   ####@$$ ####@$$ ##########@XXXXXXXXXXXXXo.O++",\
"  #####@$$ #####@$ ##########@...OOOOO.XXXXo.O++",\
" @@@@@@@$$@@@@@@@$@@@@@@@@@@@@$$$XXXXXXXXXXo.O++",\
"     $$$$$$XXX$$$$$$XX$$....$$...OOOOO.XXXXo.O++",\
"     $$$$$$XXX$$$$$$XX$$$$$$$$$$$XXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXX..oOOO.ooOooXXXXXXXXo.O++",\
"           XXXX+#+XXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXX+###+XXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXX#####oOOOoo.OOOoXXXXXXXXXXXXXo.O++",\
"           XXX+###+XXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXX+#+XXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXoOO.o$$OOOoXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXX.OOOoooXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXo.O++",\
"           ooooooooooooooooooooooooooooooooo.O++",\
"          ...................................O++",\
"            OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO++",\
"            ++++++++++++++++++++++++++++++++++++",\
"            ++++++++++++++++++++++++++++++++++++"};';

var xpmstr2 = '/* XPM */\
static char * snoopy_xpm[] = {\
/* width height ncolors chars_per_pixel */\
"32 32 5 1",\
/* colors */\
" 	s None	c None",\
".	c black",\
"X	c yellow",\
"o	c white",\
"O	c firebrick",\
/* pixels */\
"                         .XXXXXX",\
"                     .....XXXXXX",\
"                         ..XXXXX",\
"                          .XXXXX",\
"                         ...XXXX",\
"                        .  ..XXX",\
"        ..             .   . ...",\
"       ....                .  . ",\
"      .oooo.              .   . ",\
"     .oooooo.                 . ",\
"     .oooooo.                 . ",\
"     .oooooo.    ...     ..     ",\
"      .oooo.    .ooo.   .oo.    ",\
"   .  .oooo.   .ooooo.  .o..    ",\
"    ..oooo.   .oooooo.  .oo.    ",\
"    .o.ooo.. .ooooooo.  .oo.    ",\
"    .ooooo...oooooooo....oo.    ",\
"    .oooooo.o.....ooooooooo.    ",\
"     ...ooo.oooooo.oooooooo.    ",\
"   .............oo...........   ",\
"   .O...OOOOOOOO..OOOOOOOOOO.   ",\
"   .O....OOOOOOOOOOOOOOOOOOO.   ",\
"   .O....OOOOOOOOOOOOOOOOOOO.   ",\
"  .OO....OOOOOOOOOOOOOOOOOOOO.  ",\
"  ............................  ",\
"  .OO....OOOOOOOOOOOOOOOOOOOO.  ",\
" .OOO....OOOOOOOOOOOOOOOOOOOOO. ",\
" .OOOO..OOOOOOOOOOOOOOOOOOOOOO. ",\
" .OOOOOOOOOOOOOOOOOOOOOOOOOOOO. ",\
".OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO.",\
"................................",\
".OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO."};';

var comment_regex = /\s*\/\*.*\*\/\s*/g;
