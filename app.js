const express = require('express');
const mongoose = require('mongoose');

const appRoutes = require('./Routes/appRoutes');

const app = express();

app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbURI = 'mongodb://localhost:27017/QuizzesDB';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/", appRoutes);

///////     set port to run our server            ////////
app.listen(3000, () => console.log("server started at 3000"));