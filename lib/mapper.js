'use strict'
const Promise = require('bluebird')
const fetch = require('node-fetch')
fetch.Promise = Promise

const jsSuffix = '.js'

const putDesignDoc = (url, designDoc) => {
  return fetch(url, {
    method: 'PUT', body: JSON.stringify(designDoc)
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
  putDesignPromises: (designDocuments, url, _fetch = fetch, _putDesignDoc = putDesignDoc) => (key) => {
    return _fetch(`${url}/${key}`).then((res) => {
      if (res.status === 404) {
        return _putDesignDoc(`${url}/${key}`, designDocuments[key])
      }
      return res.json().then((json) => {
        const designDoc = designDocuments[json._id]
        designDoc._id = json._id
        designDoc._rev = json._rev
        return _putDesignDoc(`${url}/${json._id}`, designDoc)
      })
    })
  }
}
