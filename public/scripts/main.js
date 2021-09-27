(function () {
  const url = 'https://json.geoiplookup.io/'
  const el = tag => document.getElementsByTagName(tag)[0]
  const div = (inner, { copyOnClick } = {}) => {
    const elem = document.createElement('div')
    elem.innerText = inner
    if (copyOnClick) {
      elem.classList.add('pointer')
      elem.addEventListener('click', copyToClipboard)
    }
    return elem
  }
  const copyToClipboard = event => {
    const range = document.createRange()
    range.selectNode(event.target)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
  }

  window.fetch(url)
    .then(response => response.json())
    .then(({ ip, city, region, country_name: countryName, isp, hostname }) => {
      document.title = ip

      el('header').append(div(ip, { copyOnClick: true }))

      el('section').append(
        div([city, region, countryName].filter(Boolean).join(', ')),
        div(isp),
        div(hostname)
      )
    })
})()
