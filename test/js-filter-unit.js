'use strict'

const {expect} = require('chai')

describe('file filter', () => {
  const {onlyJsFiles} = require('../lib/filter')

  it('should filter js files', () => {
    expect(onlyJsFiles('hallo.js')).to.equal.true
  })
  it('should ignore other files', () => {
    expect(onlyJsFiles('hallo')).to.equal.false
    expect(onlyJsFiles('hallo.jjs')).to.equal.false
    expect(onlyJsFiles('hallo.coffee')).to.equal.false
    expect(onlyJsFiles('hallo.json')).to.equal.false
  })
})
