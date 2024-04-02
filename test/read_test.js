const Track = require('../model/Track')
const Contract = require('../model/Contract')
const assert = require('assert')

describe('reading existing documents from db', () => {
    it('reads track with title', (done) => {
        Track.find({
            title: 'Track 1'
        })
            .exec()
            .then((res) => {
                if (res?.length && res[0]._id) {
                    console.log(res[0], ' result found, success')
                    assert.equal(res[0].title, 'Track 1')
                    done()
                }
            })
    })
    it('reads contract with name', (done) => {
        Contract.find({
            name: 'Contract 1'
        })
            .exec()
            .then((res) => {
                if (res?.length && res[0]._id) {
                    console.log(res[0], ' result found, success')
                    assert.equal(res[0].name, 'Contract 1')
                    done()
                }
            })
    })
})