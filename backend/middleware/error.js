const CatchError=require('../resources/catcherror')
module.exports=(er,req,res,next)=>{
    er.statusCode=er.statusCode || 500;
    er.message=er.message || 'Server Error';
    // if(er.name==='castError'){
    //     const msg = `id not found.${er.path}`
    //     er = new CatchError(msg, 400)
    // }
    // id error
    res.status(er.statusCode).json({
        success:false,
        message:er.message
    })
}



  