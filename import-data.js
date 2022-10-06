const mongoose = require('mongoose');
require('dotenv').config()
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI).then((success)=> console.log("connecté à mongoDB"))

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

const filmingLocations = require('./lieux-de-tournage-a-paris.json');
console.log(filmingLocations.length);

function CreationLocation(filmingLocations){
    for (const location in filmingLocations){
        const lieu = new Location({
            filmType: filmingLocations[location].fields.type_tournage,
            filmProducerName: filmingLocations[location].fields.nom_producteur,
            endDate: filmingLocations[location].fields.date_fin,
            filmName: filmingLocations[location].fields.nom_tournage,
            district: filmingLocations[location].fields.ardt_lieu,
            geolocation: {
                coordinates: filmingLocations[location].fields.geo_shape.coordinates,
                type: filmingLocations[location].fields.geo_shape.type
            },
            sourceLocationId: filmingLocations[location].fields.id_lieu,
            filmDirectorName: filmingLocations[location].fields.nom_realisateur,
            address: filmingLocations[location].fields.adresse_lieu,
            startDate: filmingLocations[location].fields.date_debut,
            year: filmingLocations[location].fields.annee_tournage,
        })
    }
}

//CreationLocation(filmingLocations)
