import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {spawn} from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post("/inference", (req, res) => {
    const {image}=req.body;
    const rawImage = image.split(',')[1];
    const imageBuffer = Buffer.from(rawImage, 'base64');
    const filePath = path.join(__dirname, 'uploads', 'testpic.jpg');
    fs.writeFile(filePath, imageBuffer, (err) => {
        if (err) 
          console.log(err);
        else
          console.log("The file was saved!");
    });
    var dataToSend='';
    const python = spawn('py', ['-3.10', 'model.py']);
    python.stdout.on('data', (data) => {
      dataToSend = data.toString();
     });

     python.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
     python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      console.log(dataToSend)
      res.send(dataToSend);
     });
});

app.get("/inference", (req, res) => {
    res.send("Get request received");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

