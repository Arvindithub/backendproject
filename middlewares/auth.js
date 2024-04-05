import { JsonWebTokenError } from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError"
import ErrorHandler from "./error";
import { user } from "../models/user.js";

export  const isAuthorised=catchAsyncError(async(req,res,next)=>{
const {token}=req.cookies;

if(!token){
    return next(new ErrorHandler("user not authorized ",400));
}
const decoded =Jwt.verify(token,process.env.JWT_SECRET_KEY);

req.User=await user.findById(decoded.id);
next();
});