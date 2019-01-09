const Joi = require('joi');
const path = require('path');

const JWT         = require('jsonwebtoken');
//const fs = require('fs');
const secret = 'NeverShareYourSecret';
const control = require('../control');

module.exports=[

{   method: 'POST',
    path: '/register',
    config: {

          validate: {
            payload:{
              name:Joi.string().required(),
              email:Joi.string().required(),
              password:Joi.string().required(),
              image:Joi.string()

            }
              },
        },
        handler: function (request, h){
        try{
          let a=  control.user.register(request.payload);
            return a
          }
          catch(err)
          {
          throw(err);
          }
          }
},
// {
//   method: 'PUT',
//   path: '/profile',
//   config: {
//     handler: (request, h) => {
//       const payload = request.payload
//
//       console.log(payload.image.path);
//
//       return control.user.proupdate(payload)
//     },
//     payload: {
//       maxBytes: 209715200,
//       output: 'file',
//       parse: true,
//       uploads:'./uploads',
//       email:Joi.string().required()
//     //  path:__dirname+"/uploads"
//     }
//   }
  // config: {
  //
  //       payload: {
  //           output: 'stream',
  //           parse: true,
  //           maxBytes: 209715200
  //           //allow: 'multipart/form-data'
  //       },
  //
  //       handler: function (request, reply) {
  //           var data = request.payload;
  //           if (data.file) {
  //               var name = data.file.hapi.filename;
  //               var path = __dirname + "/uploads/" + name;
  //               var file = fs.createWriteStream(path);
  //
  //               file.on('error', function (err) {
  //                   console.error(err)
  //               });
  //
  //               data.file.pipe(file);
  //
  //               data.file.on('end', function (err) {
  //                   var ret = {
  //                       filename: data.file.hapi.filename,
  //                       headers: data.file.hapi.headers
  //                   }
  //                   reply (JSON.stringify(ret));
  //               })
  //           }
  //           console.log(request.payload);
  //       return "uploaded"
  //       }
  //   }

//},
{
  method: 'GET',
  path:'/getall',
  // config:{
  //   validate:{
  //     params:{
  //       id:Joi.string().required()
  //     }
  //   },
  // },
  handler: function(request,h){
try{
  JWT.verify(request.headers.token, secret);

    return control.user.getalll(request.headers.token)
  }
  catch(err)
  {
  //  console.log(err);
    throw(err);
  }
}
},
{   method: 'PUT',
    path: '/update',
    config: {
        //  auth :'jwt',
          validate: {
            payload:{
              name:Joi.string().required(),
              //email:Joi.string().required(),
              password:Joi.string().required()
            //  h:Joi.string().required()
              //tokn:Joi.string().required()

            }
              },
        },
        handler: function (request, h){
    try {
            //console.log(request.payload.h);
            // let decoded = jwtDecode(request.payload.h);
            // if(decoded.email==request.payload.email){
            JWT.verify(request.headers.token, secret);
            let a =control.user.update(request);
            return a;


}
catch(err)
{
  throw(err);
}
          }
},
{   method: 'DELETE',
    path: '/delete',
    config: {

          validate: {
            payload:{
              password:Joi.string().required(),
              }
              },
        },
        handler: function (request, h){
          try{
            //console.log(request.headers);
            JWT.verify(request.headers.token, secret);
            let a=  control.user.delete(request);
            return a
}
catch(err)
{
throw (err);
}
          }
},
// {   method: 'GET',
//     path: '/get/{email}',
//     config: {
//
//           validate: {
//             params:{
//               email:Joi.string().required(),
//               }
//               },
//         },
//         handler: function (request, h){
//           try{
//             //console.log(request.params.email);
//             return control.user.get(request.params.email);
// }
// catch(err)
// {
// throw(err);
// }
//           }
// },
{
 method:'POST',
 path:"/login",
 config:{
   validate:{
     payload:{
       email:Joi.string().required(),
       password:Joi.string().required()
     },
   }
 },

 handler:(request,h)=>{
try {
   return control.user.login(request.payload);
 }
 catch(err)
 {
   throw(err);
 }
}
}
]
