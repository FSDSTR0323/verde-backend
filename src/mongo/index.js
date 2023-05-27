const dotenv = require("dotenv");
const mongoose = require("mongoose");

// we import dotenv and activate the config method to be able to
// use enviroment variables inside this file
dotenv.config();

const mongoUrl = process.env.MONGO_URL;
const databaseHost = process.env.DATABASE_HOST || 'localhost';
const databasePort = process.env.DATABASE_PORT || '27017';
const databaseName = process.env.DATABASE_NAME || 'app';
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseURL = process.env.DATABASE_URL;


// if we have a full mongoUrl defined in the .env then use it to start an online connection
if(mongoUrl){
	mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
}else{
    // otherwise simply look for the user and password 
    // (just like in the DOCKER-COMPOSE file)
	if(databaseUser && databasePassword) {
		mongoose.connect(`mongodb://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}?authSource=admin`, {useNewUrlParser: true, useUnifiedTopology: true});
	}else {
		mongoose.connect(`mongodb://${databaseHost}:${databasePort}/${databaseName}?authSource=admin`, {useNewUrlParser: true, useUnifiedTopology: true});
	}
}


// some configuration
mongoose.set("strictQuery", false);

const mongo = mongoose.connection;
mongo.on("error", (error) => console.error(error));
mongo.once("open", () => {
  console.log("connected to database 🖲️🖲️");
});

module.exports = { mongo };