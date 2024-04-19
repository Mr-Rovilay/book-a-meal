import express from "express";
import cartControllers from "../controllers/cartControllers.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express();

router.get("/:email", verifyJWT, cartControllers.getCartByUsername);
router.get("/", cartControllers.getAllCart);
router.post("/", cartControllers.addToCart);
router.delete("/:id", cartControllers.deleteCart);
router.put("/:id", cartControllers.updateCart);
router.get("/:id", cartControllers.getSingleCart);
router.delete("/delete-cart-items", cartControllers.deleteAllCart);

export default router;
