const TouristSpot = require('./../models/TouristSpot');

const getTouristSpots = async (page)=>{
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

const searchInTourist = async(searchKeyword , langue ='fr')=>{
    try {
        const searchQuery = { 
            $or: [
                { [`name.${langue}`]: { $regex: new RegExp(searchKeyword, 'i') } },
                { [`description.${langue}`]: { $regex: new RegExp(searchKeyword, 'i') } },
                { [`html_content.${langue}`]: { $regex: new RegExp(searchKeyword, 'i') } },
            ],
        };
        const valsearch = await TouristSpot.find(searchQuery);
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