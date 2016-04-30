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
})
