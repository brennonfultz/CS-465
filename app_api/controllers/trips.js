const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');

//GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) //No filter, return all records
        .exec();

        //uncomment to show results of query
        //console.log(q);

    if(!q)
    { //Databse returned no data
        return res
                .status(404)
                .json(err);    
    } else { //return results
        return res
            .status(200)
            .json(q);
    }
};

//GET: /trips/:tripCode - lists single trip
// Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) //No filter, return all records
        .exec();

        //uncomment to show results of query
        //console.log(q);

    if(!q)
    { //Databse returned no data
        return res
                .status(404)
                .json(err);    
    } else { //return results
        return res
            .status(200)
            .json(q);
    }
};

//POST: /trips - adds single new trip
// Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q)
        {//databse returned no data
            return res
                .status(400)
                .json(err);    
        } else { //return results
        return res
            .status(201)
            .json(q);
        }
    //uncomment to show results
        //console.log(q);

};

// PUT: /trips/:tripCode - Updates an existing Trip
// Regardless of outcome, response must include an HTTP status code
// and a JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    
        const q = await Model
            .findOneAndUpdate(
                {'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
            )
            .exec();

        if(!q) { // Database returned no data
            return res
                .status(400)
                .json(err);
        } else { // Return the updated trip
            return res
                .status(201) 
                .json(q);
        }

    // Uncomment the following line to show results of the operation in the console
    // console.log(q);
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};