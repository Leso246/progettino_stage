import fs from "fs";
import * as Errors from '../errors.js'

/**
 * @param {string} userEmail 
 * @param {string} key 
 * @param {string} newData 
 */
export function patchData(userEmail, key, newData) {
    // Read the JSON file with users data
    let arr = [];

    try {
        const usersData = fs.readFileSync("./db/data.json", "utf8");
        arr = JSON.parse(usersData);
    } catch (error) {
        throw new Error("Error while reading JSON file");
    }

    const userIndex = arr.findIndex(user => user.email === userEmail);

    if(userIndex === -1) {
        throw new Errors.UserNotFoundError("User not found");
    }

    const userData = arr[userIndex];

    const objIndex = userData.data.findIndex(obj => obj.key === key);

    if(objIndex === -1) {
        throw new Errors.KeyNotFoundError("Key not found");
    }

    const newObj = {
        key: key,
        data: newData
    }

    userData.data[objIndex] = newObj;
    
    arr[userIndex] = userData;

    try {
        fs.writeFileSync("./db/data.json", JSON.stringify(arr, null, 2));
    } catch (error) {
        throw new Error("Error while writing to JSON file");
    }

    return "Data succesfully replaced";
}