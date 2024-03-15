import crypto from "crypto";
import { registerUser } from "../services/register_service.js"
import { loginUser } from "../services/login_service.js";
import * as Errors from "../errors.js"
import jwt from 'jsonwebtoken';
import { deleteUser } from "../services/delete_service.js";


// Register controller
/**
 * @param {Request} request 
 * @param {Response} response
 * @returns {Response} the http response
 */
export async function registerHandler(request, response){
  const { email, password, admin } = request.body;

  // Check if the email is valid
  if (!isValidEmail(email)) {
    throw new Errors.WrongEmailError("Email addres is not valid");
  }

  // Hash the password
  const hashedPassword = hashPassword(password);

  try {
    const result = registerUser(email, hashedPassword, admin);
    return response.status(201).send({ message: result});
  } catch (error) {
    return response.status(error.status).send({ error: error.message});
  }
}

// Login controller
/**
 * @param {Request} request
 * @param {Response} response
 * @returns {Response} http response
 */
export async function loginHandler(request, response){
  const { email, password } = request.body;

  // Check if the email is valid
  if (!isValidEmail(email)) {
    throw new Errors.WrongEmailError("Email addres is not valid");
  }

  // Hash the password
  const hashedPassword = hashPassword(password);

  try {
    const token = loginUser(email, hashedPassword);
    return response.status(200).send({ message: token});
  } catch (error) {
    console.log("ERROR" + error)
    return response.status(error.status).send({ error: error.message})
  }

}

/**
 * @param {Request} request
 * @param {Response} response
 * @returns {Response} response
 */
export async function deleteHandler(request, response){

  try {   
    const decoded = decodeToken(request);

    const result = deleteUser(decoded.email);

    return response.status(200).send({ message: result});

  } catch (error) {
    return response.status(error.status).send({ error: error.message });
  }
}

/**
 * @param {Request} request 
 * @param {Response} response 
 */
export async function postDataHandler(request, response) {
  try {
    const decoded = decodeToken(request);

    const email = decoded.email;

    const { key, data } = request.body;

    console.log("EMAIL " + email + " key " + key + " data " + data);

  } catch (error) {
    return response.status(error.status).send({ error: error.message });
  }
}

/**
 * @param {string} email
 * @returns {boolean} true if the email addres is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * @param {string} password
 * @returns {string} hashed password
 */
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/**
 * @param {Request} request 
 * @returns {token} decodedToken
 */
function decodeToken(request) {
  // Retrieve the header
  const authHeader = request.headers['authorization'];

  // Check if the header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Errors.MissingTokenError('Authorization header missing or invalid');
  }

  // Retrieve the token
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    throw new Errors.InvalidTokenError("Invalid token");
  }
}
