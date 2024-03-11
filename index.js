const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const readline = require('readline');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);




async function run() { 
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter a message: ', async (inputString) => {
    //console.log(`You entered: ${inputString}`);
    rl.close();

    try {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = inputString;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
    } catch (error) {
      console.error('Error:', error.message);
    }

    // Call run() again to make the code recursive
    run();
  });
}

run();
