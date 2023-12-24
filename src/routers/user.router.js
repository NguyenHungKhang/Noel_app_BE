import { Router } from "express";
import { add, getOne, getOneByIp, remove } from "../controllers/user.controller.js";

const router = Router();

router.post("/", add);
router.get("/owner", getOne);
router.get("/by-ip", getOneByIp);
router.delete("/owner", remove);

export default router;
