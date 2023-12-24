import blogService from "../services/blog.service.js";

export const save = async (req, res, next) => {
    try {
        const blog = await blogService.save(req.body.content, req.body.userId);
        if(blog) res.json(blog);
    } catch (err) {
        next(err);
    }
}

export const getOne = async (req, res, next) => {
    try {
        const blogId = req.params.blogId;
        const blog =  await blogService.getOne(blogId);
        if(blog) res.json(blog);
    } catch (err) {
        next(err);
    }
}

export const getOneByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const blog =  await blogService.getOneByUser(userId);
        if(blog) res.json(blog);
    } catch (err) {
        next(err);
    }
}


export const getAll = async (req, res, next) => {
    try {
        const blogs =  await blogService.getAll(null, req.query.page, 3);
        if(blogs) res.json(blogs);
    } catch (err) {
        next(err);
    }
}

export const likeBlog = async (req, res, next) => {
    try {
        const userId = req.user ? req.user.id : "65831cee0adbd01ef30e5b88";
        const blogId = req.params.blogId;
        const blog =  await blogService.likeBlog(blogId, userId);
        if(blog) res.json(blog);
    } catch (err) {
        next(err);
    }
}

export const unlikeBlog = async (req, res, next) => {
    try {
        const userId = req.user ? req.user.id : "65831cee0adbd01ef30e5b88";
        const blogId = req.params.blogId;
        const blog =  await blogService.unlikeBlog(blogId, userId);
        if(blog) res.json(blog);
    } catch (err) {
        next(err);
    }
}

export const remove = async (req, res, next) => {
    try {
        const blogId = req.params.blogId;
        const result =  await blogService.remove(blogId);
        if(result) res.json(result);
    } catch (err) {
        next(err);
    }
}

export const increaseView = async (req, res, next) => {
    try {
        const result = await blogService.increaseView(req.params.blogId);
        if (result) res.json(result);
    } catch (err) {
        next(err);
    }
}