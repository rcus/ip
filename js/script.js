$( document ).ready( function() {
  $.get( "http://ipinfo.io", function( data ) {
    $( document ).attr( "title", data.ip );
    $( "#header" ).text( data.ip );
    $( ".location" ).text( data.city + ", " + data.region + ", " + data.country );
    $( ".network" ).text( data.org );
    $( ".hostname" ).text( data.hostname );
  }, "jsonp");

  $( ".toggleAbout" ).click( function() {
    $( "#about" ).toggle();
  });
});