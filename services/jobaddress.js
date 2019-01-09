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
     const collection=db.collection('job');
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
  checkadd:async (body)=>
    {
  try{
    //console.log(id);
    //console.log(body.headers.id);
     const decoded = jwtDecode(body.headers.token);

    //console.log(decoded.id);
    let idd=mongooes.Types.ObjectId(decoded.id);
    //console.log(idd);
       const collection=db.collection('jobaddress');
       //console.log(idd);
      //console.log(body.payload.item);
       let mai=await collection.findOne( { job_id:idd,address:body.payload.address} );
      // console.log(mai);
      if(!mai){
        //console.log("new email found");
         return mai
       }
      throw constant.multiadd;

    }
    catch(err)
    {
      throw(err);
    }
    },
    update:async(body)=>{
      try{
      const decoded = jwtDecode(body.headers.token);
      const collection=db.collection('jobaddress');
      let idd=mongooes.Types.ObjectId(decoded.id);
      let a= await collection.update({job_id:idd,address:body.payload.address},{$set :{address:body.payload.address,modifiedAt:new Date()}});
      return {status:statuss.status,message:statuss.message,data:{address:body.payload.address}}
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
      const collection=db.collection('jobaddress');

      let a= await collection.remove({job_id:idd,address:body.payload.address},{w:1});
      //console.log(a);
      if(a.result.n)
      return {status:statuss.status,message:statuss.message,data:{address:body.payload.address,action:"deleted"}}
      throw constant.add;

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
      const collection=db.collection('jobaddress');
      let a=await  collection.insert({address:body.payload.address,createdAt:new Date()});
      let ab={status:statuss.status,message:statuss.message,data:a.ops[0]}
        return ab;
      }
      catch(err)
      {
        throw(err);
      }
    }
}
