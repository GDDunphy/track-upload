const mongoose = require('mongoose')
const Contract = require("../model/Contract")
const Track = require("../model/Track");
mongoose.Promise = global.Promise;

before(done => {
    mongoose.connect("mongodb+srv://hughdunphy93:" + process.env.MONGODB_PASSWORD + "@cluster0.j08ogtf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    mongoose.connection
        .once("open", () => {
            console.log('CONNECTION ESTABLISHED')
            done()
        })
        .on("error", error => {
            console.warn("ISSUE CONNECTING TO DB", error)
        });
});
