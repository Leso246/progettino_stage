import fs from "fs";
import * as Errors from "../errors.js"
import jwt from 'jsonwebtoken';

/**
 * @param {string} email 
 * @param {string} hashedPassword
 * @returns { string } jwt token
 */
export function loginUser(email, hashedPassword) {
    // Read the JSON file with users
    let users = [];

    try {
        const userData = fs.readFileSync("./db/users.json", "utf8");
        users = JSON.parse(userData);
    } catch (error) {
        throw new Error("Error while reading JSON file");
    }

    // Find the correct user
    const user = users.find(user => user.email === email);

    if(!user) {
        throw new Errors.UserNotFoundError("User not found");
    }

    if(hashedPassword != user.password){
        throw new Errors.InvalidPasswordError("Invalid password");
    }

    // Everything is fine, generate JWT token
    const payload = {
        email: user.email,
        admin: user.admin
    };

    const options = {
        expiresIn: '1h' 
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
 
    return token;
}