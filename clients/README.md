# Extreme Carpaccio Client - Single Player Mode

Express.js client for the Extreme Carpaccio coding game, configured for single-player local development.

## Install

```bash
npm install
```

## Start

```bash
npm start
```

The client will start on port 9000 (configured for single-player mode). The server expects the client to run on localhost:9000.

You can also specify a custom port:
```bash
PORT=9000 npm start
```

## Development with Auto-reload

```bash
npm run nodemon
```
> About nodemon: http://nodemon.io/

## Test

```bash
npm test
```

## Implementation

Edit `lib/process.js` to implement the order calculation logic. The client receives HTTP POST requests at `/order` with purchase order data and must respond with the correct total.

### Order Format
```json
{
  "prices": [15.99, 23.99],
  "quantities": [2, 1], 
  "country": "FR",
  "reduction": "STANDARD"
}
```

### Response Format
```json
{
  "total": 67.17
}
```

Calculate totals considering:
- Prices × quantities for each item
- Country-specific tax rates
- Volume discounts applied after tax

See the main README.md for detailed game rules and scoring information.
