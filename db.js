
//creating an instance of mongo
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

let Mongo = process.env.mongoURL;

//creating an instance of the mongodb connection
mongoose.connect(Mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000

})
    .then(() => console.log("MongoDb Connected Successfully!!!"))
    .catch(err => console.log(err));

module.exports = mongoose;