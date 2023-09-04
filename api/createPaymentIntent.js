const stripe = require('stripe')(process.env.STRIPE_SECRET);

const getProducts = (productMap, productIds) => {
  return productIds
    .map((productId) => productMap.get(productId))
    .filter((product) => !!product);
};

const createProductsMap = (allProducts) => {
  const map = new Map();
  allProducts.allMarkdownRemark.edges.forEach((product) => {
    map.set(product.node.id, {
      price: product.node.frontmatter.price,
      title: product.node.frontmatter.title,
    });
  });
  return map;
};

exports.handler = async (event, _context) => {
  let body;
  try {
    body = JSON.parse(event.body);
    if (!body) throw new Error('body missing from request');
  } catch (e) {
    console.error('body parsing failed', e);
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: 'Invalid parameters',
      }),
    };
  }
  const allProducts = require('./product-manifest.json');
  const productMap = createProductsMap(allProducts);
  const products = getProducts(productMap, body.productIds);
  if (products.length < 1) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        error: 'No products found',
      }),
    };
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: products.reduce((curr, res) => res + curr.price, 0),
    currency: 'usd',
    payment_method_types: ['link', 'card'],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      secret: paymentIntent.client_secret,
      error: null,
    }),
  };
};
