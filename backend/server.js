import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona9', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
