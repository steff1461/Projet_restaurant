db.createCollection( "admin", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "email" , "password" ],
      properties: {
         email: {
            bsonType : "string",
            pattern : "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/",
            description: "must be a string and match the regular expression pattern"
         },
         password: {
            bsonType : "string",
            description: "must be a string and is required"
         }

      }
   } }
} )