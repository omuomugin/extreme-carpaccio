// Test script to verify seeded randomization produces consistent sequences
const SeededRandom = require('./server/javascripts/seeded-random');
const repositories = require('./server/javascripts/repositories');
const OrderService = require('./server/javascripts/services/order');

// Mock configuration
const mockConfig = {
  all: () => ({ seed: 42, reduction: 'STANDARD' })
};

console.log('Testing seeded randomization...\n');

// Test 1: SeededRandom basic functionality
console.log('1. Testing SeededRandom with seed 42:');
const rng1 = new SeededRandom(42);
const rng2 = new SeededRandom(42);

console.log('First sequence:');
for (let i = 0; i < 5; i++) {
  console.log(`  ${rng1.randomInt(1, 100)}`);
}

console.log('Second sequence (should be identical):');
for (let i = 0; i < 5; i++) {
  console.log(`  ${rng2.randomInt(1, 100)}`);
}

// Test 2: Order generation consistency
console.log('\n2. Testing order generation consistency:');
const orderService1 = new OrderService(mockConfig);
const orderService2 = new OrderService(mockConfig);

console.log('First order service - 3 orders:');
for (let i = 0; i < 3; i++) {
  const order = orderService1.createOrder({ name: 'STANDARD' });
  console.log(`  Order ${i + 1}: ${order.prices.length} items, country: ${order.country}`);
}

console.log('Second order service - 3 orders (should be identical):');
for (let i = 0; i < 3; i++) {
  const order = orderService2.createOrder({ name: 'STANDARD' });
  console.log(`  Order ${i + 1}: ${order.prices.length} items, country: ${order.country}`);
}

console.log('\nSeeded randomization test completed.');