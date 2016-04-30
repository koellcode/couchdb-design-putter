'use strict'
const Promise = require('bluebird')
const fetch = require('node-fetch')
fetch.Promise = Promise

const jsSuffix = '.js'

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
  putDesignPromises: (designDocuments, url) => (key) => {
    return fetch(`${url}/${key}`)
      .then((res) => res.json())
      .then((json) => {
        const design = designDocuments[json._id]
        design._id = json._id
        design._rev = json._rev
        return fetch(`${url}/${json._id}`, {
          method: 'PUT', body: JSON.stringify(design)
        })
      })
  }
}
