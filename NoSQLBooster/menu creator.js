db.createCollection( "menu", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "name" , "composition" ],
      properties: {
         name: {
            bsonType : "string",
            description: "must be a string and is required"
         },
         composition: {
            bsonType : "array",
            description: "must be an array"
         }
      }
   } }
} )