# Calculator Monorepo

A full-stack calculator application built with React and Node.js.

## Project Structure

```
Calculator/
├── backend/          # Node.js backend service
├── frontend/         # React frontend application
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:3001`

### Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## Features

- **Frontend**: React calculator with a clean UI
  - Number buttons (0-9)
  - Decimal point support
  - Operations: +, −, ×, ÷
  - Clear (C) and Clear Entry (CE) functions
  - Expression display
  
- **Backend**: Express.js server
  - POST `/calculate` endpoint
  - Safely evaluates mathematical expressions
  - Returns results as JSON

## Architecture

The calculator uses a client-server architecture:
1. User interacts with the React interface
2. Frontend builds the expression string as buttons are clicked
3. When "=" is pressed, the expression is sent to the backend
4. Backend evaluates the expression and returns the result
5. Result is displayed on the frontend

## API

### POST /calculate

Request body:
```json
{
  "expression": "5+3*2"
}
```

Response:
```json
{
  "result": "11"
}
```

## Testing Locally

1. Start the backend: `cd backend && npm start`
2. In another terminal, start the frontend: `cd frontend && npm start`
3. Open `http://localhost:3000` in your browser
4. Try some calculations:
   - `5 + 3 = ` (shows 8)
   - `10 × 2.5 = ` (shows 25)
   - `100 ÷ 4 = ` (shows 25)

## Deployment

- **Frontend**: Deploy to AWS Amplify
- **Backend**: Deploy to AWS Lambda

See the tutorial for detailed deployment instructions.