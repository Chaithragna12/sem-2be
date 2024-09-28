import mongoose from "mongoose";

const userschema=new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
            unique:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true
        },
        photo:{
            type:String
        },
        role:{
            type:String,
            default:"user"
        }
    },
    {timestamps:true}
)
export default mongoose.model("user",userschema)