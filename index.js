const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const stripe = require("stripe")(process.env.SECRET);
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.URL, // Replace with your React app's URL
  })
);

app.post("/payment", async (req, res) => {
  const { token, amount } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount,
      currency: "RON",
      source: token.id,
      description: "Online Payment",
    });
    console.log(true);

    res
      .status(200)
      .json({ message: "Plata realizata cu succes!", charge, ok: true });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Plata nearealizata!", ok: false });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
