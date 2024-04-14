import userControllers from "../controllers/userControllers.js";
import express from "express";
import verifyAdmin from "../middleware/verifyAdmin.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express();

router.get("/", userControllers.getAllUsers);
router.get("/:id", userControllers.getSingleUser);
router.delete("/:id", userControllers.deleteSingleUser);
// router.get("/admin/:email", userControllers.getUserAdmin);
router.get("/admin/:email", userControllers.getAdmin);
router.patch(
  "/admin/:id",

  userControllers.makeUserAnAdmin
);

export default router;
