# Extreme Carpaccio - Single Player Mode

Extreme Carpaccio is a coding game designed to encourage and favour incremental development and Continuous Delivery best practices.

This version has been modified for single-player local development. The server automatically connects to a client running on localhost:9000, eliminating the need for manual registration and multi-player setup.

## How it Works

1. **Server** (localhost:3000): Sends HTTP requests with purchase orders to the client
2. **Client** (localhost:9000): Receives orders, calculates totals, and responds
3. **Scoring**: Earn points for correct answers, lose points for wrong ones
4. **Learning**: View request history and track your progress over time

## Quick Start

1. **Start the Server**:
   ```bash
   cd server
   npm install
   npm start
   ```

2. **Start the Client**:
   ```bash
   cd clients
   npm install
   node server.js
   ```

3. **Open Dashboard**: Visit http://localhost:3000 to view your score and request history

4. **Implement Logic**: Edit `clients/lib/process.js` to calculate order totals correctly

## Game Rules

Calculate the total for each order considering:
- **Prices** and **quantities** of items
- **Country-specific tax rates** (e.g., FR=20%, DE=20%, IT=25%)
- **Volume discounts** applied after tax:
  - ≥50,000 EUR: 15% discount
  - ≥10,000 EUR: 10% discount  
  - ≥7,000 EUR: 7% discount
  - ≥5,000 EUR: 5% discount
  - ≥1,000 EUR: 3% discount

**Scoring**:
- Correct answer: Earn the bill amount
- Wrong answer: Lose 50% of correct amount
- No response/invalid format: No penalty

Have fun :D

## People running Extreme Carpaccio
- Find out what people are saying about Extreme Carpaccio on [Twitter](https://twitter.com/search?vertical=default&q=%22extreme%20carpaccio%22%20OR%20%22Xtreme%20carpaccio%22%20OR%20%23ExtremeCarpaccio&src=typd)
