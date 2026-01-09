/*const mongoose = require("mongoose");
const initData = require("./data");
const Post = require("../models/postSchema");

const MONGO_URL = "mongodb://127.0.0.1:27017/BloggifyHub";

// Connect to DB
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB Error:", err));

// Seed function
const initDB = async () => {
  try {
    await Post.deleteMany({});
    await Post.insertMany(initData.data); // initData.data matches data.js
    console.log("Data was initialized successfully!");
  } catch (err) {
    console.log("SEED ERROR:", err);
  } finally {
    mongoose.connection.close(); // 🔴 IMPORTANT
  }
};

initDB();

// const mongoose= require("mongoose");
// const initData= require("./data");
// const Post =require("../models/postSchema");

// const MONGO_URL="mongodb://127.0.0.1:27017/BloggifyHub";//connsction to db
// main()//calling main fun of db
// .then(()=>{
// console.log("connected to db");
// }).catch((err)=>{
//     console.log(err);
// })
// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async() =>{
//     await Post.deleteMany({});
//     await Post.insertMany(initData.data);//.data is key in data.js
//     console.log("data was initialized");
// }

// initDB();*/

// seed.js
const mongoose = require("mongoose");
const initData = require("./data"); // Assumes data.js uses module.exports = { data }
const Post = require("./models/postSchema");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/BloggifyHub";

// Connect to DB
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB Error:", err));

// Seed function
const initDB = async () => {
  try {
    await Post.deleteMany({});
    // Ensure all seed posts conform to postSchema (e.g., have required fields)
    await Post.insertMany(initData.data);
    console.log("Data was initialized successfully!");
  } catch (err) {
    console.log("SEED ERROR:", err);
  } finally {
    mongoose.connection.close();
  }
};

initDB();