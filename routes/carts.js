const express = require("express");
const Users = require("../schemas/users");
const Cart = require("../schemas/cart");
const router = express.Router();

router.get("/carts", async (req, res) => {
  const carts = await Cart.find();
  const usersIds = carts.map((cart) => cart.usersId);

  const users = await Users.find({ usersId: usersIds });

  const results = carts.map((cart) => {
		return {
			quantity: cart.quantity,
			users: users.find((item) => item.usersId === cart.usersId)
		};
  });

  res.json({
    carts: results,
  });
});

module.exports = router;