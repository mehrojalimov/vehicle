const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();


app.use(express.json());

//Add that connection string from 4.4 instructions in Readme, then repalce with your own password and login
mongoose.connect("mongodb+srv://<db_username>:<db_password>@vehicleapi.ed7ug.mongodb.net/?retryWrites=true&w=majority&appName=VehicleAPI")
.then(() =>{
    console.log("Connected to database");
    
})


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})