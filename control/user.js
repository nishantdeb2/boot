const services = require('../services');
const async = require('async');

module.exports={
  register :async(body)=>{
    try{
    let mail=await services.user.checkmail(body.email);
    let a= await services.user.adddata(body);
    //console.log(a.ops);
    return a;

  }
  catch(err)
  {
    throw(err);
  }
  },
  proupdate:async(payload)=>{
    try{
    let mail=await services.user.checkmail(payload.eamil);
    let up=await service.user.proup(payload);
    return up
  }
  catch(err)
  {
    throw(err);
  }
  },
  update:async(body)=>{
    try{
    //  let mail=await services.user.checkmail2(body.email);
  //  console.log(body.headers);
      let mail=await services.user.checkid(body);
      let update=await services.user.update(body);

        return update
      }
      catch(err)
      {
        throw(err);
      }
  },
  getalll: async(id)=>{
    try{
    return await services.user.getalll(id);

  }
  catch(err)
  {
    throw(err);
  }
  },
  get : async(mail)=>
  {
    try{
    let mal= await services.user.checkmail2(mail);
     let a =await services.user.get(mail);
     return a
   }
   catch(err)
   {
     throw(err);
   }
  },
  delete:async(body)=>{
    try{
    let mal= await services.user.checkid(body.headers.token);
    let pass=await services.user.checkpass2(body);
    let status=await services.user.delete(body.headers.token);
     return status
   }
   catch(err)
   {
     throw(err);
   }
  },
  login : async(body)=>
  {
    try{
    let mail= await services.user.checkmail2(body.email);
    let a=await services.user.checkpass(body);
    return a

  }
  catch(err)
  {
    throw(err);
  }
  }
}
