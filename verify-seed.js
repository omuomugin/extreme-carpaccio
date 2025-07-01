// Script to verify that seeded randomization produces identical request sequences
const { spawn } = require('child_process');
const path = require('path');

let firstRun = [];
let secondRun = [];

function captureOrders(testRun) {
  return new Promise((resolve) => {
    const serverProcess = spawn('node', ['app.js'], { 
      cwd: path.join(__dirname, 'server'),
      stdio: 'pipe'
    });
    
    let orderCount = 0;
    let orders = [];
    
    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      
      // Look for order lines
      const orderMatches = output.match(/Sending order \{.*?\}/g);
      if (orderMatches) {
        orderMatches.forEach(match => {
          const orderJson = match.replace('Sending order ', '');
          try {
            const order = JSON.parse(orderJson);
            orders.push({
              items: order.prices.length,
              country: order.country,
              firstPrice: order.prices[0],
              firstQuantity: order.quantities[0]
            });
            orderCount++;
            
            if (orderCount >= 5) {
              serverProcess.kill();
              resolve(orders.slice(0, 5));
            }
          } catch (e) {
            // Skip invalid JSON
          }
        });
      }
    });
    
    // Timeout after 30 seconds
    setTimeout(() => {
      serverProcess.kill();
      resolve(orders.slice(0, 5));
    }, 30000);
  });
}

async function testSeedConsistency() {
  console.log('Testing seed consistency...\n');
  
  console.log('First run - capturing first 5 orders:');
  firstRun = await captureOrders(1);
  firstRun.forEach((order, i) => {
    console.log(`  Order ${i + 1}: ${order.items} items, ${order.country}, price[0]=${order.firstPrice}, qty[0]=${order.firstQuantity}`);
  });
  
  // Wait a moment
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\nSecond run - capturing first 5 orders:');
  secondRun = await captureOrders(2);
  secondRun.forEach((order, i) => {
    console.log(`  Order ${i + 1}: ${order.items} items, ${order.country}, price[0]=${order.firstPrice}, qty[0]=${order.firstQuantity}`);
  });
  
  console.log('\nComparison:');
  let identical = true;
  for (let i = 0; i < Math.min(firstRun.length, secondRun.length); i++) {
    const first = firstRun[i];
    const second = secondRun[i];
    const match = first.items === second.items && 
                  first.country === second.country && 
                  first.firstPrice === second.firstPrice && 
                  first.firstQuantity === second.firstQuantity;
    
    console.log(`  Order ${i + 1}: ${match ? '✅ IDENTICAL' : '❌ DIFFERENT'}`);
    if (!match) {
      identical = false;
      console.log(`    First:  ${first.items} items, ${first.country}, ${first.firstPrice}, ${first.firstQuantity}`);
      console.log(`    Second: ${second.items} items, ${second.country}, ${second.firstPrice}, ${second.firstQuantity}`);
    }
  }
  
  console.log(`\nResult: ${identical ? '✅ Seeds working - identical sequences!' : '❌ Seeds not working - sequences differ'}`);
}

testSeedConsistency().catch(console.error);