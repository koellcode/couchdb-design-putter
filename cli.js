#!/usr/bin/env node
'use strict'
const program = require('commander')
const glob = require('glob')

const {generateDesignDocuments, putDesignDocuments} = require('./lib')

program
  .version('0.0.1')
  .option('-s, --start', 'start the import')
  .option('-d, --design [glob]', 'clobbing pattern (default: **/views/*.js) [glob]', '**/views/*.js')
  .option('-b, --bucket [url]', 'bucket url (default: http://localhost:5984/default) [url]', 'http://localhost:5984/default')
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

if (program.start) {
  // options is optional
  glob(program.design, (err, listOfFilenames) => {
    if (err) return
    if (listOfFilenames.length === 0) return console.log('no views found.')

    putDesignDocuments(generateDesignDocuments(listOfFilenames), program.bucket)
    .then((results) => {
      results.forEach((result) => console.log(result.url, result.statusText))
    })
  })
}
