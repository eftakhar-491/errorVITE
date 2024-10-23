const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// OpenAI Configuration (You'll need the OpenAI key in the .env file)
const { Configuration, OpenAIApi } = require("openai");
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// API route to generate image using OpenAI's API
app.post("/api/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    // const response = await openai.createImage({
    //   prompt,
    //   n: 1,
    //   size: "1024x1024",
    // });
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response.data[0].url;
    // const imageUrl = response.data.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
