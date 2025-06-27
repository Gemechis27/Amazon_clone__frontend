const { onRequest } = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY || functions.config().stripe.key);

const app = express();

// CORS middleware
app.use(cors({ origin: true }));

// JSON body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total); 

  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({ // debug fix: corrected method name
      amount: total,
      currency: "usd"
    });
    console.log(paymentIntent);

    res.status(201).json({
        client_secret:paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({ message: "total must be greater than 0" }); // debug fix: no paymentIntent in else
  }
});

exports.api=onRequest(app);