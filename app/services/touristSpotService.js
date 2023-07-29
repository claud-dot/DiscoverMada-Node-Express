const TouristSpot = require('./../models/TouristSpot');

const getTouristSpots = async (page ,langue)=>{
    try {
        const limit = 4; 
        const skip = (page - 1) * limit;
        const projection = {
            name: `$name.${langue}`, 
            images: 1,
        };

        const result = await TouristSpot.aggregate([
            {
                $facet: {
                    totalCount: [{ $count: "count" }],
                    paginatedResults: [
                        { $skip: skip },
                        { $limit: limit },
                        { $project: projection },
                    ],
                },
            },
        ]);

        const paginatedResults = result[0].paginatedResults;
        const totalCount = result[0].totalCount[0]?.count || 0; 

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

const getSpotsDetails = async(idSpot , langue)=>{
    try {
        const projection = {
            name : `$name.${langue}` , // Inclure la colonne 'name'
            description :`$description.${langue}`, // Inclure la colonne 'description'
            images : 1 ,
            videos : 1,
            location : 1,
            htmlContent : `$html_content.${langue}` 
        };
        const spot = await TouristSpot.findOne({_id : idSpot} , projection);
        return {
            status : 200,
            data : spot
        }
    } catch (error) {
        return {
            status: 400,
            message: error
        }
    }
}

const searchInTourist = async(searchKeyword , langue)=>{
    try {
        const searchQuery = { 
            $or: [
                { [`name.${langue}`]: { $regex: new RegExp(searchKeyword, 'i') } },
                { [`description.${langue}`]: { $regex: new RegExp(searchKeyword, 'i') } },
                { [`html_content.${langue}`]: { $regex: new RegExp(searchKeyword, 'i') } },
            ],
        };
        const projection = {
            name : `$name.${langue}` , // Inclure la colonne 'name'
            description :`$description.${langue}`, // Inclure la colonne 'description'
            images : 1 ,
            html_content : `$html_content.${langue}` 
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
    getSpotsDetails,
    searchInTourist
}