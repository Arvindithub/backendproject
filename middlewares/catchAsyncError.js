

export const catchAsyncError=()=>{
 return (req,res,next )=>{
    Promise.response(TheFunction(req,res,next).catch(next))
 }  ; 
};