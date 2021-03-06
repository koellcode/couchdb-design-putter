'use strict'
const Promise = require('bluebird')
const fetch = require('./fetch-auth')
fetch.Promise = Promise

const jsSuffix = '.js'

const putDesignDoc = (url, designDoc) => {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(designDoc),
    headers: { 'Content-Type': 'application/json' }
  })
}

module.exports = {
  metaData: (file) => {
    const hierarchy = file.split('/')
    const design = hierarchy[hierarchy.length - 3]
    const view = hierarchy[hierarchy.length - 1].slice(0, -jsSuffix.length)

    return {
      design: design,
      view: view,
      map: require(`${process.cwd()}/${file}`).map,
      reduce: require(`${process.cwd()}/${file}`).reduce
    }
  },
  putDesignPromises: (designDocuments, url, _fetch = fetch, _putDesignDoc = putDesignDoc) => {
    return Promise.coroutine(function * (key) {
      const res = yield _fetch(`${url}/${key}`)
      if (res.status === 404) {
        return _putDesignDoc(`${url}/${key}`, designDocuments[key])
      }
      if (res.status === 401) {
        throw new Error('Not Authorizated! Please check your credentials')
      }
      const {_id, _rev} = yield res.json()
      const designDoc = Object.assign(designDocuments[_id], {_id, _rev})
      return _putDesignDoc(`${url}/${_id}`, designDoc)
    })
  }
}
