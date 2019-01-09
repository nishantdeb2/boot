const services = require('../services');
const async = require('async')
module.exports={
  addaddress:async(body)=>{
    try{
    let check=await services.jobaddress.checkid(body.headers.token);
    let job=await services.jobaddress.checkadd(body);
    let add= services.jobaddress.adddata(body);
    return add
  }
  catch(err)
  {
    throw(err);
  }
  },
  updateaddress:async(body)=>{
    try{
        let mail=await services.jobaddress.checkid(body.headers.token);
        let update=await services.jobaddress.update(body);
        return update
      }
      catch(err)
      {
        throw(err);
      }
  },
  delete:async(body)=>{
    try{
    let mal= await services.jobaddress.checkid(body.headers.token);
    let status=await services.jobaddress.delete(body);
     return status
}
   catch(err)
   {
     throw(err);
   }
  }
}
