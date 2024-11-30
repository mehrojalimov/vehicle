const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Vehicle = require('./Products/vehicle.product.js');

const credentials = require('./env.json');

app.use(express.json());

//Add connection string from 4.4 and 4.5 instructions in Readme in env.json, repalcing with your own password and login
const connectionString = `mongodb+srv://${credentials.Username}:${credentials.Password}@vehicleapi.ed7ug.mongodb.net/<your-database-name>?retryWrites=true&w=majority`;


app.get('/vehicle', async (req, res) => {
    try {
        const vehicle = await Vehicle.find({});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/vehicle', async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

});






mongoose.connect(connectionString)
.then(() =>{
    console.log("Connected to database");
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    });
})
