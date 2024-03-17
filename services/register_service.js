import fs from "fs";
import * as Errors from "../errors.js"

/**
 * @param {string} email 
 * @param {string} hashedPassword 
 * @param {boolean} admin
 * @returns {string} User was succesfully created
 * @throws {Error} something went wrong
 */
export function registerUser(email, hashedPassword, admin) {
  // Load existing users or create an empty array if the file doesn't exist yet
  let users = [];
  try {
    const usersData = fs.readFileSync("./db/users.json", "utf8");
    if (usersData.trim() !== "") {
      users = JSON.parse(usersData);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist or empty, continue with empty users array
    } else {
      // Unexpected error
      throw new Error(`Failed to read users data: ${error.message}`);
    }
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
  fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2));

  // Load existing users data or create an empty array if the file doesn't exist yet
  let dataArr = [];
  try {
    const usersData = fs.readFileSync("./db/data.json", "utf8");
    if (usersData.trim() !== "") {
      dataArr = JSON.parse(usersData);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist or empty, continue with empty users array
    } else {
      // Unexpected error, log or handle appropriately
      throw new Error(`Failed to read users data: ${error.message}`);
    }
  }

  const newDataUser = {
    email: email,
    data: []
  }

  dataArr.push(newDataUser);

  // Write users array back to file
  fs.writeFileSync("./db/data.json", JSON.stringify(dataArr, null, 2));

  return "User succesfully created";
}