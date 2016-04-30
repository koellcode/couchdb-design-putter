'use strict'

const {expect} = require('chai')

describe('map or reduce filter', () => {
  const {atLeastMapOrReduce} = require('../lib/filter')

  it('should filter objects with map functions', () => {
    const mock = {
      map: () => ''
    }
    expect(atLeastMapOrReduce(mock)).to.be.true
  })

  it('should ignore objects with map propertys which are not functions', () => {
    const mock = {
      map: ''
    }
    expect(atLeastMapOrReduce(mock)).to.be.false
  })

  it('should filter objects with reduce functions', () => {
    const mock = {
      reduce: () => ''
    }
    expect(atLeastMapOrReduce(mock)).to.be.true
  })

  it('should ignore objects with reduce propertys which are not functions', () => {
    const mock = {
      reduce: ''
    }
    expect(atLeastMapOrReduce(mock)).to.be.false
  })

  it('should ignore objects with undefined reduce and map property', () => {
    const mock = {
      mock: ''
    }
    expect(atLeastMapOrReduce(mock)).to.be.false
  })

  it('should filter objects with both reduce and map functions', () => {
    const mock = {
      map: () => '',
      reduce: () => ''
    }
    expect(atLeastMapOrReduce(mock)).to.be.true
  })
})
