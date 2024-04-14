import express from "express";
import cartControllers from "../controllers/cartControllers.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express();

router.get("/:username", verifyJWT, cartControllers.getCartByUsername);
router.get("/", cartControllers.getAllCart);
router.post("/", cartControllers.addToCart);
router.delete("/:id", cartControllers.deleteCart);
router.put("/:id", cartControllers.updateCart);
router.get("/:id", cartControllers.getSingleCart);

export default router;
