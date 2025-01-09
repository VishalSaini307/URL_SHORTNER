const express = require('express');
const mongoose = require('mongoose');
const Connectdb = require('./db');
const path = require('path');
const urlRouter = require('./src/router/url.router')
const staticrouter = require('./src/router/static_route');
const userrouter = require('./src/router/user')
const URL = require('./src/Model/url');
const cookieParser = require("cookie-parser")
const {restrictToLoggedinUserOnly , checkAuth} = require("./src/Middleware/auth")

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

// Routers
app.use('/api/urls',restrictToLoggedinUserOnly, urlRouter);
app.use('/api/static',checkAuth , staticrouter);
app.use('/api/user', userrouter);

// MongoDB Connection
Connectdb('mongodb+srv://vs456953:sjjEg1jzF528qzi3@cluster1.nho21.mongodb.net/short-url')
    .then(() => console.log('MongoDB Connected'));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Routes
app.get('/test', async (req, res, next) => {
    try {
        const allurls = await URL.find({});
        res.render('home', { urls: allurls });
    } catch (error) {
        next(error); // Pass error to the global error handler
    }
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start Server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
