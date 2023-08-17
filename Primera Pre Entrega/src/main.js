import express from "express";
import path from "path";
import ProdsRouter from "./Routes/Products.Routes.js";
import CartsRouter from "./Routes/Carts.Routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProdsRouter);
app.use("/api/carts", CartsRouter);

app.use("/static", express.static(path.join(__dirname, "/public")));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
