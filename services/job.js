const database = require('../db');
const async = require('async');
const mongooes = require('mongoose');
const JWT  = require('jsonwebtoken');
const secret = 'NeverShareYourSecret';
const jwtDecode = require('jwt-decode');
const constant= require('../constant').errorMessage.eng;
const statuss = require('../constant').successmessage.eng;
module.exports={
  checkid:async (id)=>
  {
try{
  //console.log(id);
   const decoded = jwtDecode(id);
  //console.log(decoded);
  let idd=mongooes.Types.ObjectId(decoded.id);
     const collection=db.collection('user');
     let mai=await collection.findOne( { '_id':idd} )
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
  checkjob:async (body)=>
    {
  try{
    //console.log(id);
    //console.log(body.headers.id);
     const decoded = jwtDecode(body.headers.token);

    //console.log(decoded.id);
    let idd=mongooes.Types.ObjectId(decoded.id);
    //console.log(idd);
       const collection=db.collection('job');
       //console.log(idd);
      //console.log(body.payload.item);
       let mai=await collection.findOne( { user_id:idd,item:body.payload.item} );
      // console.log(mai);
      if(!mai){
        //console.log("new email found");
         return mai
       }
      throw constant.multitaks;

    }
    catch(err)
    {
      throw(err);
    }
    },

  update:async(body)=>{
    try{
    const decoded = jwtDecode(body.headers.token);
    const collection=db.collection('job');
    let idd=mongooes.Types.ObjectId(decoded.id);
    let a= await collection.update({user_id:idd,item:body.payload.item},{$set :{quantity:body.payload.quantity,price:body.payload.price,modifiedAt:new Date()}});
    return {status:statuss.status,message:statuss.message,data:{item:body.payload.item,price:body.payload.price,quantity:body.payload.quantity}}
  }
  catch(err)
  {
    throw(err);
  }
  },
  delete:async(body)=>{
    try{
    const decoded = jwtDecode(body.headers.token);
    let idd=mongooes.Types.ObjectId(decoded.id);
    const collection=db.collection('job');

    let a= await collection.remove({user_id:idd,item:body.payload.item},{w:1});
    //console.log(a);
    if(a.result.n)
    return {status:statuss.status,message:statuss.message,data:{item:body.payload.item,action:"deleted"}}
    throw constant.job;

  }
  catch(err)
  {
    throw(err);
  }
  },

  adddata:async (body)=>
  {
    try{
      console.log(body);
      const decoded = jwtDecode(body.headers.id);
      let idd=mongooes.Types.ObjectId(decoded.id);
    //console.log(idd);
    const collection=db.collection('job');
    let a=await  collection.insert({item:body.payload.item,user_id:idd,quantity:body.payload.quantity,address:body.payload.address,price:body.payload.price,createdAt:new Date()});
    if(a) {const token =  await JWT.sign({id:a._id}, secret);
    let ab={status:statuss.status,message:statuss.message,data:a.ops[0],token:token}
      return ab;
    }
    }
    catch(err)
    {
      throw(err);
    }
  }
}
