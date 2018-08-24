if (process.env.NODE_ENV === 'production') {
    module.exports = {
        MongoURI: "mongodb://tcadmin:Tconline993@ds119572.mlab.com:19572/tc-online-prod"
    }


} else {
    module.exports = {
        MongoURI: "mongodb://localhost:27017/imagetest"
    }


}