//Preset pixel arrays are preloaded in the <head>
var activeColor,
    numOfPixels = 60,
    colorComponents = ["red","green","blue"],
    defaultColors = ["rgb(216,101,101)",
                     "rgb(216,153,101)",
                     "rgb(60,130,130)",
                     "rgb(80,173,80)",
                     "rgb(40,40,40)"];
//Clear the grid and preview areas
var clearViews = function() {
  $("#grid span").css("background-color","rgba(0,0,0,0)");
  $("#preview span").css("background-color","rgba(0,0,0,0)");
}
//Activate a palette color
var makeActive = function(c) {
    $("span.color").removeClass("active");
    c.addClass("active");
    activeColor = c.css("background-color");
}
//Color a pixel
var colorAPixel = function(g) {
    g.css("background-color",activeColor);
    var pixel = g.attr('class');
    $("#preview span."+pixel).css("background-color",activeColor);
}
//Create the grid and preview
var views = function() {
  for (y=1;y<=numOfPixels;y++){
    for (x=1;x<=numOfPixels;x++){
    $("#grid").append("<span data-x='"+x+"' data-y='"+y+"'  ></span>");
    }
  }
}
//Set the default palette colors
var setDefaultColors = function() {
  for (i=1;i<6;i++) {
    $(".col-2 .colors span.color.c"+i).css("background-color",defaultColors[i-1]);
  }
}
//Show the hover color if not blank/transparent
//"rgba(0, 0, 0, 0)" for Chrome
//"transparent" for IE and FF
var hoverText = function(h) {
  if (h.css("background-color") != "rgba(0, 0, 0, 0)" &&
      h.css("background-color") != "transparent") {
      $("#hover-color").html(h.css("background-color"));
    }
}
//Clear the hover color
var hoverTextClear = function() {
  $("#hover-color").html("&nbsp;");
}
//Show the number (class) of the pixel
var pixelText = function(p) {
  $("#pixel-no").html("x: " + p.attr("data-x") + " y: " + p.attr("data-y"));
}
//Clear the number of th pixel
var pixelTextClear = function(p) {
  $("#pixel-no").html("&nbsp;");
}
//When the page is ready...
$(document).ready(function() {
  views();
  setDefaultColors();
  //Activate a palette color
  $("span.color").click(function() {
    makeActive($(this));
  })
  //Color a pixel
  $("#grid span").click(function() {
    colorAPixel($(this));
  })
  //When the 'Clear the Grid' preset is chosen...
  $("#clear-preset").click(function() {
    clearViews();
  });
  //Hmm, how can I make these next 8 mouse functions dry?
  //Display a color code when a pixel is hovered
  $("#grid span").mouseenter(function() {
    hoverText($(this));
  });
  $("#grid span").mouseleave(function() {
    hoverTextClear();
  });
  $("#preview span").mouseenter(function() {
    hoverText($(this));
  });
  $("#preview span").mouseleave(function() {
    hoverTextClear();
  });
  //Display the pixel number when a pixel is hovered
  $("#grid span").mouseenter(function() {
    pixelText($(this));
  });
  $("#grid span").mouseleave(function() {
    pixelTextClear();
  });
  $("#preview span").mouseenter(function() {
    pixelText($(this));
  });
});