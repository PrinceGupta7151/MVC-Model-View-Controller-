const Product = require("../models/productModel");

// business Logic

const getProducts = async(req , res)=>{
    try{
        const allProducts =await Product.find();

        if(! allProducts || allProducts.length === 0){
            res.json({
                message:"There is no Product"
            })
        }
        // if we have products => 1

        res.status(200).json({
            success:true,
            products:allProducts,
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })

    }
}

const createProduct = async (req,res)=>{
    try{
        const {name,price,description,category}=req.body;
        const newProduct = new Product({name,price,description,category});
        await newProduct.save();
        res.status(200).json({
            product:newProduct
        })
    }
    catch(err){
            res.status(500).json({
            success:false,
            message:"Internal server Error"
        })

    }
    
}

const updateProduct = async(req,res)=>{
    try{
        const {id}= req.params;
        const {name,price,description,category}= req.body;

        const updateProduct= await Product.findByIdAndUpdate(
            id,{name,price,description,category},{new:true});

            if(!updateProduct){
                res.json({
                    message:" Cannot find product"
                })
            }

            res.status(200).json({
                product:updateProduct
            })
        }
    
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
}

const deletedProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(! deletedProduct){
            res.json({
                message:"Product not deleted"
            })
        }
        res.status(200).json({
            message:"Product deleted successfully",
            products:deletedProduct
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }

}

module.exports={getProducts,updateProduct ,createProduct,deletedProduct}; 