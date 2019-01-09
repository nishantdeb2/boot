const Boom = require('boom')

module.exports = {
    //version: "/v1",

    errorMessage: {
        eng: {
            emailExit: Boom.conflict("Email already exist"),
            emaildoesExit: Boom.conflict("Email dont exist"),
            password: Boom.expectationFailed(" wrong Password ."),
            all: Boom.conflict("id dont exist"),
            wrongtoken:Boom.conflict('authintication failled'),
            wrongtask:Boom.conflict('item does exists'),
            multitaks:Boom.conflict("multiple task input"),
            job:Boom.conflict("no such job"),
            add:Boom.conflict("no such address for the job"),
            multiadd:Boom.conflict("multiple address input")


        }
    },
    successmessage:{
      eng:{
         status:200,
         message:"success"
      }

    }

}
