
module.exports={
collection:()=>{
db.createCollection("job", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "job_id","address", ],
         properties: {
            job_id: {
               bsonType: "objectId",
               description: "must be a object and is required"
            },
            address:{
               bsonType:"string",
               description:"must be a string and is required"
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
