const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true},
	password: {type: String, required: true},
	firstName: {type: String, required: true},
});




// //esta funcion se ejecuta "antes" de guardar cualquier usuario en Mongo
// UserSchema.pre('save',  function(next) {
// 	const user = this;

// 	//si no se ha cambiado la contraseña, seguimos
// 	if (!user.isModified('password')) return next();

// 	//brcypt es una libreria que genera "hashes", encriptamos la contraseña
// 	bcrypt.genSalt(10, function(err, salt) {
// 		if (err) return next(err);

// 		bcrypt.hash(user.password, salt, function(err, hash) {
// 			if (err) return next(err);

// 			// si no ha habido error en el encryptado, guardamos
// 			user.password = hash;
// 			next();
// 		});
// 	});
// });

UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// * Method to generate the JWT (You choose the name)
UserSchema.methods.generateJWT = function() {
	const today = new Date();
	const expirationDate = new Date();

	expirationDate.setDate(today.getDate() + 60);
	
	let payload = {
		id: this._id,
		name: this.firstName,
		email: this.email,
        algo:'Hola desde el modelo de USER!!!'
	};
	// * This method is from the json-web-token library (who is in charge to generate the JWT
	return jwt.sign(payload,secret, {
		expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
	});
};

const User = mongoose.model('User', UserSchema);



module.exports = User;

//Lo de arriba es exactamente lo mismo que esto pero a traves de mongoose

// class User {
//     constructor(){
//         this.id = 1
//     }

//     generateJWT(){
//         //hara algo y regresa el jwt
//         return 'jwt'
//     }

// }


// const Patricio = new User()

// Patricio.generateJWT()




const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtSecret = process.env.JWT_SECRET;

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const email = req.body.email;
  const data = req.body;
  console.log(req.body);
  // * Make sure request has the email
  if (!email) {
    return res.status(400).json({ error: { register: "Email not recieved" } });
  }
  const existingUser = await User.findOne({ email: email });
  // * If the user is found, return an error because there is already a user registered
  if (existingUser) {
    return res
      .status(400)
      .json({ error: { email: "Email already registered" } });
  } else {
    const newUser = new User({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(201).json({
        token: savedUser.generateJWT(),
        user: {
          email: savedUser.email,
          name: savedUser.name,
          id: savedUser._id,
        },
      });
    } else {
      return res
        .status(500)
        .json({ error: { firstName: "Error creating new User :(", err } });
    }
  }
});

// ! --------------------------------------

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // * Validate, email and password were provided in the request
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: { login: "Missing email or password" } });
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ error: { email: "User not found, please Register" } });
    }
    // * Validate password with bcrypt library
    //if (!foundUser.comparePassword(password)) { 
      if (foundUser.password !== password) {
      return res.status(400).json({ error: { password: "Invalid Password" } });
    }
    // * if everything is ok, return the new token and user data
    return res.status(200).json({
      token: foundUser.generateJWT(),
      user: {
        email: foundUser.email,
        name: foundUser.name,
        id: foundUser._id,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: { register: "Error Login in :(", error: err.message } });
  }
});

const jwtMiddleware = (req, res, next) => {
  // Recogemos el header "Authorization". Sabemos que viene en formato "Bearer XXXXX...",
  // así que nos quedamos solo con el token y obviamos "Bearer "
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(401).json({ error: "Unauthorized MISSING HEADER" });
  const token = authHeader.split(" ")[1];
  // Si no hubiera token, respondemos con un 401
  if (!token) return res.status(401).json({ error: "Unauthorized and missing token" });

  let tokenPayload;

  try {
    // Si la función verify() funciona, devolverá el payload del token
    tokenPayload = jwt.verify(token, jwtSecret);
  } catch (error) {
    // Si falla, será porque el token es inválido, por lo que devolvemo error 401
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Guardamos los datos del token dentro de req.jwtPayload, para que esté accesible en los próximos objetos req
  req.jwtPayload = tokenPayload;
  next();
};

module.exports = {
  authRouter,
  jwtMiddleware,
};

/*
{
	"name": "todo-api",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
	  "start": "node src/index.js",
	  "dev": "nodemon src/index.js"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"dependencies": {
	  "bcrypt": "^5.1.0",
	  "cors": "^2.8.5",
	  "dotenv": "^16.0.3",
	  "express": "^4.18.1",
	  "jsonwebtoken": "^9.0.0",
	  "mongoose": "^6.8.0"
	},
	"devDependencies": {
	  "nodemon": "^2.0.20"
	}
  }*/