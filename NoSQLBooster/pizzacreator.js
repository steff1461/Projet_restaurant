db.createCollection( "pizza", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "type" , "composition" ],
      properties: {
         type: {
            enum : ["customPizza" , "menu" , "pate", null],
            description: "must be a from enum and is required"
         },
         composition: {
            bsonType : "array",
            description: "must be an array"
         }
      }
   } }
} )