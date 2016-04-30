'use strict'
const jsSuffix = '.js'

module.exports = {
  onlyJsFiles: (file) => file.slice(-jsSuffix.length).indexOf(jsSuffix) !== -1,
  atLeastMapOrReduce: (metaData) => {
    return typeof metaData.map === 'function' || typeof metaData.reduce === 'function'
  }
}
