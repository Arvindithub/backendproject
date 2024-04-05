
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message),
        this.statusCode=statusCode
    }
}

export const errorMiddleware=(err,req,res,next)=>{
 err.message=err.message || "internal server error" ;
 err.statusCode=err.statusCode || 500;
 if(err.name==='caseError'){
    const message=`Resource  not found,invalid${err.path}`;
    err=new ErrorHandler(message,400)
 }
 
 if(err.code===11000){
    const message=`Duplicate ${Object.keys(err.keysValue)} Entered`;
    err=new ErrorHandler(message,400)
 }
 if(err.name==='jsonwebtokenError'){
    const message=`json webtoken is invalid tryagain`;
    err=new ErrorHandler(message,400)
 }
 if(err.name==='tokenexpiredError'){
    const message=`json web token is expired try again`;
    err=new ErrorHandler(message,400)
 }

 return res.staus(statusCode).json({
    success:false,
    message:err.message
 });
};

export default ErrorHandler;