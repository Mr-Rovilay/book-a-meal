import express from "express";
import menuControllers from "../controllers/menuControllers.js";
const router = express();

router.get("/", menuControllers.getAllMenu);
router.post("/", menuControllers.postMenu);
router.get("/:id", menuControllers.getSingleMenu);
router.delete("/:id", menuControllers.deletedMenuItem);
router.patch("/:id", menuControllers.updateMenu);

export default router;
