if (process.env.NODE_ENV === 'production') {
    module.exports = {
        MongoURI: "here should be url from mlab or any other database"
    }


} else {
    module.exports = {
        MongoURI: "mongodb://localhost:27017/imagetest"
    }


}
