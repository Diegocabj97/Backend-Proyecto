import { promises as fs } from "fs";

class Cart {
  constructor() {
    this.id = Cart.incrementarId();
    this.products = [];
  }

  static incrementarId() {
    return new Date().getTime();
  }
}

export class CartManager {
  constructor() {
    this.path = "Carts.json";
  }

  async getCarts() {
    try {
      const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
      return carts;
    } catch (error) {
      return [];
    }
  }

  async addCart(cart) {
    const carts = await this.getCarts();
    carts.push(cart);
    await this.saveCarts(carts);
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cart = carts.find((c) => c.id == id);
    return cart;
  }

  async addProductToCart(cartId, productId, quantity) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((c) => c.id == cartId);

    if (cartIndex !== -1) {
      const cart = carts[cartIndex];
      const existingProduct = cart.products.find((p) => p.product == productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await this.saveCarts(carts);
      return true;
    }

    return false;
  }

  
}
