// Set up Mongoose
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connßect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	dbName: "Add DataBase Name here",
});

const db = mongoose.connection;
db.on("error", (err) => {
	console.error(err);
	process.exit(1);
});

db.once("open", async () => {
	console.log("Mongo connection started on " + db.host + ":" + db.port);
});

// Require individual models
require("./product");
require("./order");
require("./client");
require("./user");
