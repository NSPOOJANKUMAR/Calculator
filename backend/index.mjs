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

/**
 * AWS Lambda handler for API Gateway
 */
export const handler = async (event) => {
  try {
    let body;
    
    // Parse the request body
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else {
      body = event.body;
    }

    const expression = body.expression;

    if (!expression) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Expression is required' })
      };
    }

    const result = calculate(expression);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ result })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
