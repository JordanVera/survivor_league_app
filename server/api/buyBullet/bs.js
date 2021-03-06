const CoinqvestClient = require('coinqvest-merchant-sdk');
const dotenv = require('dotenv');
require('crypto');

dotenv.config();

const client = new CoinqvestClient(
  process.env.PUBLIC,
  process.env.PRIVATE
);

client.post('/checkout/hosted',
    {
        charge:{
            currency: 'USD', // specifies the billing currency
            lineItems: [{ // a list of line items included in this charge
                description: 'T-Shirt',
                netAmount: 10,
                quantity: 1
            }],
            discountItems: [{ // an optional list of discounts
                description: 'Loyalty Discount',
                netAmount: 0.5
            }],
            shippingCostItems: [{ // an optional list of shipping and handling costs
                description: 'Shipping and Handling',
                netAmount: 3.99,
                taxable: false // sometimes shipping costs are taxable
            }],
            taxItems: [{
                name: 'CA Sales Tax',
                percent: 0.0825 // 8.25% CA sales tax
            }]
        },
        settlementCurrency: 'EUR' // specifies in which currency you want to settle
    },
    function (response) {

        console.log(response.status);
        console.log(response.data);

        if (response.status !== 200) {
            // something went wrong, let's abort and debug by looking at our log file
            console.log('Could not create checkout.');
            return;
        }

        // the checkout was created
        // response.data now contains an object as specified in the success response here: https://www.coinqvest.com/en/api-docs#post-checkout
        let checkoutId = response.data['checkoutId']; // store this persistently in your database
        let url = response.data['url']; // redirect your customer to this URL to complete the payment

    }
);