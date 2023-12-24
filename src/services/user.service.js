import mongoose, { Error } from "mongoose";
import userModel from "../models/user.model.js";

const checkIpv4 = async (ipv4) => {
    const user = await userModel.findOne({ ipv4: ipv4 }).exec();
    return !!user;
}

const codeGenerate = async () => {
    let code;
    do {
        code = '';
        const characters = '0123456789';
        for (var i = 0; i < 10; i++) code += characters[Math.floor(Math.random() * characters.length)];
    } while (!!(await userModel.findOne({ code: code }).exec()))

    return code;
}

const add = async (ipv4) => {
    const data = {};
    if (await checkIpv4(ipv4))
        throw new Error("Người dùng đã tồn tại");
    data.ipv4 = ipv4;
    data.userCode = await codeGenerate();
    const user = new userModel({
        _id: new mongoose.Types.ObjectId(),
        ...data,
    })

    return user.save();
}

const getOne = async (id) => {
    const user = await userModel.findById(id).lean().exec();
    if(!user)
        throw new Error("Người dùng không tồn tại");
    return user;
}

const getOneByIp = async (ipv4) => {
    const user = await userModel.findOne({ipv4: ipv4}).lean().exec();
    if(!user)
        throw new Error("Người dùng không tồn tại");
    return user;
}


const remove = async (id) => {
    return !!(await userModel.findByIdAndDelete(id));
}

export default {
    add,
    getOne,
    remove,
    getOneByIp
}