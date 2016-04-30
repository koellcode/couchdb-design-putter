'use strict'
const {expect} = require('chai')

describe('meta data mapper', () => {
  const {metaData} = require('../lib/mapper')

  it('should treat ../../ as design name', () => {
    const file = 'test/views/sampleView.js'
    expect(metaData(file)).to.have.property('design', 'test')
  })

  it('should treat current file name as view name', () => {
    const file = 'test/views/sampleView.js'
    expect(metaData(file)).to.have.property('view', 'sampleView')
  })

  it('should require the file and import the map function', () => {
    const file = 'test/views/sampleView.js'
    const expectedMapFunc = require('./views/sampleView').map
    expect(metaData(file)).to.have.property('map', expectedMapFunc)
  })

  it('should require the file and import the reduce function', () => {
    const file = 'test/views/sampleView.js'
    const expectedReduceFunc = require('./views/sampleView').reduce
    expect(metaData(file)).to.have.property('reduce', expectedReduceFunc)
  })
})
