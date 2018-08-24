var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override')
const multer = require('multer');

var app = express();


app.use('/images', express.static(path.join(__dirname, 'images')))
// routes

const uploads = require('./routes/uploads')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// method override
app.use(methodOverride('_method'))
// connect to database

const db = require('./config/database')
const options = {
    useNewUrlParser: true
}
mongoose.connect(db.MongoURI, options)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => console.log(err));;

// Load model
require('./model/Image')
let Image = mongoose.model('image');




// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.get('/', (req, res) => {
    res.render('index')
})


app.use('/uploads', uploads)

let PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

