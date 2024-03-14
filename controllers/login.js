import crypto from "crypto";
import { registerUser } from "../services/register_service.js"
import * as Errors from "../errors.js"

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
    return response.status(error.status).send({ error: error.message})
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
 * @param {Response} response
 */
export async function loginHandler(request, response){
  // Validazione body

  // body
}


/**
 * @param {Request} request
 * @param {Response} response
 */
export async function deleteHandler(request, response){

}