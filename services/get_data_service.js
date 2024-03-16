import fs from 'fs';
import * as Errors from '../errors.js'

/**
 * @param {string} email
 * @param {string} key  
 */
export function getData(userEmail, key) {
    // Read the JSON file with users data
    let arr = [];

    try {
        const usersData = fs.readFileSync("./db/data.json", "utf8");
        arr = JSON.parse(usersData);
    } catch (error) {
        throw new Error("Error while reading JSON file");
    }


    const user = arr.find(user => user.email === userEmail);

    if(user == undefined) {
        throw new Errors.UserNotFoundError("User not found");
    }
    
    const userData = user.data.find(item => item.key === key);

    if (!userData) {
        throw new Errors.KeyNotFoundError("Key not found");
    }

    return userData;
}