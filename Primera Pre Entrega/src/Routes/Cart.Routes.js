import { Router } from "express";
import { CartManager, Cart } from "../CartManager.js";

const cartsRouter = Router();
const cartManager = new CartManager();

cartsRouter.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.status(200).send(carts);
});

cartsRouter.post("/", async (req, res) => {
  const newCart = new Cart();
  await cartManager.addCart(newCart);
  res.status(201).send(newCart);
});

cartsRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  if (cart) {
    res.status(200).send(cart.products);
  } else {
    res.status(404).send("Carrito no encontrado");
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (!quantity || isNaN(quantity) || quantity <= 0) {
    return res.status(400).send("Cantidad inválida");
  }

  const productAdded = await cartManager.addProductToCart(
    cid,
    pid,
    parseInt(quantity)
  );

  if (productAdded) {
    res.status(201).send("Producto agregado al carrito correctamente");
  } else {
    res.status(404).send("Carrito o producto no encontrado");
  }
});

export default cartsRouter;
