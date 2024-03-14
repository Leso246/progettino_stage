import crypto from "crypto";
import fs from "fs";
import * as Errors from "../errors.js";
import { requestSchema } from "../schemas.js";

/**
 * @param {JSON} request
 * @returns {string} User was succesfully created
 * @throws {Error} somethign went wrong
 */
export function registerUser(request) {
  // Validate request body
  try {
    requestSchema.validate(request.body);
  } catch (error) {
    throw new Errors.ValidationError("Invalid json body");
  }

  const { email, password, admin } = request.body;

  // Check if the email is valid
  if (!isValidEmail(email)) {
    throw new Errors.WrongEmailError("Email addres is not valid");
  }

  // Hash the password
  const hashedPassword = hashPassword(password);

  // Load existing users or create an empty array if the file doesn't exist yet
  let users = [];
  try {
    const usersData = fs.readFileSync("users.json", "utf8");
    users = JSON.parse(usersData);
  } catch (error) {
    // File doesn't exist or empty
  }

  // Check if the email already exists
  if (users.some((user) => user.email === email)) {
    throw new Error("Email already exists");
  }

  // Save email, password and role
  const newUser = {
    email: email,
    password: hashedPassword,
    admin: admin,
  };

  users.push(newUser);

  // Write users array back to file
  fs.writeFileSync("users.json", JSON.stringify(users));

  return "User succesfully created";
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
