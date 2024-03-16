import fs from "fs";
import * as Errors from '../errors.js'

/**
 * @param {string} userEmail 
 * @param {string} targetEmail
 * @param {string} key
 * @param {string} data 
 */
export function postData(userEmail, key, data) {
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

    if(user.data.find(obj => obj.key === key)) {
        throw new Errors.AlreadyExistingKeyError("This key already exists");
    }

    const dataToPush = {
        key: key,
        data: data
    }

    user.data.push(dataToPush);

    // Write users array back to file
    fs.writeFileSync("./db/data.json", JSON.stringify(arr, null, 2));

    return "Data created succesfully";
}