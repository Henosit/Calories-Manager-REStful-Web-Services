require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

app.listen(PORT, () => {console.log(`Server is running at: http://localhost:${PORT}`)});