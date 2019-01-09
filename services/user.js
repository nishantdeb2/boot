
const database = require('../db');
const async = require('async');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const mongooes = require('mongoose');
const JWT  = require('jsonwebtoken');
const secret = 'NeverShareYourSecret';
const jwtDecode = require('jwt-decode');
const constant= require('../constant').errorMessage.eng;
const statuss = require('../constant').successmessage.eng;

module.exports={
  checkmail:async (mail)=>
  {
try{
  //console.log(mail);
     const collection=db.collection('user');
     let mai=await collection.findOne( { 'email':mail} )
     //console.log(mai);
    if(!mai){
      //console.log("new email found");
       return mai
     }
    throw constant.emailExit;

  }
  catch(err)
  {
    throw(err);
  }
  },
  checkmail2:async (mail)=>
  {
try{
  //console.log(mail);
     const collection=db.collection('user');
     let mai=await collection.findOne( { 'email':mail} )
     //console.log(mai);
    if(mai){
      //console.log("new email found");
       return mai
     }
    throw constant.emaildoesExit;

  }
  catch(err)
  {
    throw(err);
  }
  },

  checkid:async (body)=>
  {
try{
  //console.log(id);
   const decoded = jwtDecode(body.headers.token);
  //console.log(decoded);
  let idd=mongooes.Types.ObjectId(decoded.id);
//  console.log(decoded.id);
     const collection=db.collection('user');
     //console.log(idd);
     let mai=await collection.findOne( {_id:idd} )

    //console.log(mai);
    if(mai){
      //console.log("new email found");
       return mai
     }
    throw constant.wrongtoken;

  }
  catch(err)
  {
    throw(err);
  }
  },
  get: async(mail)=>
  {
    try{
      const collection=db.collection('user');
      let data=await collection.findOne( { 'email':mail} )
    //  console.log(a);
    //let b={statuss,a};

   return {status:statuss.status,message:statuss.message,data};
    }
    catch(err)
    {
      throw(err);
    }
  },
  getalll:async(id)=>{
    try{
      const decoded = jwtDecode(id);
    //  console.log(decoded);
      let idd=mongooes.Types.ObjectId(decoded.id);
      //console.log(idd);
    const collection=db.collection('user');
    const job=db.collection('job');
    let a = await collection.aggregate([
      {
          $match:{"_id":idd},
      },
             {
               $lookup:
                 {
                   from: "job",
                   localField: "_id",
                   foreignField: "id",
                   as: "joint"
                 }
            }
          //{  $unwind:"$joint"}
          ]).toArray();
          //console.log(a);
          if(a[0]){
            let data=a[0];
           return {status:statuss.status,message:statuss.message,data}
         }
          throw constant.all
        }
        catch(err)
        {
          throw(err);
        }
  },
  proup:async(body)=>{
    try{
    const collection=db.collection('user');
    let a= await collection.update({email:body.email},{$set :{image:body.image.path}});
    return a
  }
  catch(err)
  {
    throw(err);
  }
  },
  update:async(body)=>{
    try{
    const collection=db.collection('user');
    const decoded = jwtDecode(body.headers.token);
    let pass=body.payload.password;
    let salt = bcrypt.genSaltSync(saltRounds);
    body.payload.password = bcrypt.hashSync(pass, salt);
    //console.log(decoded);
    let idd=mongooes.Types.ObjectId(decoded.id);
    //console.log(idd);
    let a= await collection.update({_id:idd},{$set :{name:body.payload.name,password:body.payload.password,modifiedAt:new Date()}});
    console.log(a);
    let b={status:statuss.status,message:statuss.message,data:{name:body.payload.name,password:body.payload.password,modifiedAt:new Date()}};

   return b;
  }
  catch(err)
  {
    throw(err);
  }
  },
  delete:async(id)=>{
    try{
    const decoded = jwtDecode(id);
    let idd=mongooes.Types.ObjectId(decoded.id);
    const collection=db.collection('user');
    let d=await collection.findOne({_id:idd});
    let a= await collection.remove({_id:idd});

    //console.log(d);
    let b={status:statuss.status,message:statuss.message,data:{email:d.email,name:d.name,action:"deleted"}};

   return b;
  }
  catch(err)
  {
    throw(err);
  }
  },
  checkpass:async (body)=>
  {
    try{
    const collection=db.collection('user');
    let data=await collection.findOne( { email:body.email} );
    //console.log(body.password);
    let a=bcrypt.compareSync(body.password,data.password);
    //console.log(a);
     if(a){
     const token =  await JWT.sign({id:data._id}, secret);
     // console.log(token);
    return {status:statuss.status,message:statuss.message,data:{email:data.email,name:data.name,token}};
     }
    throw constant.password;
  }
  catch(err)
  {
    throw(err);
  }
  },
  checkpass2:async (body)=>
  {
    try{
    let pass=body.payload.password;
    let tokn=body.headers.token;
    const decoded = jwtDecode(tokn);
    let idd=mongooes.Types.ObjectId(decoded.id);
    const collection=db.collection('user');
    let data=await collection.findOne({_id:idd});
    let a=bcrypt.compareSync(data.password, pass);
    if (a)
     return a

    throw constant.password;
  }
  catch(err)
  {
    throw(err);
  }
  },
  adddata:async (data)=>
  { try{
    let pass=data.password;
    let salt = bcrypt.genSaltSync(saltRounds);
    data.password = bcrypt.hashSync(pass, salt);
    const collection=db.collection('user');
       let a=await collection.insertOne({name:data.name,email:data.email,password:data.password,createdAt:new Date()});

      let b={status:statuss.status,message:statuss.message,data:{emailid:a.ops[0].email,name:a.ops[0].name,createdAt:new Date()}};

     return b;
    }
    catch(err)
    {
      throw(err);
    }
  }
}
