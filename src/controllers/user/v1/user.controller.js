const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../../models/User');
require('dotenv').config();

const config = process.env;

// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
async function createUser(req, res, next) {
  try {
    // Get user input
    const { firstname, lastname, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstname && lastname)) {
      res.status(400).send('All input is required');
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword
    });

    // return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function login(req, res, next) {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send('All input is required');
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, config.TOKEN_KEY, {
        expiresIn: config.TOKEN_EXPIRATION
      });

      delete user.password;
      // save user token
      user.token = token;

      // user
      // res.headers('Access-Control-Allow-Credentials', true);
      res.cookie('token', token);
      res.status(200).json(user);
    } else {
      res.status(400).send('Invalid Credentials');
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  login
};
