const express = require('express');
const ejs = require("ejs");
const hbs = require("hbs");
const multer = require("multer");

const fs = require('fs');

const app = express();
app.set('view engine', 'ejs');

//defining multer -- storage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = "./uploads";
        //checking if the folder is present or not 
        //if not -- then create a directory
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);                                   // creating folder
        }
        callback(null, dir);
    },

    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }


});

//to upload multiple files -- use name attribute of input field and set values i.e no of files to have uploaded AT A TIME
var uploads = multer({ storage: storage }).array('files', 20);


app.post('/upload', (req, res, next) => {           //next is a middleware

    uploads(req, res, function (err) {
        if (err) {
            res.send("something gone wrong");
        } else res.render('success');
    })


})



app.get('/', (req, res) => {
    res.render('index');
})

app.listen(8000, () => {
    console.log('connection successful')
});