(function () {
  'use strict';
  var url = 'https://json.geoiplookup.io/',
    request = new XMLHttpRequest();

  request.open('GET', url, true);

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response),
        location = [data.city, data.region, data.country_name]
          .filter(Boolean)
          .join(', '),
        hostname = (data.hostname !== data.ip && data.hostname) || '';

      document.title = data.ip;
      document.querySelector('.ip').innerText = data.ip;
      document.querySelector('.location').innerText = location;
      document.querySelector('.network').innerText = data.isp;
      document.querySelector('.hostname').innerText = hostname;

    }
  };

  request.send();

  document.querySelector('.about .header').innerText = window.location.hostname;

  [].forEach.call(document.querySelectorAll('.toggle-about'), function (toggler) {
    toggler.addEventListener('click', function () {
      document.querySelector('.about').classList.toggle('hidden');
    });
  });
})();