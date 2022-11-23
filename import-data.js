const mongoose = require('mongoose');
require('dotenv').config()
const { Schema } = mongoose;

//mongoose.connect(process.env.MONGO_URI).then((success)=> console.log("connecté à mongoDB"))

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
        typee: String
    },
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,
});

const Location = mongoose.model('Location', FilmLocationSchema);

const filmingLocations = require('./lieux-de-tournage-a-paris.json');
console.log(filmingLocations.length); // locations bien importées


async function CreationLocation(filmingLocations){
    let chunk = []
    for (const location in filmingLocations){
        const lieu = new Location({
            filmType: filmingLocations[location].fields.type_tournage,
            filmProducerName: filmingLocations[location].fields.nom_producteur,
            endDate: filmingLocations[location].fields.date_fin,
            filmName: filmingLocations[location].fields.nom_tournage,
            district: filmingLocations[location].fields.ardt_lieu,
            geolocation: {
                coordinates: filmingLocations[location].fields.geo_shape.coordinates,
                typee: filmingLocations[location].fields.geo_shape.type
            },
            sourceLocationId: filmingLocations[location].fields.id_lieu,
            filmDirectorName: filmingLocations[location].fields.nom_realisateur,
            address: filmingLocations[location].fields.adresse_lieu,
            startDate: filmingLocations[location].fields.date_debut,
            year: filmingLocations[location].fields.annee_tournage,
        })

        chunk.push(lieu.save())
        if (chunk.length==500){
            await Promise.all(chunk)
            console.log('fait x500')
            chunk = []
        }
    }
    await Promise.all(chunk)
    console.log("dernière boucle envoyée")
}



async function query_id(id){
    return (await Location.findById(id).exec())
}

async function query_filmName(n){
    return(await Location.find({filmName : n}).exec())

}

async function delete_id(id){
    Location.findByIdAndDelete(id)
    return("Supprimé")
}

async function add_loc(loc){
    await loc.save()
    return("Ajoutée")
}

async function main(){
    await mongoose.connect(process.env.MONGO_URI).then((success)=>console.log("connecté"))
    CreationLocation(filmingLocations)
    console.log(await delete_id("6336da1656ec897f6dd7f062"))

}

main()



