'use strict'
const {expect} = require('chai')

describe('meta data mapper', () => {
  const {metaData} = require('../lib/mapper')

  it('should treat ../../ as design name', () => {
    const file = 'test/views/emptyView.js'
    expect(metaData(file)).to.have.property('design', 'test')
  })
})
