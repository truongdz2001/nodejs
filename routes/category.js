import express from 'express';
import { list, create, read , cateByID, update, remove } from '../controllers/category';
const router = express.Router()
// Lấy param

router.param("categoryId", cateByID);

// Tạo danh mục

router.post('/category', create);

// Danh sách danh mục

router.get("/category", list);

// Chi tiết danh mục

router.get('/category/:categoryId', read);

// Chỉnh sửa danh mục

router.put('/category/:categoryId', update);

// Xóa danh mục

router.delete('/category/:categoryId', remove);



// Exports

module.exports = router;

