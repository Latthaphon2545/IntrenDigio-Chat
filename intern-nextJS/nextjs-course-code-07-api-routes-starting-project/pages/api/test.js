import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";



function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    MongoClient.connect(
      "mongodb+srv://latthaphonp:<password>@cluster0.jejokpk.mongodb.net/"
    );

    const newUser = {
      id: new Date().toISOString(),
      email,
      password,
    };

    console.log(newUser);

    const filePath = path.join(process.cwd(), "data", "test.json");
    fs.writeFileSync(filePath, JSON.stringify(newUser));
    res.status(201).json({ message: "User created!", user: newUser });
  } else {
    const filePath = path.join(process.cwd(), "data", "test.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    res.status(200).json({ user: data });
  }
}

export default handler;
