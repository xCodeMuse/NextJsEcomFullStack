import connectDB from "../../database/connectDB";
import Product from "../../database/models/Product";


export default getProductByCategory = async (req , res) => 
{
    await connectDB();
    const {id} = req.query;
    try {
        const data = await Product.find({category : id}).populate("category" , "name");
        return res.status(201).send(data);
    } catch (error) {
        console.log( 'error in getting product by category (server) => '+  error)
        return res.status(405).json({error : "No Product found of such Category"});
    }
}