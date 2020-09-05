import express from 'express';
import { json } from 'body-parser';


const app = express();
app.use(json());


app.get("/api/users/currentuser", (req, res) => {
  res.send("HIIII");
});

app.get("/", (req, res) => {
  res.send("HIIII");
});
app.listen(3000, () => {
  console.log(`listenning on port 3000`);
});

console.log("walak kusemekken ken");

