import fs from "fs";

/**
 *@param {string} email 
 @returns {Response} response
 */
export function deleteUser(email) {

    // Read the JSON file with users
    let users = [];

    // Delete user from users.json
    try {
        const userData = fs.readFileSync("./db/users.json", "utf8");
        users = JSON.parse(userData);
    } catch (error) {
        return new Error("Error while reading JSON file");
    }

    const filteredUsers = users.filter(user => user.email != email);

    try {
        fs.writeFileSync("./db/users.json", JSON.stringify(filteredUsers, null, 2));
    } catch (error) {
        return new Error("Error while writing to JSON file");
    }

    // Delete data from data.json
    let arrData = [];

    try {
        const usersData = fs.readFileSync("./db/data.json", "utf8");
        arrData = JSON.parse(usersData);
    } catch (error) {
        return new Error("Error while reading JSON file");
    }

    const filteredUsersData = arrData.filter(user => user.email != email);

    try {
        fs.writeFileSync("./db/data.json", JSON.stringify(filteredUsersData, null, 2));
        return "User succesfully deleted";
    } catch (error) {
        return new Error("Error while writing to JSON file");
    }
}