'use strict'
const {expect} = require('chai')
const sinon = require('sinon')
require('sinon-as-promised')

describe('fetch promise mapper', () => {
  const {putDesignPromises} = require('../lib/mapper')

  it('should return a function', () => {
    expect(putDesignPromises()).to.be.a('function')
  })

  it('should fetch the latest revison of the design doc', () => {
    const fetchStub = sinon.stub()
    putDesignPromises({}, 'myurl', fetchStub.resolves())('mykey')
    expect(fetchStub.firstCall.args[0]).to.equal('myurl/mykey')
  })

  it('should put the latest revision into the design doc', (done) => {
    const fetchStub = sinon.stub()
    const jsonStub = sinon.stub()

    const mockDesignDoc = {
      mykey: {
        views: ''
      }
    }
    fetchStub.resolves({json: jsonStub})
    jsonStub.resolves({
      _id: 'mykey',
      _rev: 'myrev'
    })

    putDesignPromises(mockDesignDoc, 'myurl', fetchStub)('mykey').then(() => {
      expect(mockDesignDoc.mykey).to.have.property('_id', 'mykey')
      expect(mockDesignDoc.mykey).to.have.property('_rev', 'myrev')
      done()
    })
  })

  it('should post the final design doc', () => {
    const fetchStub = sinon.stub()
    const jsonStub = sinon.stub()

    const mockDesignDoc = {
      mykey: {
        views: ''
      }
    }

    const expectedBody = {
      views: '',
      _id: 'mykey',
      _rev: 'myrev'
    }

    fetchStub.resolves({json: jsonStub})
    jsonStub.resolves({
      _id: 'mykey',
      _rev: 'myrev'
    })

    const putPromise = putDesignPromises(mockDesignDoc, 'myurl', fetchStub)('mykey')
    expect(fetchStub.firstCall.args[0]).to.equal('myurl/mykey')

    return putPromise.then((result) => {
      expect(fetchStub.secondCall.args[0]).to.equal('myurl/mykey')
      expect(fetchStub.secondCall.args[1]).to.deep.equal({
        method: 'PUT', body: JSON.stringify(expectedBody)
      })
    })
  })
})
