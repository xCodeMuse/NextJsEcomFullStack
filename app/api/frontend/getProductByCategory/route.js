import connectDB from "../../../database/connectDB";
import Product from "../../../database/models/Product";


export async function GET(req ) 
{
    await connectDB('product by category');
    
    const id = req.nextUrl.searchParams.get('id')
    try {
        const data = await Product.find({category : id}).populate("category" , "name");
        return new Response(JSON.stringify(data), {
            status:200,
            headers: {
              'content-type': 'application/json',
            },})
    } catch (error) {
        console.log( 'error in getting product by category (server) => '+  error)
        return new Response(JSON.stringify({error : "No Product found of such Category"}), {
            status:405,
            headers: {
              'content-type': 'application/json',
            },})
    }
}