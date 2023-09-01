// const express = require("express");
// const app = express();
// require("dotenv").config();
// const stripe = require("stripe")(
//   "sk_test_51NhBUiHMkFCUWYGvr6yzApZIeFhHO6vtg39g5bibtj7X7qYBUGv8kBh2ANPwQlJHZW25Idbrbm87VCCTSZ4N14xD00ox5QPZ8s"
// );
// const bodyParser = require("body-parser");
// const cors = require("cors");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(cors());

// app.get("/", cors(), async () => {
//   console.log("ok");
// });

// app.post("/payment", cors(), async (req, res) => {
//   // console.log(req.body.hidden);
//   let { amount, id } = req.body;
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount,
//       currency: "RON",
//       automatic_payment_methods: true,
//       description: "Spatula company",
//       payment_method: id,
//       return_url:"http://localhost:3000/checkout",
//       confirm: true,

//     });
//     console.log("Payment", payment);
//     res.json({
//       message: "Payment successful",
//       success: true,
//     });
//   } catch (error) {
//     console.log("Error", error);
//     res.json({
//       message: "Payment failed",
//       success: false,
//     });
//   }
// });

// app.listen(process.env.PORT || 4000, () => {
//   console.log("Sever is listening on port 4000");
// });
const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51NhBUiHMkFCUWYGvr6yzApZIeFhHO6vtg39g5bibtj7X7qYBUGv8kBh2ANPwQlJHZW25Idbrbm87VCCTSZ4N14xD00ox5QPZ8s"
);
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your React app's URL
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

    res.status(200).json({ message: "Payment successful", charge });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Payment failed" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
