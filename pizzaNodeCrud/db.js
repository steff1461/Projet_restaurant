const mongoClient = require("mongodb").MongoClient;
const objectID = require("mongodb").ObjectID;
const dbName = "pizzadb";
const url = "mongodb://localhost:27017";
const mongoOptions =  {useNewUrlParser : true};

const state = {
    db : null
}

const connect = (cb) => {
    if (state.db)
        cb();
    else{
        mongoClient.connect(url,{useNewUrlParser : true, useUnifiedTopology: true},(err,client)=>{
            if(err)
                cb(err)
            else {
                state.db = client.db(dbName);
                cb();
            }
        });
    }
}

const getPrimaryKey = (_id)=>{
    return objectID(_id);
}

const getDb = () =>{
    return state.db;
}

module.exports = {getDb,connect,getPrimaryKey};