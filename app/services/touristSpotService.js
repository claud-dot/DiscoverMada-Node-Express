const TouristSpot = require('./../models/TouristSpot');

const getTouristSpots = async (page ,langue ='fr' )=>{
    try {
        const limit = 10; // Nombre de documents par page
        const skip = (page - 1) * limit; // Nombre de documents à sauter pour atteindre la page souhaitée

        const pipeline = [
            { 
                $facet : {
                    totalCount: [
                        {
                            $count: "count",
                        },
                    ],
                    paginatedResults: [
                        {
                            $skip: skip,
                        },
                        {
                            $limit: limit,
                        },
                        {
                            $project: { // Utilisez $project pour spécifier les colonnes à sélectionner
                                [`name.${langue}`] : 1,
                                images: 1,
                                // Ajoutez d'autres colonnes que vous souhaitez inclure dans le résultat ici
                            },
                        },
                    ],
                }   
            }
        ]

        const result = await TouristSpot.aggregate(pipeline);

        // Récupérer les résultats paginés et le nombre total de documents à partir du résultat de l'agrégation
        const paginatedResults = result[0].paginatedResults;
        const totalCount = result[0].totalCount[0]?.count || 0; // Si totalCount est vide, défaut à 0

        return {
            status: 200,
            data: paginatedResults,
            totalCount: totalCount,
        };
    } catch (error) {
        console.log("error" , error);
        return {
            status : 400,
            data : "Error server "+error
        }
    }
}

const getTouristSpotsDetails = async(idSpot , langue ='fr')=>{
    try {
        
        return {
            status : 200,
            data : "valsearch"
        }
    } catch (error) {
        return {
            status: 400,
            message: error
        }
    }
}

const searchInTourist = async(searchKeyword , langue ='fr')=>{
    try {
        const searchQuery = { 
            $or: [
                { [`name.${langue}`]: { $regex: new RegExp(searchKeyword, 'i') } },
                { [`description.${langue}`]: { $regex: new RegExp(searchKeyword, 'i') } },
                { [`html_content.${langue}`]: { $regex: new RegExp(searchKeyword, 'i') } },
            ],
        };
        const projection = {
            [`name.${langue}`] : 1, // Inclure la colonne 'name'
            [`description.${langue}`]: 1, // Inclure la colonne 'description'
            images : 1,
            [`html_content.${langue}`] : 1
        };
        const valsearch = await TouristSpot.find(searchQuery , projection);
        return {
            status : 200,
            data : valsearch
        }
    } catch (error) {
        return {
            status: 400,
            message: error
        }
    }
}



module.exports = {
    getTouristSpots,
    searchInTourist
}