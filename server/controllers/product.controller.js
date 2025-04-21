
import { Product } from '../models/product.model.js';
import products from '../data/products.js'


export const seedProducts = async (req, res) => {
  try {
    // delete old data
    await Product.deleteMany();
    
    // pushing only the defined data in schema
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


export const getAllProducts= async(req, res)=>{
  try {
    const products= await Product.find();

    res.json(products)
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

export const getProductById= async(req, res)=>{
  try {
    const id= req.params.id
    const product= await Product.findById(id)
    if(!product) return res.status(404).json({error:"Product not found"})
    ///if found
    res.json(product)
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
    
  }
}

