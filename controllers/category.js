import Category from '../models/category';
import formidable from 'formidable';
import _ from 'lodash';


export const create = (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        message: "Thêm danh mục thất bại"
      })
    }
    const { name } = fields;
    if (!name) {
      return res.status(400).json({
        message: "Hãy nhập đầy đủ thông tin"
      })
    }
    console.log(fields);
    let cate = new Category(fields);
    cate.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "Không thể thêm sản phẩm"
        })
      }
      res.json(data)
    })
  })
}

export const list = (req, res) => {
  Category.find((err, data) => {
    if (err) {
      error: "Không tìm thấy sản phẩm"
    }
    res.json( data )
  })
}

export const cateByID = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err || !cate) {
      res.status(400).json({
        message: "Không tìm thấy danh mục"
      })
    }
    console.log(req.cate);
    req.cate = cate;
    next();
  })
}

export const read = (req, res) => {
  return res.json(req.cate)
}

export const remove = (req, res) => {
  let category =req.cate;
  category.remove((err, deletedCategory) => {
    if (err || !category) {
      res.status(400).json({
          error: "Xóa danh mục không thành công"
      })
  }
    res.json({
      deletedCategory,
      message: "Xóa danh mục thành công"
    });
  })
}

export const update = (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Sửa sản phẩm thất bại"
      })
    }
    const { name } = fields;
    if (!name) {
      return res.status(400).json({
        message: "Hãy nhập đầy đủ thông tin"
      })
    }
    console.log(fields);

    let cate = req.cate;
    cate = _.assignIn(cate, fields);

    cate.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "Không thể sửa sản phẩm"
        })
      }
      res.json(data)
    })
  })
}


