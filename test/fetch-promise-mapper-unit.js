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
    const fetchStub = sinon.stub().resolves({status: 404})
    putDesignPromises({}, 'myurl', fetchStub, sinon.stub())('mykey')
    expect(fetchStub.firstCall.args[0]).to.equal('myurl/mykey')
  })

  it('should just put the design doc if no version is online', (done) => {
    const fetchStub = sinon.stub()
    const putStub = sinon.stub()
    const mockDesignDoc = {
      mykey: {
        views: ''
      }
    }
    fetchStub.resolves({status: 404})
    putDesignPromises(mockDesignDoc, 'myurl', fetchStub, putStub)('mykey')
    .then(() => {
      expect(putStub.firstCall.args[0]).to.equal('myurl/mykey')
      expect(putStub.firstCall.args[1]).to.equal(mockDesignDoc.mykey)
      done()
    })
  })

  it('should put the latest revision into the design doc if there is any remote doc', (done) => {
    const fetchStub = sinon.stub()
    const putStub = sinon.stub()
    const jsonStub = sinon.stub()
    const mockDesignDoc = {
      mykey: {
        views: ''
      }
    }
    fetchStub.resolves({json: jsonStub, status: 200})
    jsonStub.resolves({
      _id: 'mykey',
      _rev: 'latestRevision'
    })

    putDesignPromises(mockDesignDoc, 'myurl', fetchStub, putStub)('mykey')
    .then(() => {
      expect(putStub.firstCall.args[0]).to.equal('myurl/mykey')
      expect(putStub.firstCall.args[1]).to.have.property('_id', 'mykey')
      expect(putStub.firstCall.args[1]).to.have.property('_rev', 'latestRevision')
      done()
    })
  })
})
