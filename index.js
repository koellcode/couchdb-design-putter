#!/usr/bin/env node
'use strict'
const program = require('commander')
const glob = require('glob')

const {generateDesignDocuments, putDesignDocuments} = require('./lib')

program
  .version('0.0.1')
  .option('-d, --design [glob]', 'clobbing pattern (default: **/views/*.js) [glob]', '**/views/*.js')
  .parse(process.argv)

// options is optional
glob(program.design, (err, listOfFilenames) => {
  if (err) return
  if (listOfFilenames.length === 0) return console.log('no views found.')

  putDesignDocuments(generateDesignDocuments(listOfFilenames)).then((results) => {
    results.forEach((result) => console.log(result.url, result.statusText))
  })
})
