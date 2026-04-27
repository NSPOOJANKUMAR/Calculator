import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('https://your-api-id.execute-api.region.amazonaws.com/test/CalculatorManager');

  const handleNumberClick = (num) => {
    if (display === '0') {
      setDisplay(String(num));
      setExpression(String(num));
    } else {
      setDisplay(display + num);
      setExpression(expression + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      const newDisplay = display + '.';
      setDisplay(newDisplay);
      setExpression(expression + '.');
    }
  };

  const handleOperation = (op) => {
    if (expression && !['+', '-', '×', '÷'].includes(expression[expression.length - 1])) {
      setExpression(expression + op);
      setDisplay(op);
    } else if (!expression) {
      setExpression('0' + op);
      setDisplay(op);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleClearEntry = () => {
    // Remove only the last number/operation
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
    
    if (newExpression === '') {
      setDisplay('0');
    } else {
      // Show the last character of the expression or '0'
      setDisplay(newExpression[newExpression.length - 1] || '0');
    }
  };

  const handleEquals = async () => {
    if (!expression) return;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setDisplay(data.result);
      setExpression(data.result);
    } catch (error) {
      console.error('Error:', error);
      setDisplay('Error');
      setExpression('');
    }
  };

  return (
    <div className="calculator-container">
      <h1>Calculator</h1>
      <div className="calculator">
        <div className="display">{display}</div>
        
        <div className="button-grid">
          {/* Row 1: Clear buttons */}
          <button className="btn btn-clear" onClick={handleClear}>C</button>
          <button className="btn btn-clear" onClick={handleClearEntry}>CE</button>
          <button className="btn btn-operator" onClick={() => handleOperation('÷')}>÷</button>
          <button className="btn btn-operator" onClick={() => handleOperation('×')}>×</button>

          {/* Row 2: Numbers 7-9 */}
          <button className="btn" onClick={() => handleNumberClick(7)}>7</button>
          <button className="btn" onClick={() => handleNumberClick(8)}>8</button>
          <button className="btn" onClick={() => handleNumberClick(9)}>9</button>
          <button className="btn btn-operator" onClick={() => handleOperation('-')}>−</button>

          {/* Row 3: Numbers 4-6 */}
          <button className="btn" onClick={() => handleNumberClick(4)}>4</button>
          <button className="btn" onClick={() => handleNumberClick(5)}>5</button>
          <button className="btn" onClick={() => handleNumberClick(6)}>6</button>
          <button className="btn btn-operator" onClick={() => handleOperation('+')}>+</button>

          {/* Row 4: Numbers 1-3 */}
          <button className="btn" onClick={() => handleNumberClick(1)}>1</button>
          <button className="btn" onClick={() => handleNumberClick(2)}>2</button>
          <button className="btn" onClick={() => handleNumberClick(3)}>3</button>
          <button className="btn btn-equals" onClick={handleEquals}>=</button>

          {/* Row 5: 0 and decimal */}
          <button className="btn btn-zero" onClick={() => handleNumberClick(0)}>0</button>
          <button className="btn" onClick={handleDecimal}>.</button>
        </div>
      </div>
      
      <div className="api-config">
        <label>
          API Endpoint:
          <input
            type="text"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
            placeholder="http://localhost:3001"
          />
        </label>
      </div>
    </div>
  );
}

export default App;
