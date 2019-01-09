const services = require('../services');
const async = require('async');
module.exports={
  addjob :async(body)=>{
    try{
    let check=await services.job.checkid(body.headers.token);
    let job=await services.job.checkjob(body);
    let add= services.job.adddata(body);
    return add
  }
  catch(err)
  {
    throw(err);
  }
  },
  update:async(body)=>{
    try{
        let mail=await services.job.checkid(body.headers.token);
        let update=await services.job.update(body);
        return update
      }
      catch(err)
      {
        throw(err);
      }
  },

  delete:async(body)=>{
    try{
    let mal= await services.job.checkid(body.headers.token);
    let status=await services.job.delete(body);
     return status
}
   catch(err)
   {
     throw(err);
   }
  }

}
