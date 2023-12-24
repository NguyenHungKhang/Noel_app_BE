import userService from "../services/user.service.js";

export const add = async (req, res, next) => {
    try {
        const ipv4 = req.params.ipv4;
        const user = await userService.add(ipv4)
        if (user) res.json(user);
    } catch (err) {
        next(err);
    }
}

export const getOne = async (req, res, next) => {
    try {
        const userId = req.user ? req.user.id : "65830f71eebe032f48c83949";
        const user = await userService.getOne(userId);
        if (user) res.json(user);
    } catch (err) {
        next(err);
    }
}

export const getOneByIp = async (req, res, next) => {
    try {
        const ipv4 = req.body.ipv4;
        const user = await userService.getOneByIp(ipv4);
        if (user) res.json(user);
    } catch (err) {
        next(err);
    }
}

export const remove = async (req, res, next) => {
    try {
        const userId = req.user ? req.user.id : "65830f71eebe032f48c83949";
        const result = await userService.remove(userId);
        if (result) res.json(result);
    } catch (err) {
        next(err);
    }
}

