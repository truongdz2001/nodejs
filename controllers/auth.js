const User = require('../models/user');
import jwt from "jsonwebtoken" // to generate signed token
import expressJwt from 'express-jwt';
//const { errorHandler } = require('../helpers/dbErrorsHandler');
//import User from '../models/auths';

export const signup = (req, res) => {
    // console.log("request body", req.body);
    const user = new User(req.body);
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                error: "chua duoc"
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({ user })
    })
}

export const signin = (req, res) => {
    // find the user base on email
    const { email, password } = req.body; // datlt2306@gmail.com | aaaaa1
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'Người dùng có email đó không tồn tại. Vui lòng đăng ký'
            })
        }
        // if user is found make sure email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email và mật khẩu không khớp'
            })
        }
        // Tự động tạo ra một mã cùng với user và mã secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // duy trì mã thông báo là 't' trong cookie  
        res.cookie('t', token, { expire: new Date() + 9999 });
        //trả lại phản hồi với người dùng và mã thông báo cho ứng dụng khách giao diện người dùng
        const { _id, name, email, role } = user;
        return res.json(
            {
                token,
                user: { _id, email, name, role }
            }
        )
    })
};

export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Đăng ký thành công'
    })
}
export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

export const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Quyền truy cập bị Từ chối"
        })
    }
    next();
}

export const isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "Tài nguyên quản trị! Truy cập bị Từ chối"
        })
    }
    next();
}