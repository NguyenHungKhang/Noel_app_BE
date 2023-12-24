import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userCode : {type: String, trim: true, require: true, index: {unique: true}},
    ipv4: {type: String, trim: true, require: true, index: { unique: true }},
},  { timestamps: true, versionKey: false });

const userModel = mongoose.model("User", userSchema);
export default userModel;
