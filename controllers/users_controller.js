import crypto from "crypto";
import * as Errors from "../errors.js"
import { registerUser } from "../services/register_service.js"
import { loginUser } from "../services/login_service.js";
import { deleteUser } from "../services/delete_service.js";
import { decodeToken } from "../helper.js";


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
    return response.status(201).send({result: result, status: 201});
  } catch (error) {
    return response.status(error.status).send({ error: error.message, status: error.status});
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
    throw new Errors.WrongEmailError("Email address is not valid");
  }

  // Hash the password
  const hashedPassword = hashPassword(password);

  try {
    const token = loginUser(email, hashedPassword);
    return response.status(200).send({ jwt: token, status: 200});
  } catch (error) {
    return response.status(error.status).send({ error: error.message, status: error.status})
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

    return response.status(200).send({result: result, status: 200});

  } catch (error) {
    return response.status(error.status).send({ error: error.message, status: error.status });
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


