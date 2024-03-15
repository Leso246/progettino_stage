import fs from "fs";

export function postData(email, key, data) {
    // Read the JSON file with users
    let arr = [];

    try {
        const usersData = fs.readFileSync("./db/data.json", "utf8");
        arr = JSON.parse(usersData);
    } catch (error) {
        throw new Error("Error while reading JSON file");
    }
}