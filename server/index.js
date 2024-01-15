const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('../server/routes/userRoutes');
const postRouter = require('../server/routes/postRoutes');
const { notFound, errorMiddleware } = require('./middlewares/errorMiddleware');
const upload = require('express-fileupload')


dotenv.config();

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(upload());
app.use('/upload', express.static(__dirname + '/upload'));


//routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);


app.use(notFound);
app.use(errorMiddleware);


mongoose.connect(process.env.MONGO_URL).then(app.listen(5000, () => {
    console.log('Running at 5000')
})).catch((err) => {
    console.log(err)
})


