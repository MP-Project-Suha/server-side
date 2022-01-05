const stripe = require("stripe")(
    "sk_test_51KBw4EH8miGnakuDoGpe5p14lrWMD2oEtfglwIM48djAh0CcrkiSlsn5KSslRV4y9XyuOYyD2cQ1XGKYStxkhcxu00frixNFDc"
  );

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

// Payment
const payment = async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = { payment };