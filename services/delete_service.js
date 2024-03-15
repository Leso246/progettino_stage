import fs from "fs";

/**
 *@param {string} email 
 */
export function deleteUser(email) {

    // Read the JSON file with users
    let users = [];

    try {
        const userData = fs.readFileSync("users.json", "utf8");
        users = JSON.parse(userData);
    } catch (error) {
        return new Error("Error while reading JSON file");
    }

    const filteredUsers = users.filter(user => user.email != email);

    try {
        fs.writeFileSync("users.json", JSON.stringify(filteredUsers, null, 2));
        return "User succesfully deleted";
    } catch (error) {
        return new Error("Error while writing to JSON file");
    }

}