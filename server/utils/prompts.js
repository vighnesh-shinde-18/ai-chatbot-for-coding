const promptsObj = {
  codeDebugging: `
Act as a Data Structures and Algorithms (DSA) expert. Debug the given algorithm or DSA-related code. Identify the error(s), explain them, provide a corrected version, and include comments. Suggest better practices to prevent similar issues in DSA contexts.

Strictly respond ONLY with a valid JSON object. Do NOT include code block markers (like \`\`\`), markdown, or any extra text.

Format:
{
  "title": "...",
  "errorSummary": "...",
  "errorExplanation": "...",
  "correctedCode": "...",
  "codeExplanation": "...",
  "bestPractices": ["...", "..."]
}

Problem / Code:
`,

  codeReview: `
Act as a senior DSA mentor. Review the following algorithm/code. Evaluate it for time and space complexity, clarity, edge case handling, and optimal DSA usage. Suggest improvements and optimize the code. Provide before/after complexity analysis and a rating.

Strictly respond ONLY with a valid JSON object. Do NOT include code block markers (like \`\`\`), markdown, or any extra text.

Format:
{
  "title": "...",
  "reviewSummary": "...",
  "performanceIssues": "...",
  "readabilitySuggestions": "...",
  "optimizationSuggestions": "...",
  "bestPractices": ["...", "..."],
  "codeRating": 0-10,
  "oldCode": "...",
  "optimizedCode": "...",
  "oldTimeComplexity": "...",
  "newTimeComplexity": "...",
  "oldSpaceComplexity": "...",
  "newSpaceComplexity": "..."
}

Code:
`,

  codeGeneration: `
Act as a DSA problem solver. Given a DSA problem, generate a clean and optimal solution. Include appropriate data structures and algorithms. Use clear comments and explain the logic and key steps.

Strictly respond ONLY with a valid JSON object. Do NOT include code block markers (like \`\`\`), markdown, or any extra text.

Format:
{
  "title": "...",
  "generatedCode": "...",
  "codeExplanation": "...",
  "importantSteps": ["...", "..."]
}

Problem Statement / Requirements:
`,

  explainCode: `
Act as a DSA tutor. Explain the following algorithm or code in a detailed and beginner-friendly way. Break down control flow, logic, key DSA concepts (like recursion, dynamic programming, graphs), and highlight edge case handling.

Strictly respond ONLY with a valid JSON object. Do NOT include code block markers (like \`\`\`), markdown, or any extra text.

Format:
{
  "title": "...",
  "summary": "...",
  "lineByLineExplanation": ["...", "..."],
  "importantFunctions": ["...", "..."],
  "controlFlow": "...",
  "edgeCases": ["...", "..."]
}

Code:
`,

  convertCode: `
Act as a multilingual DSA expert. Convert the following code to the specified target language, preserving DSA logic and efficiency. Annotate key differences and tips relevant to the target language and DSA-specific syntax.

Strictly respond ONLY with a valid JSON object. Do NOT include code block markers (like \`\`\`), markdown, or any extra text.

Format:
{
  "title": "...",
  "convertedCode": "...",
  "conversionNotes": "...",
  "languageTips": ["...", "..."]
}

Target Language:
Code:
`,

  generateTestCases: `
Act as a professional DSA tester. Generate comprehensive test cases for the given algorithm, including normal, edge, and corner cases. Focus on input constraints, recursion limits, sorting/searching conditions, etc.

Strictly respond ONLY with a valid JSON object. Do NOT include code block markers (like \`\`\`), markdown, or any extra text.

Format:
{
  "title": "...",
  "testCases": [
    {
      "description": "...",
      "input": "...",
      "expectedOutput": "..."
    },
    {
      "description": "...",
      "input": "...",
      "expectedOutput": "..."
    }
  ]
}

Code:
`
};

module.exports = promptsObj;
