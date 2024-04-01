const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ContractSchema = new Schema({
        name: {type: String, required: true}
    }
)

const Contract = model('Contract', ContractSchema)
module.exports = Contract