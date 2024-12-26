
import mongoose from "mongoose";
import User from "./user.js";

const quoteSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    by :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});

const Quote = mongoose.model("Quote", quoteSchema); 

export default Quote;

