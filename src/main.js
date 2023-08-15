/* import http from "http";



const server = http.createServer((req, res) => {
  res.end("Hola buenos días");
});

//iniciar servidor

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
}); */
import express from "express";
import { ProductManager } from "./ProductManager.js";

const PORT = 4000;
const app = express();
const PM = new ProductManager();
let prods = await PM.getProducts();

app.use(express.json()); //Defino que esta app conozca json

app.get("/", (req, res) => {
  res.status(200).send("Hola buenos días");
});
app.get("/productos", async (req, res) => {
  const { limit, categoria } = req.query;

  let filteredProds = prods;

  if (categoria) {
    filteredProds = filteredProds.filter(
      (prod) => prod.categoria === categoria
    );
  }

  if (limit) {
    const parsedLimit = parseInt(limit);
    filteredProds = filteredProds.slice(0, parsedLimit);
  }

  res.send(filteredProds);
});
app.get("/productos/:id", async (req, res) => {
  const prodId = parseInt(req.params.id);
  const prod = prods.find((product) => product.id === prodId);
  if (prod) {
    res.status(200).send(prod);
  } else {
    res.status(404).send("Producto no existente");
  }
});

app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = prods.findIndex((prod) => prod.id === parseInt(id));
  if (productIndex != -1) {
    prods = prods.filter((prod) => prod.id != parseInt(id));
    res.status(200).send(`Producto eliminado`);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

app.post("/productos", (req, res) => {
  console.log(req.body);
  const producto = prods.find((prod) => prod.code === req.body.code);
  if (producto) {
    res.status(400).send("Producto ya existente");
  } else {
    prods.push(req.body);
    res.status(200).send("Producto creado");
  }
});

app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { title, categoria, code, price } = req.body;
  const productIndex = prods.findIndex((prod) => prod.id === parseInt(id));
  if (productIndex != -1) {
    prods[productIndex].title = title;
    prods[productIndex].categoria = categoria;
    prods[productIndex].code = code;
    prods[productIndex].price = price;
    res.status(200).send(`Producto ${title} actualizado`);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
