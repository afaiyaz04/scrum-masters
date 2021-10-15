import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import clientRoutes from "./routes/client.js";
import orderRoutes from "./routes/order.js";
import userRoutes from "./routes/user.js";
import reportRoutes from "./routes/report.js";
import signInRoutes from "./routes/signIn.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/client", clientRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);
app.use("/report", reportRoutes);
app.use("/signin", signInRoutes);

if (process.env.NODE_ENV === "test") {
    dotenv.config();
}

// hardcoded values will be provided to process.env once deployed
const CONNECTION_URL =
    process.env.DB_URL ||
    "mongodb+srv://admin:admin@scrummasters-it-project.gtsnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => app.listen(PORT, () => console.log("MongoDB connected")))
    .catch((error) => console.log(error.message));

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
// require("./models/product");
// require("./models/order");
// require("./models/client");
// require("./models/user");
// require("./models/log");
