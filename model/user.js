
module.exports={
collection:()=>{
db.createCollection("user", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "name", "email", "password" ],
         properties: {
            name: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            email: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            password: {
               bsonType: "string",
               description: "must be a srting and is required"
            },
            createdAt:{
                bsonType:"date"
            },
            modifiedAt:{
                bsonType:"date"
            }
            // image: {
            //    bsonType: "string",
            //    description: "must be a string and is required"
            // }
         }
      }
   },
   validationLevel:'moderate',
   validationAction:'error'
})
}
}
