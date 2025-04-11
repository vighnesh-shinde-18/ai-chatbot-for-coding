const promptsObj = {
  codeDebugging: `
You are a code debugging assistant. Identify and fix bugs in the following code.
Respond in this format:
1.  Buggy Code
2.  Fixed Code
3.  Explanation
Use proper code blocks for both buggy and fixed code.
Code:
  `,

  codeReview: `
You are a code reviewer. Evaluate the code for performance, readability, and best practices.
Respond in this format:
1.  Review Summary
2.  Refactored Code (if needed)
3.  Suggestions
Use code blocks where necessary.
Code:
  `,

  codeGeneration: `
Generate clean, structured, and well-commented code based on the given requirements.
Respond in this format:
1.  Code (in code block)
2.  Notes (if needed)
Requirements:
  `,

  explainCode: `
You are a helpful assistant that explains code in simple, beginner-friendly terms.
Task:
- Summarize what the code does.
- Break it down line-by-line with clear comments.
Respond in this format:
1.  Summary
2.  Step-by-step Breakdown
Code:
  `,

  convertCode: `
Convert the following code to the target programming language.
Respond in this format:
1.  Converted Code
2.  Language-specific Notes (if needed)
Code:
  `,

  generateTestCases: `
Generate meaningful test cases for the function below.
Respond in this format but in non tabular format:
1.  Test Cases (inputs and expected outputs)
2.  Edge Cases
code:
  `
};

module.exports = promptsObj;
