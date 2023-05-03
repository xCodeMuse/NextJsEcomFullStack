import connectDB from "../../../database/connectDB";
import Product from "../../../database/models/Product";


export async function GET(req)
{
    await connectDB('product get by id');

    const id = req.nextUrl.searchParams.get('id')

    try
    {
        const data = await Product.findById({_id : id});
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
              'content-type': 'application/json',
            },
          });
    }
    catch(error)
    {
        console.log('error in getting product data by id (server) => ')
        return res.status(408).json({error : 'cannot get product data'})
    }
    
}