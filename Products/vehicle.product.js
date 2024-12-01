const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema(

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

        model_name: {
            type: String,
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

        vin: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },
    },

{ timestamps: true });

vehicleSchema.index({ vin: 1 }, { unique: true });

const Vehicle = mongoose.model("Vehicles", vehicleSchema);

module.exports = Vehicle;
