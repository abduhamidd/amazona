import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import path from 'path';
const app = express();

mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/amazona',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/front/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/build/index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
