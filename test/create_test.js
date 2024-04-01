const Track = require('../model/Track')
const assert = require('assert')

describe('creating multiple track documents in mongodb', () => {
    it('creates multiple tracks', (done) => {
        let trackData = [
            {
                title: 'multi test1',
                version: 'multi test1',
                artist: 'multi test1',
                isrc: 'multi test1',
                aliases: ['multi test1'],
                contract: 'multi test1',
            },
            {
                title: 'multi test2',
                version: 'multi test2',
                artist: 'multi test2',
                isrc: 'multi test2',
                aliases: ['multi test2'],
                contract: 'multi test2',
            }
        ]
        Track.insertMany(trackData).then((res) => {
            assert.equal(res.length, 2, )
            done()
        })
    })
})