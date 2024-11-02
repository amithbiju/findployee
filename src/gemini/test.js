// Make sure to include these imports:
//import { GoogleGenerativeAI } from "@google/generative-ai";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyBWmdD4ctq5M08Jz-C1E0POWbsn2vSlj2k');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";


const result = async () =>{  
    await model.generateContent(prompt).then(a => {
        console.log(a.response.text())
    });
}
console.log(result());