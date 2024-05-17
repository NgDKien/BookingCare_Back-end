const express = require('express');
// const cors from 'cors';
const app = express();
// const bodyParser = require('body-parser');
require('dotenv').config(); 
const path = require('path');
const port = 8080;
const configViewEngine = require('./config/viewEngine');
const initWebRoute = require('./route/web');
const connectDB = require ('./config/connectDB');

//config app
// app.use(bodyParser.join());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

connectDB();

// ---------------------------------------------
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// ----------------------------------------------------

configViewEngine(app);
app.use('/', initWebRoute);
app.use('/test', initWebRoute);
app.use('/crud', initWebRoute);
app.use('/post-crud', initWebRoute);
app.use('/get-crud', initWebRoute);


//config file env
app.use(express.static(path.join(__dirname, 'public')));

let gate = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})





