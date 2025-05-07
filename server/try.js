const str = "```json\n{\n  \"errorSummary\": \"Typographical error in the console log statement.\",\n  \"errorExplanation\": \"The code contains a typo: `consle.lg` should be `console.log`.  `consle` is not a valid JavaScript object, and therefore the `lg` method (which doesn't exist) cannot be called. This results in a `ReferenceError: consle is not defined` in most JavaScript environments.\",\n  \"correctedCode\": \"console.log('45');\",\n  \"codeExplanation\": \"The corrected code uses the correct spelling `console.log`. This is the standard JavaScript function for printing output to the browser's console.  The string '45' is passed as an argument to the `console.log` function, causing it to display '45' in the console.\",\n  \"bestPractices\": [\"Use a reliable code editor with syntax highlighting and linting capabilities. These tools will often highlight typos and other common errors immediately.\",\"Always double-check variable and function names for typos. Careful attention to detail is crucial in programming.\",\"Employ a consistent coding style to improve code readability and reduce errors. Consistent use of spacing and indentation enhances the maintainability of code.\",\"Use a debugger tool to step through your code and inspect variable values. This can help identify the source of runtime errors more easily.\"]\n}\n```\n"


// Step 1: Extract only the JSON part between the ```json and ```
const jsonStr = str.match(/```json\s*([\s\S]*?)\s*```/)[1].trim();

// Step 2: Parse the string into an object
const parsedObj = JSON.parse(jsonStr);

// Step 3: Destructure values into separate variables
const {
  errorSummary,
  errorExplanation,
  correctedCode,
  codeExplanation,
  bestPractices
} = parsedObj;

// Step 4: Log the results
console.log("📝 Error Summary:", errorSummary);
console.log("❌ Error Explanation:", errorExplanation);
console.log("✅ Corrected Code:", correctedCode);
console.log("📘 Code Explanation:", codeExplanation);
console.log("💡 Best Practices:");
bestPractices.forEach((tip, index) => {
  console.log(`${index + 1}. ${tip}`);
});
