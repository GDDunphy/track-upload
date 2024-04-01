const mongoose = require('mongoose')
const Contract = require("./model/Contract")
const processFile = require('./processFile')
const Track = require("./model/Track");
mongoose.connect("mongodb+srv://hughdunphy93:" + process.env.MONGODB_PASSWORD + "@cluster0.j08ogtf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
mongoose.Promise = global.Promise;

async function run() {

    try {
        let processedData = await processFile()
        console.log(processedData, ' processed data')
        if (processedData) {
            try {
                let createRes = await Track.insertMany(processedData)
                console.log(createRes, ' tracks inserted successfully')
            } catch (e) {
                console.log(e, ' error caught during upload to mongodb')
            }
        }
    } catch (e) {
        console.log(e, ' errors found in file')
    } finally {
        console.log('closing connection')
        mongoose.connection.close()
    }
}

run().catch(console.dir);