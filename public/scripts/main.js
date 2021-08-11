(function () {
  const url = 'https://json.geoiplookup.io/'
  const el = id => document.getElementById(id)
  const div = inner => {
    const elem = document.createElement('div')
    elem.innerText = inner
    return elem
  }

  window.fetch(url)
    .then(response => response.json())
    .then(({ ip, city, region, country_name: countryName, isp, hostname }) => {
      document.title = ip

      el('top').append(div(ip))

      el('bottom').append(
        div([city, region, countryName].filter(Boolean).join(', ')),
        div(isp),
        div(hostname)
      )
    })
})()
