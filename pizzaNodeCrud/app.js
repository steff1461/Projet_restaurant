const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
const db = require("./db");
const ingredient = "ingredient";
const pizza = "pizza";

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})
// read
// read all
app.get("/getingredient",(req,res)=>{
    db.getDb().collection(ingredient).find({isdeleted : false}).toArray((err,documents)=>{
        if (err)
            console.log(err);
        else {
            console.log(documents);
            res.json(documents);
        }
    });
})
// read by id
app.get("/getingredient/:id",(req,res)=>{
    const ingredientId = req.params.id;
    db.getDb().collection(ingredient).findOne({_id: db.getPrimaryKey(ingredientId)}, (err,result)=>{
        if (err)
            console.log(err);
        else {
            console.log(result);
            res.json(result);
        }
    });
});
//create
app.post('/ingredient',(req,res,next)=>{
    // Document to be inserted
    const userInput = req.body;

            db.getDb().collection(ingredient).insertOne(userInput,(err,result)=>{
                if(err){
                    const error = new Error("Failed to insert Todo Document");
                    error.status = 400;
                    next(error);
                }
                else
                    res.json({result : result, document : result.ops[0],msg : "Successfully inserted !!!",error : null});
            });
});

//delete
app.delete('/ingredient/:id',(req,res)=>{
    // Primary Key of ingredient
    const ingredientId = req.params.id;
    // Find Document By ID and delete document from record
    db.getDb().collection(ingredient).findOneAndDelete({_id : db.getPrimaryKey(ingredientId)},(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    });
});

app.put('/ingredient/:id',(req,res)=>{
    // Primary Key of ingredient
    const ingredientId = req.params.id;
    // Find Document By ID and delete document from record
    db.getDb().collection(ingredient).findOneAndUpdate({_id : db.getPrimaryKey(ingredientId)}, {$set :{isdeleted :  false}},
        {returnOriginal : false},(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    });
});


// A ameliorer
app.put('/ingredient/:id', (req,res) =>{
    const ingredientId= req.params.id;
    const userInput = req.body;

    db.getDb().collection(ingredient).findOneAndUpdate({_id : db.getPrimaryKey(ingredientId)},{$set : {test : userInput.test}},
        {returnOriginal : false} , (err,result) =>
        {
            if(err)
                console.log(err);
            else{
                res.json(result);
                console.log(ingredientId);
                console.log(userInput);
            }
        })
})


app.get("/getpizza",(req,res)=>{
    db.getDb().collection(pizza).find({}).toArray((err,documents)=>{
        if (err)
            console.log(err);
        else {
            console.log(documents);
            res.json(documents);
        }
    });
})
app.get("/getpizza/:id",(req,res)=>{
    const pizzaId = req.params.id;
    db.getDb().collection(pizza).findOne({_id: db.getPrimaryKey(pizzaId)}, (err,result)=>{
        if (err)
            console.log(err);
        else {
            console.log(result);
            res.json(result);
        }
    });
});
// connect database

db.connect((err)=>{
    if (err){
        console.log("unable to connect to database");
        process.exit(1);
    }
    else {
        app.listen(3000,()=>{
            console.log("connected to database and listening to port 3000 " + db.getDb().toString())
        });
    }
})