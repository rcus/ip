$( document ).ready( function() {
  var url = "http://ipinfo.io/";

  $.get( url + window.location.pathname, function( data ) {
    var location = (data.city ? data.city + ", " : "") + (data.region ? data.region + ", " : ""),
        network = "<a href='" + url + data.org.substr(0, data.org.indexOf(" ")) + "'>" + data.org.substr(data.org.indexOf(" ")+1) + "</a>";

    $( document ).attr( "title", data.ip );
    $( "#header" ).text( data.ip );
    $( ".location" ).text( location );
    $( ".network" ).html( network );
    $( ".hostname" ).text( data.hostname );

    $.get( "js/countries.json", function( c ) {
      $( ".location" ).append( c[data.country] );
    });
  }, "jsonp");

  $( ".toggleAbout" ).click( function() {
    $( "#about" ).fadeToggle();
  });
});