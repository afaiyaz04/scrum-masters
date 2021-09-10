import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://admin:admin@scrummasters-it-project.gtsnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000

mongoose.connect(
    CONNECTION_URL, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => app.listen(PORT, () => console.log('MongoDB connected')))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

// // Set up Mongoose
// require("dotenv").config();
// const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGODB_URI, {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false,
// 	dbName: "Add DataBase Name here",
// });

// const db = mongoose.connection;
// db.on("error", (err) => {
// 	console.error(err);
// 	process.exit(1);
// });

// db.once("open", async () => {
// 	console.log("Mongo connection started on " + db.host + ":" + db.port);
// });

// // Require individual models
// require("./product");
// require("./order");
// require("./client");
// require("./user");
