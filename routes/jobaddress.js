const Joi = require('joi');

const control = require('../control');
const JWT         = require('jsonwebtoken');
const secret = 'NeverShareYourSecret';
module.exports=[
  {
    method:'POST',
    path:'/addaddress',
    config:{
      validate:{
        address:Joi.string().required()
      },
      handler:function(request,responce){
        try{
            JWT.verify(request.headers.token, secret);
            return control.jobaddress.addaddress(request);
        }catch(err)
        {
          throw (err);
        }
      }
    }
  },
  {
  mothod:'PUT',
  path:'/updateaddress',
  config:{
    validate:{
      address:Joi.string().required()
    },
    handler:(request,responce)=>{
      try{
      JWT.verify(request.headers.token, secret);
      return control.jobaddress.updateaddress(request);
    }
    catch(err)
    {
      throw(err);
    }
    }
  }
},
{   method: 'DELETE',
    path: '/deletejob',
    config: {

          validate: {
            payload:{
              //id:Joi.string().required(),
              address:Joi.string().required()
              }
              },
        },
        handler: function (request, h){
            //console.log(request.payload.emai);
            try{
              JWT.verify(request.headers.token, secret);
            return control.jobaddress.delete(request);
          }
          catch(err)
          {
          throw(err);
          }
          }
}
]
