import fs from "fs";
import * as Errors from '../errors.js'

/**
 * @param {string} targetEmail 
 * @param {string} key 
 */
export function deleteData(targetEmail, key) {
    // Read the JSON file with users data
    let arr = [];

    try {
        const usersData = fs.readFileSync("./db/data.json", "utf8");
        arr = JSON.parse(usersData);
    } catch (error) {
        throw new Error("Error while reading JSON file");
    }


const userIndex = arr.findIndex(user => user.email === targetEmail);

    if (userIndex === -1) {
        throw new Error("User not found");
    }

    const userData = arr[userIndex];

    const objIndex = userData.data.findIndex(item => item.key === key);

    if (objIndex === -1) {
        throw new Errors.KeyNotFoundError("Key not found");
    }

    // Remove the object from the user's data
    userData.data.splice(objIndex, 1);

    // Update the array with modified user data
    arr[userIndex] = userData;

    try {
        fs.writeFileSync("./db/data.json", JSON.stringify(arr, null, 2));
    } catch (error) {
        throw new Error("Error while writing to JSON file");
    }

    return "Data succesfully deleted";
    
}