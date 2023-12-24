import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userCode : {type: String, trim: true, require: true, index: {unique: true}},
    ipv4: {type: String, trim: true, require: true, index: { unique: true }},
    blog: {type: mongoose.Schema.Types.ObjectId, index: {unique: true}, ref: "Blog"},
},  { timestamps: true, versionKey: false });

const userModel = mongoose.model("User", userSchema);
export default userModel;
