const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const port = 3000; 

const productManager = new ProductManager(); 


app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = limit ? await productManager.getProducts(parseInt(limit, 10)) : await productManager.getProducts();
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);
  const product = productManager.getProductById(productId);
  res.json({ product });
});


app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});