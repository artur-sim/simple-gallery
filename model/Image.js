const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String

    },
    title: {
        type: String
    }
})

mongoose.model('image', ImageSchema);