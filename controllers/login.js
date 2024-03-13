import * as Errors from '../errors.js';
import crypto from 'crypto';
import fs from 'fs';

// Sign up
/**
 * @param {Request} request
 * @param {Response} response
 */
export async function registerHandler(request, response){

  const { email, password, admin } = request.body;

  // Check if the email is valid
  if(!isValidEmail(email)) {
    const error = new Errors.WrongEmailError("Email addres is not valid");
    return response.status(error.status).send({ error: error.message });
  }

  // Hash the password
  const hashedPassword = hashPassword(password);

  // Load existing users or create an empty array if the file doesn't exist yet
  let users = [];
  try {
    const usersData = fs.readFileSync('users.json', 'utf8');
    users = JSON.parse(usersData);
  } catch (error) {
    // File doesn't exist or empty
  }

  // Check if the email already exists
  if (users.some(user => user.email === email)) {
    return response.status(400).send({ error: "Email already exists" });
  }
  
  // Save email, password and role
  const newUser = {
    email: email,
    password: hashedPassword,
    admin: admin
  };
  users.push(newUser);

  // Write users array back to file
  fs.writeFileSync('users.json', JSON.stringify(users));

  // There were no errors, the user has been successfully created
  return response.status(201).send({ message: "User registered successfully" });
}


function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
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