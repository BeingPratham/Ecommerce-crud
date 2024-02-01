const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const product = require('./models/productModel')
const variant = require('./models/variantModel')
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())

// --------------MongoDb Connection---------------

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', ()=>{
    console.log("Connected to MongoDb");
})

mongoose.connection.on('error', (err)=>{
    console.log(`Error connecting to mongoDb: ${err}`);
    process.exit(1);
})

// --------------MongoDb Connection---------------


// --------------APIS---------------

app.post('/createProduct', async(req,res)=>{
    try{
        const {name,description,price} = req.body;
        const newProduct = new product({name,description,price});
        const savedProduct = await newProduct.save();
        res.json(savedProduct);

    }catch(err){
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
})

app.post('/createVariant/:productid',async(req,res)=>{
    try{
        const {name, sku, additional_cost,stock_count} = req.body;
        const product_id = req.params.productid;
        const newVariant = new variant({name,sku,additional_cost,stock_count,product_id});
        const savedVariant = await newVariant.save();
        res.json(savedVariant);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ err: "Internal Server Error" });
    }
})

app.get('/getAllProduct', async(req,res)=>{
    const products = await product.find();
    res.json(products);
})

app.get('/getProductVariants/:productid', async(req,res)=>{
    const productId = req.params.productid;
    const variants = await variant.find({product_id:productId});
    res.json(variants);
})

app.put('/updateProduct/:productid', async(req,res)=>{
    try{
        const productid = req.params.productid;
        const {name, description,price} = req.body;
        const updatedProducts = await product.findByIdAndUpdate(
            productid,
            {name, description,price},
            { new: true },
        )
        res.json(updatedProducts);
    }
    catch(err){
        console.log(err)
    }
})

app.put('/updatevariant/:variantid', async(req,res)=>{
    try{
        const variantid = req.params.variantid;
        const {name, sku,additional_cost,stock_count} = req.body;
        const updatedProducts = await variant.findByIdAndUpdate(
            variantid,
            {name, sku,additional_cost,stock_count},
            { new: true },
        )
        res.json(updatedProducts);
    }
    catch(err){
        console.log(err)
    }
})

app.delete('/deleteProduct/:productid',async(req,res)=>{
    try{
        const productId = req.params.productid;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        //I have deleted all the variants as if product will get deleted then its sub-variants should be deleted too.
        const variantDelete = await variant.deleteMany({product_id:productId})
        //This will delete product after all the variants are deleted
        const productDelete = await product.findByIdAndDelete(productId);
        res.json("All the variants related to product and the product is deleted")
    }catch(err){
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.delete('/deleteVariant/:variantid', async(req,res)=>{
    try{
        const variantId = req.params.variantid;
        //This will delete only variant as it will not affect our product.
        const variantDelete = await variant.findByIdAndDelete(variantId);
        res.json("Variant Deleted")
    }catch(err){
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/search', async(req,res)=>{
    try {
        const searchText = req.query.q; 

        const products = await product.find({
            $or: [
                { name: { $regex: searchText, $options: 'i' } }, 
                { description: { $regex: searchText, $options: 'i' } } 
            ]
        });

        const variants = await variant.find({
            name: { $regex: searchText, $options: 'i' } 
        }).populate('product_id'); 

        res.json({ products, variants });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// --------------APIS---------------


app.listen(PORT, ()=>console.log(`Server running on Port: ${PORT}`))

module.exports = {app}