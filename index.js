const express = require("express")
const app = express();
const path = require("path");
const bodyParser = require('body-parser')

const errorHandler = require("./Middleware/Errors.js");
const notFound = require("./Middleware/Errors.js");
const connectDatabase = require("./config/MongoDb.js");

const dotenv = require("dotenv")
dotenv.config()
connectDatabase();

const mongoose = require("mongoose")

// Middlewares
app.use(notFound);
app.use(errorHandler);
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/Signup')));
app.use(express.static(path.join(__dirname, 'public/Localmarketsignup')));
app.use(express.static(path.join(__dirname, 'public/Home')));


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Login/index.html'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Signup/index.html'));
})
app.get('/register-local-farm', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Localmarketsignup/index.html'));
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/index.html'));
})
app.get('/home/products', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/product-list-sele.html'));
})
app.get('/home/products/fruits', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/product-list-fruits.html'));
})
app.get('/home/products/fruits/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/product-detail.html'));
})
app.get('/home/maps', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/maps.html'));
})
app.get('/home/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/contact.html'));
})
app.get('/home/cart', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/cart.html'));
})
app.get('/home/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/checkout.html'));
})
app.get('/home/account', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/my-account.html'));
})
app.get('/home/wishlist', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/wishlist.html'));
})
app.get('/home/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Home/thanks.html'));
})

//db connection
const connection = require("./db");

//Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/order', require('./routes/api/order'));
app.use('/api/product', require('./routes/api/product'));


const PORT = process.env.PORT || process.env.LocalPort;

const server = app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
