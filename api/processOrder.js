const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.handler = async (event, _context) => {
  const { paymentIntent } = event.queryStringParameters;
  const payment = await stripe.paymentIntents.retrieve(paymentIntent);
  const { email } = payment;
  console.log(payment);
};
