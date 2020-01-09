db.createCollection( "ingredient", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "name" , "prix","categorie" ],
      properties: {
         name: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         prix: {
            bsonType : "double",
            description: "must be a double and is required"
         }
         categorie : {
             enum : ["pate", "fromage", "sauce", "condiment", "viande", null],
             description : "can only be an enum values , required"
         }
      }
   } }
} )