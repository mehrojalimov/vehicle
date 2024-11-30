const express = require('express');
const mongoose = require('mongoose');
const app = express();

const credentials = require('./env.json');

app.use(express.json());

const connectionString = `mongodb+srv://${credentials.Username}:${credentials.Password}@vehicleapi.ed7ug.mongodb.net/<your-database-name>?retryWrites=true&w=majority`;


//Add that connection string from 4.4 instructions in Readme, then repalce with your own password and login
mongoose.connect(connectionString)
.then(() =>{
    console.log("Connected to database");
    
})


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})