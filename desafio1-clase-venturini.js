class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar campos obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
      }
  
      // Validar código único
      if (this.products.some(product => product.code === code)) {
        console.error("El código ya existe");
        return;
      }
  
      // Agregar producto con id autoincrementable
      const product = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(product);
      console.log("Producto agregado:", product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado");
      }
    }
  }
  
  // Ejemplo de uso
  const manager = new ProductManager();
  
  manager.addProduct("Producto 1", "Descripción 1", 10.99, "/img1.jpg", "P1", 50);
  manager.addProduct("Producto 2", "Descripción 2", 19.99, "/img2.jpg", "P2", 30);
  
  console.log("Todos los productos:", manager.getProducts());
  
  const productIdToFind = 2;
  const foundProduct = manager.getProductById(productIdToFind);

  console.log(`Producto con ID  ${productIdToFind}:` , foundProduct);
