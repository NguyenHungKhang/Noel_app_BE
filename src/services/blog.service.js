import mongoose, { Error } from "mongoose";
import userModel from "../models/user.model.js";
import blogModel from "../models/blog.model.js";

const checkUser = async (id) => {
    const user = await userModel.findById(id).exec();
    return !!user;
}

const save = async (content, userId) => {
    if (!(await checkUser(userId)))
        throw new Error("Người dùng không tồn tại");
    const existBlog = await blogModel.findOne({user: userId}).exec();
    if (existBlog) {
        existBlog.content = content;
        return existBlog.save()
    } else {
        const blog = new blogModel({
            _id: new mongoose.Types.ObjectId(),
            content,
        })

        Object.assign(blog, { user: userId });
        return blog.save();
    }
}

const getOne = async (id) => {
    const blog = await blogModel.findById(id).exec();
    if (!blog)
        throw new Error("Blog dùng không tồn tại");
    return blog;
}

const getOneByUser = async (userId) => {
    const user = await userModel.findById(userId).exec();
    if (!user)
        throw new Error("Người dùng không tồn tại");

    const blog = await blogModel.findOne({ user: userId }).exec();
    if (!blog)
        throw new Error("Blog dùng không tồn tại");
    return blog;
}

const getAll = async (sort = { createdAt: -1 }, page = null, limit = null) => {
    const total = await blogModel.find().countDocuments();
    const blogs = await blogModel.find().sort(sort).skip(page && ((page - 1) * limit)).limit(limit).populate("user").lean().exec();
    return {total, blogs};
}

const likeBlog = async (id, userId) => {
    if (!(await checkUser(userId)))
        throw new Error("Người dùng không tồn tại");

    const blog = await blogModel.findOne({ _id: id }).exec();
    if (!blog)
        throw new Error("Blog dùng không tồn tại");

    if (blog.likes.some((item) => item.user.toString() === userId))
        throw new Error("Người dùng đã like");

    const temp = new mongoose.Types.ObjectId(userId);
    blog.likes.push({ user: userId });
    return blog.save();
}

const unlikeBlog = async (id, userId) => {
    if (!(await checkUser(userId)))
        throw new Error("Người dùng không tồn tại");
    const blog = await getOne(id);
    if (!blog.likes.some((item) => item.user.toString() === userId))
        throw new Error("Người dùng chưa like");
    const updatedLikes = blog.likes.filter((userId) => userId.toString() !== userId.toString());
    return blogModel.findByIdAndUpdate(
        id,
        { likes: updatedLikes },
        { new: true }
    );
}

const increaseView = async (id) => {
    await getOne(id);
    return blogModel.findByIdAndUpdate(
        id,
        { $inc: { view: 1 }},
        { new: true }
    );
}


const remove = async (id) => {
    return !!(await blogModel.findByIdAndDelete(id));
}

export default {
    save,
    getOne,
    getAll,
    likeBlog,
    unlikeBlog,
    remove,
    getOneByUser,
    increaseView
}