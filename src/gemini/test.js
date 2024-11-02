
require('dotenv').config();
const KEY = process.env.API_KEY;

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require ("@google/generative-ai/server");


// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  // Choose a Gemini model.
  model: "gemini-1.5-flash",
});

// Upload the file and specify a display name.

const uploadResponse = async ()=> await fileManager.uploadFile("emp.txt", {
  mimeType: "text/plain",
  displayName: "Gemini 1.5 PDF",
});

// View the response.
console.log(
  `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`,
);

// Generate content using text and the URI reference for the uploaded file.

const result = async () => await model.generateContent([
  {
    fileData: {
      mimeType: uploadResponse.file.mimeType,
      fileUri: uploadResponse.file.uri,
    },
  },
  { text: "Identify the best employee(s) for a task that requires strong Python and Machine Learning skills." },
]);

// Output the generated text to the console
console.log(result.response.text());
