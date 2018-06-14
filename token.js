require('isomorphic-fetch')
require('isomorphic-form-data')

const ini = require('ini')
const fs = require('fs')
const path = require('path')
const { UserSession } = require('@esri/arcgis-rest-auth')

exports.generate = async function (options = {}) {
  let host, username, password

  if (options.password && options.username) {
    username = options.username
    password = options.password
  }

  if (options.host) {
    host = options.host
  }

  const session = new UserSession({
    portal: `${host}/sharing/rest/`,
    username,
    password
  })

  return session.getToken(`${host}/sharing/rest/generateToken`)
}