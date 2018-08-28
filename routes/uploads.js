const express = require('express');
const mongoose = require('mongoose')
const multer = require('multer');
const fs = require('fs');


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })



require('../model/Image')
let Image = mongoose.model('image');



router.get('/', (req, res) => [
    res.render('uploads/index')
])
// gallery
router.get('/gallery', (req, res) => {
    Image.find({

    }).then(image => {
        // console.log(image.img.contentType)
        //console.log(image[0].img.data.toString('base64'))
        // res.render('uploads/gallery', {
        //     image: image[0].img.data.toString('base64')
        // })

        // res.setHeader('content-type', image[0].img.contentType);
        let imageArray = []
        let getBuffer = image.forEach(element => {

            imageArray.push(Buffer.from(element.img.data).toString('base64'))
        })

        // var thumb = Buffer.from(element.img.data).toString('base64')

        res.render('uploads/gallery', {
            image: imageArray
        })
        // res.send(image[0].img.data)
    })
})

//uploads
router.post('/', upload.single('img'), (req, res) => {
    const picture = new Image;
    // ({
    //     img: req.file.path
    // })


    picture.img.data = fs.readFileSync(req.file.path);
    picture.img.contentType = req.file.mimetype;
    picture.title = req.file.filename;

    picture.save().then((image) => {
        res.redirect('uploads/gallery')
    })
})

router.delete('/delete/:id', (req, res) => {

    Image.findOne({
        _id: req.params.id
    }).then(image => {
        image.remove();
        fs.unlink(image.img.data, () => {
            console.log('File deleted')
        })
        res.redirect('/uploads/gallery')
    })



})


module.exports = router;