const express = require('express');

const app = express();
const cors = require('cors');

require('dotenv').config({path:"./config.env"});
const port = process.env.PORT || 5000;

//use midleware
app.use(cors());
app.use(express.json());


//mongodb connection
const con = require('./db/connection');


// using routes
app.use(require('./routes/route'));

con.then(db => {
    if(!db) return process.exit(1);

    app.listen(port,() => {
        console.log(`Server is runinng:http://localhost:${port}`)
    });

    app.on('error', err => console.log(`Failed to connect with HTTP server:${err}`));
}).catch(error =>{
    console.log(`Connection Faild..!${error}`)
});



