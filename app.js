const express = require('express');
const ProductManager = require('/productManager');

const app = express();
const port = 3000; 

const productManager = new ProductManager(); 


app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = limit ? productManager.getProducts(parseInt(limit, 10)) : productManager.getAllProducts();
  res.json({ products });
});


app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);
  const product = productManager.getProductById(productId);
  res.json({ product });
});


app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});