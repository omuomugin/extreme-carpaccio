# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Extreme Carpaccio is a competitive coding game where a central server sends purchase orders to client applications. Clients must calculate order totals (including taxes and reductions) and respond correctly to earn points. This repository contains both server and client implementations.

### Core Architecture

**Server (`/server/`)**: Node.js/Express application that:
- Manages client registration and scoring
- Dispatches orders to registered clients via HTTP POST
- Validates responses and provides feedback
- Hosts web dashboard for monitoring

**Clients (`/clients/`)**: HTTP servers in various languages that:
- Register with the central server
- Receive orders on `/order` endpoint
- Calculate totals and respond with `{"total": amount}`
- Receive feedback on `/feedback` endpoint

## Common Commands

### Server Development
```bash
cd server/
npm install        # Install dependencies
npm start         # Start server (runs on port 3000)
npm test          # Run jasmine-node tests
npm run lint      # Run ESLint on javascripts/
```

Debug mode:
```bash
DEBUG=xcarpaccio:server npm start
```

### Client Development Examples

**JavaScript Express client:**
```bash
cd clients/javascript/express/
npm install
npm test          # Run mocha tests
npm run nodemon   # Start with auto-reload
```

**TypeScript client:**
```bash
cd clients/typescript/
npm install
npm test          # Run jest tests (watch mode)
npm start         # Start server
npm run start-watch  # Start with auto-reload
```

## Key Configuration

**Server configuration** (`server/configuration.json`):
- `active`: Enable/disable order sending
- `cashFreeze`: Freeze scoring for synchronized starts
- `reduction`: Reduction strategy ("STANDARD", "HALF PRICE", "PAY THE PRICE")
- `offlinePenalty`: Penalty for unreachable clients
- `badRequest`: Settings for sending corrupted test orders

## Communication Protocol

**Client Registration**: POST to server `/seller` with `{name, url, password}`

**Order Flow**:
1. Server sends POST to client `/order` with:
   ```json
   {
     "prices": [10.5, 25.0],
     "quantities": [2, 1], 
     "country": "FR",
     "reduction": "STANDARD"
   }
   ```
2. Client responds with: `{"total": calculated_amount}`
3. Server sends feedback to client `/feedback`

## Business Logic

**Tax Calculation**: Apply country-specific tax rates (e.g., FR=20%, DE=20%, IT=25%)

**Reductions** (applied after tax):
- ≥50,000 EUR: 15%
- ≥10,000 EUR: 10% 
- ≥7,000 EUR: 7%
- ≥5,000 EUR: 5%
- ≥1,000 EUR: 3%

**Scoring**:
- Correct answer: Earn the bill amount
- Wrong answer: Lose 50% of correct amount
- Unreachable/404: No penalty

## Key Files

**Server**:
- `server/javascripts/routes.js`: Client registration endpoints
- `server/javascripts/services/dispatcher.js`: Order distribution logic
- `server/javascripts/services/order.js`: Order calculation and sending
- `server/javascripts/utils.js`: HTTP communication utilities

**Client Templates**: Multiple language implementations showing required endpoints (`/order`, `/feedback`, `/ping`)

## Testing

Most clients include test suites. Test frameworks vary by implementation:
- JavaScript: Mocha/Chai or Jasmine
- TypeScript: Jest
- Server: Jasmine-node

Always run tests before committing changes to ensure order calculation logic remains correct.