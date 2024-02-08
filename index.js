const express = require("express");
const app = express();
const port = 3000;
// const cors = require('cors')
app.use(express.json());
require('dotenv').config()
app.use(express.static("public"));

app.get("/dinosaur", async (req, res) => {
  //created a route, when the run is hit, it fetches
  // the dinosaur name. so in a way hiding our api
  try {
    const response = await fetch(
      "https://dinoipsum.com/api/?format=json&words=2&paragraphs=1"
    );
    const dinosaurName = await response.json();
    // console.log(dinosaurName);
    res.json(dinosaurName);
  } catch (err) {
    console.error("Where did all the dinosaurs go?", err);
  }
});
app.get("/dinosaurimage", async (req, res) => {
  //created a route, when the run is hit, it fetches
  // the dinosaur image. so in a way hiding our api
  const accessKey = process.env.ACCESS_KEY // Replace YOUR_ACCESS_KEY with your actual Unsplash access key
  const url = "https://api.unsplash.com/photos/random/";
  const params = new URLSearchParams({
    query: "dinosaur",
    count: 1,
  });
  const headers = {
    Authorization: `Client-ID ${accessKey}`,
  };
  try {
    const response = await fetch(`${url}?${params}`, { headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }
    const images = await response.json();
    res.json(images);

  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
