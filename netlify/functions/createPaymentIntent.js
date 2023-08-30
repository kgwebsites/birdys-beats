const stripe = require('stripe')(process.env.STRIPE_SECRET);

export async function getStaticData({ graphql }) {
  const data = await graphql(graphql`
    query AllProductPricesQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              price
              title
            }
          }
        }
      }
    }
  `);
  return data;
}

const getProducts = (productMap, productIds) => {
  return productIds.map((productId) => productMap.get(productId));
};

const createProductsMap = (data) => {
  const map = new Map();
  data.allMarkdownRemark.edges.forEach((product) => {
    map.set(product.node.id, {
      price: product.node.frontmatter.price,
      title: product.node.frontmatter.title,
    });
  });
  return map;
};

exports.handler = async (event, _context, { data }) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    console.error('body parsing failed', e);
  }
  const productMap = createProductsMap(data);
  const products = getProducts(productMap, body.productIds);
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
    success_url: '/success',
    cancel_url: '/cancel',
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
