const Promise = require('bluebird')
const {onlyJsFiles, atLeastMapOrReduce} = require('./filter')
const {metaData, putDesignPromises} = require('./mapper')
const {designDocReducer} = require('./reducer')

module.exports = {
  generateDesignDocuments: (
    _listOfFilenames = [],
    _fileFilter = onlyJsFiles,
    _metaData = metaData,
    _funcFilter = atLeastMapOrReduce,
    _designDocReducer = designDocReducer
  ) => {
    return _listOfFilenames
        .filter(_fileFilter)
        .map(_metaData)
        .filter(_funcFilter)
        .reduce(_designDocReducer, {})
  },
  putDesignDocuments: (designDocuments = {}, url = 'http://localhost:5984/default') => {
    const savedDocumentPromises = Object
      .keys(designDocuments)
      .map(putDesignPromises(designDocuments, url))

    return Promise.all(savedDocumentPromises)
  }
}
