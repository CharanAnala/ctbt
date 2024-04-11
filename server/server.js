const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const app = express();
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { topic, duration, hoursPerDay } = req.body;

  const prompt = `Assume the role of a Professor with over 20 years of experience for the rest of this conversation.

I'm planning to learn ${topic}, and I am a beginner.

Your task is to generate a study plan for ${duration} for ${topic}.
The study plan should be detailed and include the topics to be prepared on the given week, make sure to include projects to work on.  

The goal is to Provide a study plan which is easy to stick in my daily routine where I dedicate ${hoursPerDay} hours a day for the ${topic}.

While giving response go straight into the response.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const text = result.response.text;
    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating content' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
