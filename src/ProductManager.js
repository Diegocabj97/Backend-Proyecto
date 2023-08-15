import { promises as fs } from "fs";
export class ProductManager {
  constructor() {
    this.path = "Productos.json";
  }

  async getProducts() {
    let prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return prods;
  }
  async getProductById(id) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = prods.find((product) => product.id === id);

    if (prod) {
      console.log(prod);
    } else {
      console.log("Producto no encontrado");
    }
    return prod;
  }
  async addProduct(product) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = prods.find((prod) => prod.id === product.id);
    if (prod) {
      console.log("El producto ya se encuentra agregado");
    } else {
      prods.push(product);
      await fs.writeFile(this.path, JSON.stringify(prods));
      console.log("Producto agregado correctamente");
    }
  }
  async deleteProduct(id) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = prods.find((prod) => prod.id === id);
    if (prod) {
      await fs.writeFile(
        this.path,
        JSON.stringify(prods.filter((prod) => prod.id != id)),
        console.log("Producto eliminado correctamente")
      );
    } else {
      console.log("Producto no encontrado");
    }
  }
  async updateProduct(id, product) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prodindex = prods.findIndex((prod) => prod.id === id);

    if (prodindex != -1) {
      prods[prodindex].code = product.code;
      prods[prodindex].title = product.title;
      prods[prodindex].price = product.price;
      prods[prodindex].thumbnail = product.thumbnail;
      prods[prodindex].stock = product.stock;
      prods[prodindex].categoria = product.categoria;
      prods[prodindex].description = product.description;

      await fs.writeFile(this.path, JSON.stringify(prods));
    } else {
      console.log("Primero agregue el producto para poder actualizarlo");
    }
  }
}
class Product {
  constructor(code, title, price, thumbnail, stock, categoria, description) {
    this.id = Product.incrementarId();
    this.code = code;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.categoria = categoria;
    this.description = description;
  }
  static incrementarId() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }
}
const producto1 = new Product(
  "PV001PC",
  "GPU Nvidia",
  40000,
  "src",
  10,
  "Placas de Video",
  "Potencia gráfica increíble",
  []
);
const producto2 = new Product(
  "AL001PC",
  "SSD Samsung",
  15000,
  "src",
  50,
  "Almacenamiento",
  "Almacenamiento rápido y confiable",
  []
);
const producto3 = new Product(
  "FP001PC",
  "Fuente de Poder EVGA 850W",
  17000,
  "src",
  20,
  "Fuentes de Poder",
  "La mejor Fuente del mercado"
);

/* productManager.addProduct(producto1);
productManager.addProduct(producto2);
productManager.addProduct(producto3);
productManager.getProducts();; */

////////////////////////////  MANEJO DE ARCHIVOS ////////////////////////////
/* 
import fs from "fs";

////Forma sincrónica////
//Crear un archivo
fs.writeFileSync("./ejemplo.txt", "Hola buenas tardes ");
//Para consultar si existe un archivo
// fs.existsSync ---> TRUE // FALSE
if (fs.existsSync("./ejemplo.txt")) {
  let contenido = fs.readFileSync("./ejemplo.txt", "utf-8"); //Leer el contenido del archivo
  console.log(contenido);

  //Agregar contenido al archivo

  fs.appendFileSync("./ejemplo.txt", "Todo bien? Me alegro!!");

  //Borrar contenido
  fs.unlinkSync("./ejemplo.txt");
}

////////////Forma Asincronica/////////////////


////Forma sincrónica////
//Crear un archivo
const consultarJSON = async () => {
  await fs.writeFile("./ejemplo.json", "Hola buenas tardes ");
  let contenido = await fs.readFile("./ejemplo.json", "utf-8"); //Leer el contenido del archivo
  console.log(contenido);
  //Agregar contenido al archivo
  await fs.appendFile("./ejemplo.json", "Todo bien? Me alegro!!");
  //Borrar contenido
  //await fs.unlink("./ejemplo.json");
};

consultarJSON(); */
