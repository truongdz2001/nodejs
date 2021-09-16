import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import expressValidator from 'express-validator';
import cors from 'cors';



const app = express();
app.use(cors());

dotenv.config();

//Cấu hình
const authRoutes = require("./routes/auth");
import productRoutes from "./routes/products";
import categoryRoutes from "./routes/category";


//Connect moogoseDB
mongoose
  .connect(process.env.MONGOBD_URI, {
    useNewUrlParser: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  });
mongoose.connection.on("error", (err) => {
  console.log(`Database Connect failed, ${err.message}`);
});

app.use(morgan("dev"));
app.use(express.json());
app.use(expressValidator());

//Middlewares
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', authRoutes)

//Listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is running port", port);
});
