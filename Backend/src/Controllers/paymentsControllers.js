const Stripe = require('stripe');
const stripe = new Stripe(
  'sk_test_51NNLpXJ1lb1YFkHpt7cNexUW59vJoBx40Sta98qZ2Bqa8bRzrTaU1gjsNAWMrpYseNMP4u3KRJZxMbjBXT9LtuJC00e9OgY4Hm'
);
const DOMAIN = 'https://re-store-six.vercel.app/cart/checkout/order';

const createSession = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
      },
    });
    console.log(req.body.userId);

    const lineItems = req.body.cartItems.map((product) => {
      const { name, description, unit_amount, quantity, images } = product;
      return {
        price_data: {
          product_data: {
            name: name,
            description: description,
            images: images,
          },
          currency: 'USD',
          unit_amount: unit_amount,
        },
        quantity: quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${DOMAIN}?success=true`,
      cancel_url: `${DOMAIN}?success=false`,
      customer: customer.id,
    });

    const paymentUrl = session.url;
    console.log(paymentUrl);
    res.json({ url: paymentUrl });
  } catch (error) {
    console.error('Error al crear la sesión de pago:', error);
    res.status(500).send('Error al crear la sesión de pago');
  }
};

module.exports = { createSession };
