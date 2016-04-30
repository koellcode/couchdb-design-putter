'use strict'
const {expect} = require('chai')

describe('file filter', () => {
  const {onlyJsFiles} = require('../lib/filter')

  it('should filter js files', () => {
    expect(onlyJsFiles('hallo.js')).to.be.true
  })
  it('should ignore other files', () => {
    expect(onlyJsFiles('hallo')).to.be.false
    expect(onlyJsFiles('hallo.jjs')).to.be.false
    expect(onlyJsFiles('hallo.coffee')).to.be.false
    expect(onlyJsFiles('hallo.json')).to.be.false
  })
})
