import fs from "fs";

fs.writeFileSync("new.txt","Hello World")

const data = fs.readFileSync("new.txt","utf-8");

console.log("data",data);