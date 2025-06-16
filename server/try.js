const aiRawText = `
{
  "title": "Debugging Selection Sort Implementation",
  "errorSummary": "The provided code has a minor syntax error: it's missing the \`<vector>\` include for the \`std::vector\` type.  Functionally, the algorithm is correct.",
  "errorExplanation": "The compiler will fail to compile the code because \`std::vector\` is not declared. This is due to the missing \`#include <vector>\` directive. The code itself correctly implements the selection sort algorithm; there are no logical errors in the sorting logic.",
  "correctedCode": "#include <iostream>\\n#include <vector>\\n\\nvoid selectionSort(std::vector<int>& arr) {\\n    int n = arr.size();\\n    for (int i = 0; i < n - 1; ++i) {\\n        int min_idx = i;\\n        for (int j = i + 1; j < n; ++j) {\\n            if (arr[j] < arr[min_idx]) {\\n                min_idx = j;\\n            }\\n        }\\n        if (min_idx != i) {\\n            std::swap(arr[i], arr[min_idx]);\\n        }\\n    }\\n}\\n\\nint main() {\\n    std::vector<int> arr = {64, 25, 12, 22, 11};\\n    selectionSort(arr);\\n    std::cout << \\"Sorted array: \\";\\n    for (int val : arr) {\\n        std::cout << val << \\" \\";\\n    }\\n    std::cout << std::endl;\\n    return 0;\\n}",
  "codeExplanation": "The corrected code includes the necessary \`<vector>\` header file.  The \`selectionSort\` function iterates through the array, finds the minimum element in the unsorted part, and swaps it with the element at the beginning of the unsorted part. This process repeats until the entire array is sorted. The \`main\` function demonstrates the usage of the \`selectionSort\` function with a sample vector.",
  "bestPractices": [
    "Always include necessary header files.  The compiler will provide errors if you forget.",
    "Use descriptive variable names (e.g., \`minIndex\` instead of \`min_idx\`).",
    "Add comments to explain complex or non-obvious parts of the code.",
    "Test your algorithms thoroughly with various inputs, including edge cases (empty array, array with duplicates, already sorted array).",
    "Consider using a debugger to step through the code and observe the values of variables at each step. This helps in identifying errors easily.",
    "Before writing complex algorithms, design them carefully using pseudocode or flowcharts. This will help in catching potential errors during the design phase itself."
  ]
}
`;

let aiOutput = null;

if (aiRawText) {
  try {
    // In case the JSON is in a code block (e.g., surrounded by ```json ... ```)
    const match = aiRawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);

    const jsonText = match ? match[1] : aiRawText;

    aiOutput = JSON.parse(jsonText);
    console.log("✅ Parsed AI output:", aiOutput);
  } catch (err) {
    console.error("❌ Failed to parse AI JSON:", err);
    console.log("Raw text for debugging:", aiRawText);
  }
} else {
  console.warn("⚠️ No AI text found.");
}


// try {
//   const parsed = JSON.parse(aiRawText);
//   console.log("✅ Successfully parsed AI response:", parsed);
// } catch (err) {
//   console.error("❌ Failed to parse AI response:", err.message);
// }
