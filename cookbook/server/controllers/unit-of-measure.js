const dbConn =require('../db/conn')
const ObjectId = require("mongodb").ObjectId;

//console.log("obtaining connection...");

const _db = dbConn.getDb()
const _collection = _db.db("cookbook").collection("unitsOfMeasure");

const getAll = async function(req, res, next) {
    try {
        // console.log("getting all documents")
        const allDocs = await _collection.find().toArray();
        // console.log(`${allDocs.length} documents returned.`);
        res.json(allDocs)
        //res.json([]);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getById = async function(req, res, next) { 
    try {
        const query = { _id : ObjectId(req.params.unitId) };
        const doc = await _collection.findOne(query);
        res.json(doc)
    }
   catch (err){
       res.status(500).json(err);
   }
}

const createUnitOfMeasure = async function(req, res, next) {
    try {
        //console.log("querying by Id");
        //console.log(req.body);
        const newUnit = req.body;
        const result = await _collection.insertOne(newUnit);
        //console.log(result)
        //console.log(`Document returned with _id: ${result.insertedId}`);
    
        // returning status and result
        res.status(201);
        res.json({ id: result.insertedId });
        //res.json({ id: "-1" });
    }
    catch (err){
        res.status(500).json(err);
    }
}


const updateUnitofMeasure = async function(req, res, next) {
    try {
        const query = { _id : ObjectId(req.params.unitId) };
        const unit = req.body;
        const updateDoc= { $set : {} } ;
        for (const prop in unit) {
            if (Object.hasOwnProperty.call(unit, prop)) {
                updateDoc["$set"][prop] = unit[prop];
            }
        }
        //console.log(updateDoc);
        const result = await _collection.updateOne(query, updateDoc);
        //console.log(result)
        //console.log(`${result.matchedCount} documents returned.`);
        res.status(204);
        res.json({ updatedCount: result.matchedCount})
    }
    catch (err){
        res.status(500).json(err);
    }
}


const deleteById = async function(req, res, next) {
    try {
        //console.log("deleting by Id");
        const query = { _id : ObjectId(req.params.unitId) };
        const result = await _collection.deleteOne(query);
        //console.log(`${result.deletedCount} documents deleted.`);
    
        res.status(200);
        res.json({ deletedCount : result.deletedCount });
    }
    catch (err){
        res.status(500).json(err);
    }
}
module.exports = { getAll, getById, createUnitOfMeasure, deleteById, updateUnitofMeasure }