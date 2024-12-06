const express = require('express');
const mongoose = require('mongoose');
const Vehicle = require('./Products/vehicle.product.js');
const Joi = require('joi');

const app = express();


const credentials = require('./env.json');

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: "Invalid JSON format" });
    }
    next();
});

//Add connection string from 4.4 and 4.5 instructions in Readme in env.json, repalcing with your own password and login
const connectionString = `mongodb+srv://${credentials.Username}:${credentials.Password}@vehicleapi.ed7ug.mongodb.net/Vehicles?retryWrites=true&w=majority`;


const vehicleValidationSchema = Joi.object({
    manufacturer_name: Joi.string().required(),
    description: Joi.string().required(),
    horse_power: Joi.number().required(),
    model_name: Joi.string().required(),
    model_year: Joi.number().integer().required(),
    purchase_price: Joi.number().positive().required(),
    fuel_type: Joi.string().required(),
    vin: Joi.string().required().uppercase(),
    color: Joi.string().required(),
    sold: Joi.string().required(),
});

app.get('/vehicle', async (req, res) => {
    try {
        const vehicle = await Vehicle.find({});
        res.status(200).json(vehicle);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(422).json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({message: error.message});
    }
})

app.post('/vehicle', async (req, res) => {
    const { error, value } = vehicleValidationSchema.validate(req.body);

    if (error) {
        return res.status(422).json({ message: "Invalid request data", details: error.details });
    }

    try {
        const vehicle = await Vehicle.create(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(422).json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({message: error.message});
    }

});

app.get('/vehicle/:vin', async (req, res) =>{
    try {
        const { vin } = req.params;    
        const vehicle = await Vehicle.findOne({vin: vin.toUpperCase()});

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.status(200).json(vehicle);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


app.get('/sold', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({"sold": "Yes"});
        
        if (vehicles.length === 0) {
            return res.status(404).json({ message: "No sold vehicles found" });
        }

        res.status(200).json(vehicles);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.put('/vehicle/:vin', async (req, res) =>{
    try {
        const { vin } = req.params; 
        const vehicle = await Vehicle.findOneAndUpdate({vin: vin.toUpperCase()}, req.body);

        if(!vehicle){
            return res.status(404).json({message: "Vehicle not found"});
        }

        const updatedVehicle = await Vehicle.findOne({vin: vin.toUpperCase()});
        res.status(200).json(updatedVehicle);

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(422).json({ message: "Validation error", errors: error.errors });
        }
        res.status(500).json({message: error.message});
    }
});


app.delete('/vehicle/:vin', async (req, res) => {
    try {
        const { vin } = req.params;

        const vehicle = await Vehicle.findOneAndDelete({vin: vin.toUpperCase()});
        if(!vehicle){
            return res.status(404).json({message: "Vehicle not found"});
        }

        res.status(204).send();

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
.catch((error) => {
    console.error("Database connection failed:", error.message);
});


module.exports = app;