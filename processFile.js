const XLSX = require('xlsx')
const Track = require("./model/Track");
const Contract = require("./model/Contract");
const config = require('./config.json')

function processISRC(input) {
    input.replace(/[^0-9a-z]/gi, '')
    return input
}

function generateAliasArray(string) {
    let result = string.split(';')
    return result;
}

async function checkErrors(track) {
    let issues = []
    if (!track.title) issues.push('Missing title')
    if (!track.version) issues.push('Missing version')
    if (!track.artist) issues.push('Missing artist')
    if (!track.isrc) issues.push('Missing isrc')
    if (!track.aliases || !track.aliases.length) issues.push('Missing aliases')
    if (track.contract) {
        let contract = await Contract.find({name: track.contract})
        if (contract.length) {
            track.contractId = contract[0]._id
        } else {
            issues.push(`Contract with name '${track.contract}' cannot be found`)
        }
    }
    return [track, issues]
}

async function processFile() {
    const workbook = XLSX.readFile(config.path_to_file);
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
    });
    let processedData = [], totalErrors = {}
    for (const [index, row] of Object.entries(xlData)) {
        let track = {
            title: row.Title,
            version: row.Version,
            artist: row.Artist,
            isrc: processISRC(row.ISRC),
            aliases: generateAliasArray(row.Aliases),
            contract: row.Contract
        }
        let existingTrackResults = await Track.find({
            title: row.Title,
        }).exec()
        if (existingTrackResults.length) {
            track.ID = existingTrackResults[0]._id
        }
        let errorRes = await checkErrors(track)
        let processedTrack = errorRes[0]
        processedData.push(processedTrack)
        let errors = errorRes[1]
        let line = parseInt(index) + config.first_line
        if (errors.length) totalErrors[line] = errors
    }
    if (Object.keys(totalErrors).length) {
        return Promise.reject(totalErrors)
    } else {
        return Promise.resolve(processedData)
    }
}

module.exports = processFile