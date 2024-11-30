const { type } = require("os");

const mongoose = reqire('mongoose');

const VehicleSchema = mongoose.Schema(

    {
        manufacturer_name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        horse_power: {
            type: Number,
            required: true,
        },

        model_year: {
            type: Number,
            required: true,
        },

        purchase_price: {
            type: Number,
            required: true,
        },
        
        fuel_type: {
            type: String,
            required: true,
        },

        VIN: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        }
    }
);

const Vehicle = mongoose.model("Vehicles", VehicleSchema);

module.exports = Product;
