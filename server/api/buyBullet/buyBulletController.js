/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
const CoinqvestClient = require('coinqvest-merchant-sdk');
const dotenv = require('dotenv');
require('crypto');

dotenv.config();

function bulletsRepo() {
  let customerId;

  const client = new CoinqvestClient(
    process.env.PUBLIC,
    process.env.PRIVATE
  );

  function testAuth() {
    client.get('/auth-test', null, (response) => {
      console.log(response.status);
      console.log(response.data);
    });
  }

  // This controller gets used in userController in postRegister controller
  function createCustomer(customerObj) {
    return new Promise((resolve, reject) => {
      client.post('/customer',
        customerObj,
        (response) => {
          console.log(response.status);
          console.log(response.data);
          if (response.status !== 200) {
            console.log('Could not create customer. Inspect above log entry.');
            return reject();
          }
          const { customerId } = response.data;
          resolve(customerId);
        });
    });
  }

  function buyBullet(req, res, next) {
    const chargeObj = {
      charge: {
        customerId: req.user.customerId,
        currency: 'USD', // specifies the billing currency
        lineItems: [{ // a list of line items included in this charge
          description: 'NFL Last Longer Entry',
          netAmount: 110,
          quantity: req.body.bulletCount
        }],
      },
      pageSettings: {
        displaySellerInfo: false
      },
      settlementCurrency: 'USD' // specifies in which currency you want to settle
    };

    client.post('/checkout/hosted',
      chargeObj,
      function (response) {
        console.log(response.status);
        console.log(response.data);
        // console.log(`bullet count = ${req.body.bulletCount}`);
        // console.log(`customer ID = ${req.user.customerId}`)

        if (response.status !== 200) {
          // something went wrong, let's abort and debug by looking at our log file
          console.log('Could not create checkout.');
          return;
        }

        // the checkout was created
        // response.data now contains an object as specified in the success response here: https://www.coinqvest.com/en/api-docs#post-checkout
        const { checkoutId } = response.data; // store this persistently in your database
        const { url } = response.data; // redirect your customer to this URL to complete the payment

        res.redirect(url);
      });
  }

  return { testAuth, createCustomer, buyBullet };
}

module.exports = bulletsRepo();
