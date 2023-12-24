import express from 'express';
import userRouter from './src/routers/user.router.js';
import blogRouter from './src/routers/blog.router.js';
import dotenv from 'dotenv';
import connectDB from './src/configs/mongodb_connector.js';
import cors from 'cors'

dotenv.config()
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);

app.use(function (err, req, res, next) {
  res.json({
    error: true,
    message: err.message,
  });
});


app.listen(3030, () => console.log('server is running in port 3030'));
