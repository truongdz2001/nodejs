import express from "express";
import { list, remove, create, read, readPhoto,update, productByID } from "../controllers/products";

const router = express.Router();

// Lấy ID từ param
router.param("productId", productByID);


//Thêm sản phẩm
router.post("/product", create);
//Danh sách sản phẩm
router.get("/product", list);  
//Chi tiết sản phẩm
router.get("/product/:productId", read);
//Xóa sản phẩm
router.delete("/product/:productId", remove);
//Sửa sản phẩm
router.put("/product/:productId", update);

router.get('/product/photo/:productId', readPhoto);


module.exports = router;
