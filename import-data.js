const mongoose = require('mongoose');
require('dotenv').config()
const { Schema } = mongoose;

const FilmLocationSchema = new Schema({
    filmType: String,
    filmProducerName: String,
    endDate: Date,
    filmName: String,
    district: Number,
    geolocation: {
        coordinates: [
            Number
        ],
        type: String
    },
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,
});

const Location = mongoose.model('Location', FilmLocationSchema);


mongoose.connect(process.env.MONGO_URI).then((success)=> console.log("connecté à mongoDB"))
