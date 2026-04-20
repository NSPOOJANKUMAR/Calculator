const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Evaluates a mathematical expression safely
 * @param {string} expression - The mathematical expression to evaluate
 * @returns {string} The result of the calculation
 */
function calculate(expression) {
  try {
    // Remove spaces and replace × with * and ÷ with /
    let sanitizedExpression = expression
      .replace(/\s/g, '')
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    // Validate that the expression only contains allowed characters
    if (!/^[0-9+\-*/.]*$/.test(sanitizedExpression)) {
      throw new Error('Invalid characters in expression');
    }

    // Use Function constructor instead of eval for safer evaluation
    // eslint-disable-next-line no-new-func
    const result = new Function('return ' + sanitizedExpression)();

    // Check if result is a valid number
    if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
      return 'Error';
    }

    // Return the result as a string, rounded to avoid floating point errors
    return String(Math.round(result * 100000000) / 100000000);
  } catch (error) {
    return 'Error';
  }
}

app.post('/calculate', (req, res) => {
  const { expression } = req.body;

  if (!expression) {
    return res.status(400).json({ error: 'Expression is required' });
  }

  const result = calculate(expression);
  res.json({ result });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

// Export for Lambda or testing
module.exports = { calculate };
