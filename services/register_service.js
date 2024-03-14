import fs from "fs";
import * as Errors from "../errors.js"

/**
 * @param {JSON} request
 * @returns {string} User was succesfully created
 * @throws {Error} something went wrong
 */
export function registerUser(email, hashedPassword, admin) {
 
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
    throw new Errors.AlreadyExistingEmailError("Email already exists");
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