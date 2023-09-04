const stripe = require('stripe')(process.env.STRIPE_SECRET);

const getProducts = (productMap, productIds) => {
  return productIds.map((productId) => productMap.get(productId));
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
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
        },
        unit_amount: product.price,
      },
      quantity: 1,
    })),
    mode: 'payment',
    success_url: 'https://birdysbeats.netlify.dev/success',
    cancel_url: 'https://birdysbeats.netlify.dev/cancel',
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
      error: null,
    }),
  };
};
