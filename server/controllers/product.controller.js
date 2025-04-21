
import { Product } from '../models/product.model.js';
import products from '../data/products.js'


export const seedProducts = async (req, res) => {
  try {
    // Optional: Clean old data
    await Product.deleteMany();
    // console.log('🗑️ Old product data removed');

    // Only pick fields that are defined in your schema
    const filteredProducts = products.data.map((p) => ({
      title: p.title,
      description: p.description,
      price: p.price,
      stock: p.stock,
      images: p.images,
    }));

    // Insert data
    const productsInDB =await Product.insertMany(filteredProducts);
    //Products saved successfully
    res.status(201).json({
      message: "Products seeded successfully",
      count: productsInDB.length,
      products: productsInDB,
  });
  } catch (error) {
    console.log("error adding hotels to the db",error.message);
    res.status(500).json({ message: "Could not add data to DB"})    
  }
};
