import mongoose from "mongoose";


const blogSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    content : {type: String, trim: true, require: true},
    view: {type: Number, min: 0, default: 0},
    likes: [{
        type: {
            _id: false,
            user: {type: mongoose.Schema.Types.ObjectId, require: true, ref: "User"}
        },
        require: false,
        default: []
    }],
    user: {type: mongoose.Schema.Types.ObjectId, require: true, index: {unique: true}, ref: "User"},
},  { timestamps: true, versionKey: false });

const blogModel = mongoose.model("Blog", blogSchema);
export default blogModel;
