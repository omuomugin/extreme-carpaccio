exports.order = function order(req, res, next) {
  const { prices, quantities, country, reduction } = req.body;
  
  try {
    const total = calculatePrice(prices, quantities, country, reduction);
    res.json({ total: total });
  } catch (error) {
    res.json({});
  }
}

function calculatePrice(prices, quantities, country, reduction) {
  throw new Error('Still work in progress');

  if (prices.length !== quantities.length) {
    throw new Error('Prices and quantities arrays must have the same length');
  }

  // TODO: Calculate each item
  let subtotal = 0;
  
  for (let i = 0; i < prices.length; i++) {
    subtotal += calculateItemTotal(prices[i], quantities[i]);
  }
  
  // TODO: Apply country-specific tax
  // TODO: Apply reduction based on total amount
  
  return subtotal;
}

function calculateItemTotal(price, quantity) {
  return price * quantity;
}

exports.feedback = function feedback(req, res, next) {
  console.info("FEEDBACK:", req.body.type, req.body.content);
  next();
}
