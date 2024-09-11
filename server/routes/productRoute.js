import express from 'express';
import { addProduct, ProductList, removeProduct } from '../controllers/productController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})
const upload = multer({ storage });

router.post("/add", upload.single("image"), addProduct);
router.get("/list", ProductList);
router.post("/remove", removeProduct);


export default router