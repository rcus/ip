(function () {
  const url = 'https://json.geoiplookup.io/'
  const el = tag => document.getElementsByTagName(tag)[0]
  const div = inner => {
    const elem = document.createElement('div')
    elem.innerText = inner
    return elem
  }

  window.fetch(url)
    .then(response => response.json())
    .then(({ ip, city, region, country_name: countryName, isp, hostname }) => {
      document.title = ip

      el('header').append(div(ip))

      el('section').append(
        div([city, region, countryName].filter(Boolean).join(', ')),
        div(isp),
        div(hostname)
      )
    })
})()
