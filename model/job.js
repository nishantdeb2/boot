
module.exports={
collection:()=>{
db.createCollection("job", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "item", "user_id", "quantity","email" ],
         properties: {
            item: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            user_id: {
               bsonType: "objectId",
               description: "must be a object and is required"
            },
            quantity: {
               bsonType: "string",
               description: "must be a srting and is required"
            },
            
            email:{
              bsonType: "string",
              description: "must be a srting and is required"
            },
            createdAt:{
                bsonType:"date"
            },
            modifiedAt:{
                bsonType:"date"
            }
         }
      }
   },
   validationLevel:'moderate',
   validationAction:'error'
})
}
}
