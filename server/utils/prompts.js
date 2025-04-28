const promptsObj = {
  codeDebugging: `
Act as an expert programmer. Debug the given code. Explain the error, fix it, and provide the corrected version with explanation and comments. Also suggest best practices to avoid similar issues.
Code:
  `,
  codeReview: `
Act as an expert code reviewer. Review the following code for performance bottlenecks, readability, optimizations, and best practices. Rate it on a scale of 1-10 and suggest improvements.
Code:
  `,
  codeGeneration: `
Act as an expert programmer. Generate code for the given task in a clean and structured format. Include comments for clarity and briefly explain key steps.
Requirements:
  `,
  explainCode: `
Act as a code explainer. Explain the given code line-by-line or block-by-block in simple, beginner-friendly language. Highlight purpose, important functions, variables, control flow, and edge cases.
Code:
  `,
  convertCode: `
Act as a multi-language expert programmer. Convert the following code to the target programming language while preserving functionality and idioms. Add comments for any changes and notes for the target language.
Code:
  `,
  generateTestCases: `
Act as a professional tester. Generate meaningful test cases covering happy paths, edge cases, and error handling. Respond in a detailed, non-tabular format including input and expected output.
Code:
  `,
};

module.exports = promptsObj;
