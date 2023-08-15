require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_ACCESS_KEY,
});
const openai = new OpenAIApi(configuration);

// Allow Cross Origin Resourse Sharing - CORS
// Use the cors middleware with specific configuration
app.use(cors({
  origin: 'http://localhost:5173' // Change this to match your React app's origin
}));

app.route("/:question")
    .post(async(req,res)=>{
      const question = req.params.question;
      // GPT
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: question}],
      });
      const response = chatCompletion.data.choices[0].message.content
      res.send(response)
    })
    .get((req,res)=>{
      res.send("hello")
    })

app.listen(port, ()=>{
  console.log("Successfully started the server on port 3000")
})