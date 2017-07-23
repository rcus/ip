(function(){
  var url = '//ipinfo.io/';

  function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }

  jsonp(url, function(data) {
    var location = (data.city ? data.city + ', ' : '') + (data.region ? data.region : ''),
        network = '<a href="' + url + data.org.substr(0, data.org.indexOf(' ')) + '">' + data.org.substr(data.org.indexOf(' ') + 1) + '</a>';

    document.title = data.ip;
    document.querySelector('.ip').innerText = data.ip;
    document.querySelector('.location').innerText = location;
    document.querySelector('.network').innerHTML = network;
    document.querySelector('.hostname').innerText = data.hostname || '';

    var request = new XMLHttpRequest();
    request.open('GET', 'countries.json', true);

    request.onload = function() {
      var country = ', ' + data.country;
      if (request.status >= 200 && request.status < 400) {
        var c = JSON.parse(request.responseText);
        country = ', ' + c[data.country];
      }
      document.querySelector('.location').innerText += country;
    };

    request.send();
  });

  document.querySelector('.about .header').innerText = window.location.hostname;

  [].forEach.call(document.querySelectorAll('.toggle-about'), function(toggler) {
    toggler.addEventListener('click', function() {
      document.querySelector('.about').classList.toggle('hidden');
    });
  });
})();