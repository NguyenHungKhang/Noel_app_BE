import { Router } from "express";
import { getAll, getOne, getOneByUser, increaseView, likeBlog, remove, save, unlikeBlog } from "../controllers/blog.controller.js";


const router = Router();

router.get("/", getAll);
router.get("/:blogId", getOne);
router.get("/user/:userId", getOneByUser)
router.post("/", save);
router.patch("/like-blog/:blogId", likeBlog);
router.patch("/unlike-blog/:blogId", unlikeBlog);
router.delete("/:blogId", remove);
router.get("/increase-view/:blogId", increaseView);

export default router;
