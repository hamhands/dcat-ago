const fetch = require('node-fetch')
const generateToken = require('./token.js').generate
const args = require('yargs').argv

copy(args).then(console.log).catch(console.error)

async function copy (args) {
  const dcatUrl = `${args.site}/data.json`
  const catalog = await fetch(dcatUrl).then(r => { return r.json() })

  const formatted = catalog.dataset.map(d => {
    return {
      title: d.title,
      url: d.webService,
      description: d.description,
      tags: d.keyword.join(', '),
      type: 'Feature Service'
    }
  })

  const token = await generateToken({ username: args.username, password: args.password, host: args.portal })
  for (const dataset of formatted) {
    await fetch(`${args.portal}/sharing/rest/content/users/${args.username}/addItem?token=${token}&f=json`, {
      body: encodeForm(dataset),
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(r => {
        return r.json()
      })
      .then(console.log)
      .catch(console.error)
  }
}

function encodeForm (form = {}) {
  if (typeof form === 'string') { return form }
  return Object.keys(form).reduce((acc, key) => {
    acc.push([key, form[key]].map(encodeURIComponent).join('='))
    return acc
  }, []).join('&')
}