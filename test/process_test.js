const processFile = require('../processFile')

describe('Tests xlsx read function', () => {
    it('expects a passing result', (done) => {
        processFile().then((res) => {
            console.log(res, ' passing result')
            done()
        })
    })
    it('expects an error result', (done) => {
        processFile('lib/tracks_error.xlsx').catch((e) => {
            console.log(e, ' expected failing result, error')
            done()
        })
    })
})