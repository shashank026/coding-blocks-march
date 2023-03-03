const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const articleModel = require('./articles');


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// App Config
const connection_url = 'mongodb+srv://shashankglacs20:Imy3VuAsEolhiagx@cluster0.doew8v2.mongodb.net/?retryWrites=true&w=majority';

// DB Config
const connectToMongo = async () => {
    try {
        mongoose.connect(connection_url, {
            useNewUrlParser: true, useUnifiedTopology: true
        },6000000)
        console.log('mongodb connect');
        return mongoose;
    } catch (error) {
        console.log(error);
    }
}

app.get('/', async function (req, res){
    await connectToMongo();
    articleModel.find((err, docs) => {
        if (!err) {
            res.render('home', {data: docs});
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
    
});

app.get('/add-new-article', function (req, res){
    res.render('add');
});

app.post('/save-article', async (req, res) => {
    let newAddress = new articleModel({
        articleTitle: req.body.title,
        articleDiscriptaion: req.body.discription,
        articleMarkdown: req.body.markdown
    })
    console.log(newAddress);
    // const user = await newAddress.save();
    newAddress.save().then((address) => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
    })
})


const port = 5000;
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port: ${port}`);
});