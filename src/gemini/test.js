
require('dotenv').config();
const KEY = process.env.API_KEY;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = '"Employee 1: {    skills: ["Python", "Machine Learning", "Data Analysis"]}Employee 2: {    skills: ["JavaScript", "React", "Frontend Development"]}Employee 3: {    skills: ["SQL", "Data Engineering", "Cloud Computing"]}"' + "Give only the employee number in a json format with no additional text for a task that requires strong Python and Machine Learning skills.";

const result = async() =>{ await model.generateContent(prompt).then(a => {
    console.log(a.response.text());
});
}
console.log(result());