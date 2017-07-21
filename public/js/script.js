(function(){
  var url = "//ipinfo.io/";

  $.get( url, function( data ) {
    var location = (data.city ? data.city + ", " : "") + (data.region ? data.region + ", " : ""),
        network = "<a href='" + url + data.org.substr(0, data.org.indexOf(" ")) + "'>" + data.org.substr(data.org.indexOf(" ")+1) + "</a>";

    $( document ).attr( "title", data.ip );
    $( ".ip" ).text( data.ip );
    $( ".location" ).text( location );
    $( ".network" ).html( network );
    $( ".hostname" ).text( data.hostname );

    $.get( "countries.json", function( c ) {
      $( ".location" ).append( c[data.country] );
    });
  }, "jsonp");

  document.querySelector('.about .header').innerText = window.location.hostname;

  [].forEach.call(document.querySelectorAll('.toggle-about'), function(toggler) {
    toggler.addEventListener('click', function() {
      document.querySelector('.about').classList.toggle('hidden');
    });
  });
})();