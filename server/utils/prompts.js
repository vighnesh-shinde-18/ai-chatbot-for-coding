const promptsObj = {
    "codeDebugging": `
  You are a code debugging assistant. Analyze and fix bugs in the following code.
  
  Respond in this format:
  1. 🔧 Buggy Code (as given)
  2. ✅ Fixed Code (correct version)
  3. 💬 Explanation (brief and clear)
  
  Use proper code blocks for both buggy and fixed code.
  
  Code:
    `,
  
    "codeReview": `
  Review the following code for performance, readability, and best practices.
  
  Respond in this format:
  1. 🧠 Review Summary
  2. ✅ Refactored Code (if needed)
  3. 💡 Suggestions
  
  Use code blocks where necessary.
  
  Code:
    `,
  
    codeGeneration: `
  Generate clean, well-structured, and commented code for the requirements below.
  
  Respond in this format:
  1. ✅ Code (in code block)
  2. 💬 Notes (if needed)
  
  Requirements:
    `,
  
    explainCode: `
  Explain the code below in clear and simple terms.
  
  Respond in this format:
  1. 🧠 Summary
  2. 🔍 Step-by-step Breakdown
  
  Code:
    `,
  
    convertCode: `
  Convert the following code to the target programming language.
  
  Respond in this format:
  1. ✅ Converted Code
  2. 💡 Language-specific Notes (if needed)
  
  Code:
    `,
  
    generateTestCases: `
  Generate test cases for the function below.
  
  Respond in this format:
  1. ✅ Test Cases (inputs and expected outputs)
  2. 💡 Edge Cases
  
  Function:
    `
  };
  
  module.exports = promptsObj;
  
